import { CloudflareEnv, getEnv } from './env';
import { createStorage } from './storage';

export async function handleScheduled(event: ScheduledEvent, env: CloudflareEnv, ctx: ExecutionContext): Promise<void> {
  const { MODE, DEMO_CLEAR_INTERVAL, KV } = getEnv(env);
  
  if (MODE === 'demo') {
    const storage = createStorage(KV);
    
    try {
      // Get the last cleanup time from KV storage
      const lastCleanupKey = '__last_cleanup__';
      const lastCleanup = await storage.get(lastCleanupKey);
      const now = Date.now();
      const intervalMs = DEMO_CLEAR_INTERVAL * 60 * 1000; // Convert minutes to milliseconds
      
      // Check if enough time has passed since last cleanup
      let shouldCleanup = true;
      if (lastCleanup.value && lastCleanup.value.paste) {
        const lastTimestamp = parseInt(lastCleanup.value.paste);
        if (!isNaN(lastTimestamp) && (now - lastTimestamp) < intervalMs) {
          shouldCleanup = false;
        }
      }
      
      if (shouldCleanup) {
        // Get all keys except the cleanup timestamp key
        const allKeys = await storage.list();
        const keysToDelete = allKeys.filter(item => item.key[0] !== lastCleanupKey);
        
        for (const item of keysToDelete) {
          await storage.delete(item.key[0] as string);
        }
        
        // Store the current timestamp as last cleanup time
        await storage.set(lastCleanupKey, { paste: now.toString() });
        
        console.log(`Cleared ${keysToDelete.length} items from KV store (interval: ${DEMO_CLEAR_INTERVAL} minutes)`);
      } else {
        const lastTimestamp = parseInt(lastCleanup.value!.paste);
        const nextCleanup = new Date(lastTimestamp + intervalMs);
        console.log(`Skipping cleanup, next cleanup scheduled for: ${nextCleanup.toISOString()}`);
      }
    } catch (error) {
      console.error('Error during scheduled cleanup:', error);
    }
  }
}
