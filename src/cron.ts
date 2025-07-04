import { CloudflareEnv } from './env';
import { createStorage } from './storage';

export async function handleScheduled(event: ScheduledEvent, env: CloudflareEnv, ctx: ExecutionContext): Promise<void> {
  if (env.MODE === 'demo') {
    const storage = createStorage(env.KV);
    
    try {
      // Get all keys and delete them
      const allKeys = await storage.list();
      
      for (const item of allKeys) {
        await storage.delete(item.key[0] as string);
      }
      
      console.log(`Cleared ${allKeys.length} items from KV store`);
    } catch (error) {
      console.error('Error clearing KV store:', error);
    }
  }
}
