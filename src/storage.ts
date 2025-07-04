import { compress, decompress } from 'lz-string';

export interface Paste {
  paste: string;
  editCode?: string;
}

export const createStorage = (kv: KVNamespace) => ({
  async get(id: string) {
    const result = await kv.get<Paste>(id, { type: 'json' });
    
    if (result !== null) {
      result.paste = decompress(result.paste) || '';
    }

    return { 
      value: result,
      versionstamp: null // Cloudflare KV doesn't have versionstamp like Deno KV
    };
  },

  async set(id: string, pasteAttrs: Paste) {
    const compressed = compress(pasteAttrs.paste);
    const payload = { ...pasteAttrs, paste: compressed };
    await kv.put(id, JSON.stringify(payload));
    return { ok: true };
  },

  async delete(id: string) {
    await kv.delete(id);
    return undefined;
  },

  async list() {
    const result = await kv.list();
    return result.keys.map((key: any) => ({ key: [key.name] }));
  }
});
