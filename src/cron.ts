import { CloudflareEnv, getEnv } from './env';
import { createStorage } from './storage';

export async function handleScheduled(event: ScheduledEvent, env: CloudflareEnv, ctx: ExecutionContext): Promise<void> {
  const { MODE, DEMO_CLEAR_INTERVAL, KV } = getEnv(env);
  const storage = createStorage(KV);
  
  try {
    // Always run expiry cleanup regardless of mode
    await cleanupExpiredPastes(storage);
    
    // Demo mode specific cleanup
    if (MODE === 'demo') {
      await runDemoCleanup(storage, DEMO_CLEAR_INTERVAL);
    }
  } catch (error) {
    console.error('Error during scheduled task:', error);
  }
}

async function cleanupExpiredPastes(storage: any): Promise<void> {
  const lastExpiryCleanupKey = '__last_expiry_cleanup__';
  const now = Date.now();
  const cleanupInterval = 60 * 60 * 1000; // Run expiry cleanup every hour
  
  // Check if enough time has passed since last expiry cleanup
  const lastExpiryCleanup = await storage.get(lastExpiryCleanupKey);
  let shouldRunExpiry = true;
  
  if (lastExpiryCleanup.value && lastExpiryCleanup.value.paste) {
    const lastTimestamp = parseInt(lastExpiryCleanup.value.paste);
    if (!isNaN(lastTimestamp) && (now - lastTimestamp) < cleanupInterval) {
      shouldRunExpiry = false;
    }
  }
  
  if (shouldRunExpiry) {
    console.log('Running expiry cleanup...');
    
    // Get all keys
    const allKeys = await storage.list();
    let expiredCount = 0;
    
    for (const item of allKeys) {
      const key = item.key[0] as string;
      
      // Skip system keys
      if (key.startsWith('__') || key.startsWith('history:') || key.startsWith('attachment:')) {
        continue;
      }
      
      try {
        const result = await storage.get(key);
        if (result.value && result.value.expiryTime && now > result.value.expiryTime) {
          // Delete expired paste
          await storage.delete(key);
          expiredCount++;
          
          // Also delete associated history and attachments
          const historyKeys = await storage.list({ prefix: `history:${key}:` });
          for (const historyItem of historyKeys.keys) {
            await storage.delete(historyItem.name);
          }
          
          // Delete attachments if they exist
          if (result.value.attachments) {
            for (const attachment of result.value.attachments) {
              try {
                await storage.deleteAttachment(attachment.id);
              } catch (error) {
                console.error(`Failed to delete attachment ${attachment.id}:`, error);
              }
            }
          }
        }
      } catch (error) {
        console.error(`Error checking expiry for ${key}:`, error);
      }
    }
    
    // Store the current timestamp as last expiry cleanup time
    await storage.set(lastExpiryCleanupKey, { paste: now.toString() });
    
    console.log(`Expiry cleanup completed: ${expiredCount} expired pastes removed`);
  } else {
    const lastTimestamp = parseInt(lastExpiryCleanup.value!.paste);
    const nextCleanup = new Date(lastTimestamp + cleanupInterval);
    console.log(`Skipping expiry cleanup, next cleanup scheduled for: ${nextCleanup.toISOString()}`);
  }
}

async function runDemoCleanup(storage: any, interval: number): Promise<void> {
  const lastCleanupKey = '__last_cleanup__';
  const lastCleanup = await storage.get(lastCleanupKey);
  const now = Date.now();
  const intervalMs = interval * 60 * 1000; // Convert minutes to milliseconds
  
  // Check if enough time has passed since last cleanup
  let shouldCleanup = true;
  if (lastCleanup.value && lastCleanup.value.paste) {
    const lastTimestamp = parseInt(lastCleanup.value.paste);
    if (!isNaN(lastTimestamp) && (now - lastTimestamp) < intervalMs) {
      shouldCleanup = false;
    }
  }
  
  if (shouldCleanup) {
    console.log('Running demo cleanup...');
    
    // Get all keys except the cleanup timestamp keys
    const allKeys = await storage.list();
    const keysToDelete = allKeys.filter((item: any) =>
      !item.key[0].startsWith('__last_cleanup__') &&
      !item.key[0].startsWith('__last_expiry_cleanup__')
    );
    
    for (const item of keysToDelete) {
      await storage.delete(item.key[0] as string);
    }
    
    // Store the current timestamp as last cleanup time
    await storage.set(lastCleanupKey, { paste: now.toString() });
    
    console.log(`Demo cleanup completed: ${keysToDelete.length} items removed from KV store (interval: ${interval} minutes)`);
  } else {
    const lastTimestamp = parseInt(lastCleanup.value!.paste);
    const nextCleanup = new Date(lastTimestamp + intervalMs);
    console.log(`Skipping demo cleanup, next cleanup scheduled for: ${nextCleanup.toISOString()}`);
  }
}
