import { compress, decompress } from 'lz-string';
export const createStorage = (kv) => ({
    async get(id) {
        const result = await kv.get(id, { type: 'json' });
        if (result !== null) {
            result.paste = decompress(result.paste) || '';
        }
        return {
            value: result,
            versionstamp: null // Cloudflare KV doesn't have versionstamp like Deno KV
        };
    },
    async set(id, pasteAttrs) {
        const compressed = compress(pasteAttrs.paste);
        const payload = { ...pasteAttrs, paste: compressed };
        await kv.put(id, JSON.stringify(payload));
        return { ok: true };
    },
    async delete(id) {
        await kv.delete(id);
        return undefined;
    },
    async list() {
        const result = await kv.list();
        return result.keys.map((key) => ({ key: [key.name] }));
    }
});
