import { compress, decompress } from 'lz-string';

export interface Paste {
  paste: string;
  editCode?: string;
  isEncrypted?: boolean;
  isPasswordProtected?: boolean;
  oneTimeView?: boolean;
  expiryTime?: number; // Unix timestamp
  viewCount?: number;
  attachments?: AttachmentInfo[];
}

export interface AttachmentInfo {
  id: string;
  originalName: string;
  size: number;
  type: string;
  uploadTimestamp: number;
}

export interface PasteRevision {
  timestamp: number; // Unix timestamp
  paste: string;     // Compressed paste content
}

export const createStorage = (kv: KVNamespace) => ({
  async get(id: string, isView: boolean = false) {
    const result = await kv.get<Paste>(id, { type: 'json' });
    
    if (result !== null) {
      // Check if paste has expired
      if (result.expiryTime && Date.now() > result.expiryTime) {
        await kv.delete(id);
        return {
          value: null,
          versionstamp: null
        };
      }
      
      result.paste = decompress(result.paste) || '';
      
      // Handle one-time view
      if (isView && result.oneTimeView) {
        const viewCount = (result.viewCount || 0) + 1;
        if (viewCount >= 1) {
          // Delete after first view
          await kv.delete(id);
        } else {
          // Update view count
          const compressed = compress(result.paste);
          const payload = { ...result, paste: compressed, viewCount };
          await kv.put(id, JSON.stringify(payload));
        }
      }
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
  },

  async storeAttachment(attachmentId: string, fileData: ArrayBuffer): Promise<void> {
    await kv.put(`attachment:${attachmentId}`, fileData);
  },

  async getAttachment(attachmentId: string): Promise<ArrayBuffer | null> {
    return await kv.get(`attachment:${attachmentId}`, { type: 'arrayBuffer' });
  },

  async deleteAttachment(attachmentId: string): Promise<void> {
    await kv.delete(`attachment:${attachmentId}`);
  },

  async validateEditCode(id: string, providedCode: string): Promise<{ valid: boolean; error?: string }> {
    const result = await kv.get<Paste>(id, { type: 'json' });
    
    if (!result) {
      return { valid: false, error: 'Paste not found' };
    }

    // If no edit code is set on the paste, allow access
    if (!result.editCode) {
      return { valid: true }; // No edit code required
    }

    // If edit code is required but not provided
    if (!providedCode || providedCode.trim() === '') {
      return { valid: false, error: 'Edit code is required to modify this paste' };
    }

    // Compare the provided code with the stored edit code
    if (providedCode.trim() !== result.editCode.trim()) {
      return { valid: false, error: 'Invalid edit code. Please check your edit code and try again.' };
    }

    return { valid: true };
  }
});
