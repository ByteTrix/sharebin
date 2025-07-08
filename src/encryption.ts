import { CloudflareEnv } from './env';

export interface EncryptedData {
  data: string;
  salt: string;
  iv: string;
}

export class ServerEncryption {
  private static async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const passwordBytes = encoder.encode(password);
    
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      passwordBytes,
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );

    return await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      {
        name: 'AES-GCM',
        length: 256
      },
      false,
      ['encrypt', 'decrypt']
    );
  }

  static async encrypt(plaintext: string, password: string): Promise<EncryptedData> {
    const encoder = new TextEncoder();
    const data = encoder.encode(plaintext);
    
    // Generate random salt and IV
    const salt = crypto.getRandomValues(new Uint8Array(32));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // Derive key from password
    const key = await this.deriveKey(password, salt);
    
    // Encrypt the data
    const encrypted = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      data
    );

    // Convert to base64 for storage
    const encryptedArray = new Uint8Array(encrypted);
    const encryptedBase64 = btoa(String.fromCharCode(...encryptedArray));
    const saltBase64 = btoa(String.fromCharCode(...salt));
    const ivBase64 = btoa(String.fromCharCode(...iv));

    return {
      data: encryptedBase64,
      salt: saltBase64,
      iv: ivBase64
    };
  }

  static async decrypt(encryptedData: EncryptedData, password: string): Promise<string> {
    try {
      // Convert from base64
      const data = new Uint8Array(atob(encryptedData.data).split('').map(c => c.charCodeAt(0)));
      const salt = new Uint8Array(atob(encryptedData.salt).split('').map(c => c.charCodeAt(0)));
      const iv = new Uint8Array(atob(encryptedData.iv).split('').map(c => c.charCodeAt(0)));
      
      // Derive key from password
      const key = await this.deriveKey(password, salt);
      
      // Decrypt the data
      const decrypted = await crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: iv
        },
        key,
        data
      );

      const decoder = new TextDecoder();
      return decoder.decode(decrypted);
    } catch (error) {
      throw new Error('Decryption failed: Invalid password or corrupted data');
    }
  }

  static isEncryptedData(data: any): data is EncryptedData {
    return data && 
           typeof data === 'object' && 
           typeof data.data === 'string' && 
           typeof data.salt === 'string' && 
           typeof data.iv === 'string';
  }
}
