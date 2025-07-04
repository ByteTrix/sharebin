import { compress, decompress } from 'lz-string';

export interface Paste {
  paste: string;
  editCode?: string;
}

export interface PasteRevision {
  timestamp: number; // Unix timestamp
  paste: string;     // Compressed paste content
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
  },

  async saveRevision(id: string, pasteContent: string) {
    const timestamp = Date.now();
    const compressed = compress(pasteContent);
    const payload: PasteRevision = { timestamp, paste: compressed };
    await kv.put(`history:${id}:${timestamp}`, JSON.stringify(payload));
    return { ok: true };
  },

  async getRevisions(id: string): Promise<PasteRevision[]> {
    const { keys } = await kv.list({ prefix: `history:${id}:` });
    const revisions: PasteRevision[] = [];

    for (const key of keys) {
      const revision = await kv.get<PasteRevision>(key.name, { type: 'json' });
      if (revision) {
        revision.paste = decompress(revision.paste) || '';
        revisions.push(revision);
      }
    }
    // Sort by timestamp in descending order (newest first)
    return revisions.sort((a, b) => b.timestamp - a.timestamp);
  }
});
