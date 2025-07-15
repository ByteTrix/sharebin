// Client-side encryption module using TweetNaCl
// Provides password-based encryption for sensitive pastes

class ShareBinCrypto {
  constructor() {
    this.nacl = window.nacl;
    this.naclUtil = window.nacl.util;
    
    if (!this.nacl || !this.naclUtil) {
      throw new Error('TweetNaCl libraries not loaded');
    }
  }

  // Generate a random salt
  generateSalt() {
    return this.nacl.randomBytes(32);
  }

  // Generate a default encryption key for anonymous pastes
  generateDefaultKey() {
    // Generate a random 32-byte key for anonymous pastes
    return this.nacl.randomBytes(32);
  }

  // Derive key from password using a simple PBKDF2-like approach
  async deriveKey(password, salt, iterations = 100000) {
    const encoder = new TextEncoder();
    const passwordBytes = encoder.encode(password);
    
    // Import password as key material
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      passwordBytes,
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );

    // Derive the actual key
    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: iterations,
        hash: 'SHA-256'
      },
      keyMaterial,
      {
        name: 'AES-GCM',
        length: 256
      },
      true,
      ['encrypt', 'decrypt']
    );

    // Export the key to get raw bytes for NaCl
    const keyBuffer = await crypto.subtle.exportKey('raw', key);
    return new Uint8Array(keyBuffer);
  }

  // Encrypt text with password
  async encrypt(plaintext, password) {
    try {
      const salt = this.generateSalt();
      const key = await this.deriveKey(password, salt);
      
      // Generate nonce for encryption
      const nonce = this.nacl.randomBytes(this.nacl.secretbox.nonceLength);
      
      // Convert plaintext to bytes
      const plaintextBytes = this.naclUtil.decodeUTF8(plaintext);
      
      // Encrypt
      const ciphertext = this.nacl.secretbox(plaintextBytes, nonce, key);
      
      if (!ciphertext) {
        throw new Error('Encryption failed');
      }

      // Combine salt + nonce + ciphertext
      const combined = new Uint8Array(salt.length + nonce.length + ciphertext.length);
      combined.set(salt, 0);
      combined.set(nonce, salt.length);
      combined.set(ciphertext, salt.length + nonce.length);

      // Return base64 encoded result
      return this.naclUtil.encodeBase64(combined);
    } catch (error) {
      throw new Error(`Encryption failed: ${error.message}`);
    }
  }

  // Encrypt text with default key (for anonymous pastes)
  async encryptDefault(plaintext) {
    try {
      const key = this.generateDefaultKey();
      
      // Generate nonce for encryption
      const nonce = this.nacl.randomBytes(this.nacl.secretbox.nonceLength);
      
      // Convert plaintext to bytes
      const plaintextBytes = this.naclUtil.decodeUTF8(plaintext);
      
      // Encrypt
      const ciphertext = this.nacl.secretbox(plaintextBytes, nonce, key);
      
      if (!ciphertext) {
        throw new Error('Encryption failed');
      }

      // Combine key + nonce + ciphertext for default encryption
      const combined = new Uint8Array(key.length + nonce.length + ciphertext.length);
      combined.set(key, 0);
      combined.set(nonce, key.length);
      combined.set(ciphertext, key.length + nonce.length);

      // Return base64 encoded result with special marker
      return 'SHAREBIN_DEFAULT:' + this.naclUtil.encodeBase64(combined);
    } catch (error) {
      throw new Error(`Default encryption failed: ${error.message}`);
    }
  }

  // Decrypt text with password
  async decrypt(encryptedData, password) {
    try {
      // Decode from base64
      const combined = this.naclUtil.decodeBase64(encryptedData);
      
      // Extract salt, nonce, and ciphertext
      const salt = combined.slice(0, 32);
      const nonce = combined.slice(32, 32 + this.nacl.secretbox.nonceLength);
      const ciphertext = combined.slice(32 + this.nacl.secretbox.nonceLength);
      
      // Derive key from password and salt
      const key = await this.deriveKey(password, salt);
      
      // Decrypt
      const plaintext = this.nacl.secretbox.open(ciphertext, nonce, key);
      
      if (!plaintext) {
        throw new Error('Decryption failed - wrong password or corrupted data');
      }

      // Convert back to string
      return this.naclUtil.encodeUTF8(plaintext);
    } catch (error) {
      throw new Error(`Decryption failed: ${error.message}`);
    }
  }

  // Decrypt default encrypted content (for anonymous pastes)
  async decryptDefault(encryptedData) {
    try {
      // Check if it's default encrypted
      if (!encryptedData.startsWith('SHAREBIN_DEFAULT:')) {
        throw new Error('Not default encrypted content');
      }
      
      // Remove the marker and decode
      const base64Data = encryptedData.substring('SHAREBIN_DEFAULT:'.length);
      const combined = this.naclUtil.decodeBase64(base64Data);
      
      // Extract key, nonce, and ciphertext
      const key = combined.slice(0, 32);
      const nonce = combined.slice(32, 32 + this.nacl.secretbox.nonceLength);
      const ciphertext = combined.slice(32 + this.nacl.secretbox.nonceLength);
      
      // Decrypt
      const plaintext = this.nacl.secretbox.open(ciphertext, nonce, key);
      
      if (!plaintext) {
        throw new Error('Default decryption failed - corrupted data');
      }

      // Convert back to string
      return this.naclUtil.encodeUTF8(plaintext);
    } catch (error) {
      throw new Error(`Default decryption failed: ${error.message}`);
    }
  }

  // Generate a secure random password
  generatePassword(length = 16) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const random = this.nacl.randomBytes(length);
    let password = '';
    
    for (let i = 0; i < length; i++) {
      password += charset[random[i] % charset.length];
    }
    
    return password;
  }

  // Check if text is encrypted (simple heuristic)
  isEncrypted(text) {
    try {
      // Try to decode as base64 and check if it has the expected structure
      const decoded = this.naclUtil.decodeBase64(text);
      return decoded.length > 64; // At least salt + nonce + some ciphertext
    } catch {
      return false;
    }
  }
}

// Initialize crypto when libraries are loaded
window.ShareBinCrypto = null;

function initializeCrypto() {
  try {
    window.ShareBinCrypto = new ShareBinCrypto();
    // console.log('ShareBinCrypto initialized successfully');
  } catch (error) {
    console.error('Failed to initialize ShareBinCrypto:', error);
  }
}

// Initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCrypto);
} else {
  initializeCrypto();
}
