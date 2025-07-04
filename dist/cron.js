import { createStorage } from './storage';
export async function handleScheduled(event, env, ctx) {
    if (env.MODE === 'demo') {
        const storage = createStorage(env.KV);
        try {
            // Get all keys and delete them
            const allKeys = await storage.list();
            for (const item of allKeys) {
                await storage.delete(item.key[0]);
            }
            console.log(`Cleared ${allKeys.length} items from KV store`);
        }
        catch (error) {
            console.error('Error clearing KV store:', error);
        }
    }
}
