// Encryption UI for ShareBin
(function() {
  const encryptionPassword = document.getElementById('encryptionPassword');
  const generatePasswordBtn = document.getElementById('generatePassword');
  const togglePasswordBtn = document.getElementById('togglePasswordVisibility');
  const editorForm = document.getElementById('editor-form');

  if (!encryptionPassword || !generatePasswordBtn) {
    return; // Not on the right page
  }

  // Toggle password visibility
  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isPassword = encryptionPassword.type === 'password';
      encryptionPassword.type = isPassword ? 'text' : 'password';
      
      // Update button icon
      const svg = this.querySelector('svg path');
      if (svg) {
        if (isPassword) {
          // Show open eye (password visible)
          svg.setAttribute('d', 'M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.09L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.76,7.13 11.37,7 12,7Z');
          this.title = 'Hide password';
        } else {
          // Show closed eye (password hidden)
          svg.setAttribute('d', 'M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z');
          this.title = 'Show password';
        }
      }
    });
  }

  // Generate secure password
  generatePasswordBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Generate a secure password
    const password = generateSecurePassword(16);
    encryptionPassword.value = password;
    
    // Show the password temporarily
    const originalType = encryptionPassword.type;
    encryptionPassword.type = 'text';
    encryptionPassword.select();
    
    // Update toggle button icon to show "hide" state
    if (togglePasswordBtn) {
      const svg = togglePasswordBtn.querySelector('svg path');
      if (svg) {
        svg.setAttribute('d', 'M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.09L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.76,7.13 11.37,7 12,7Z');
        togglePasswordBtn.title = 'Hide password';
      }
    }
    
    // Copy to clipboard
    navigator.clipboard.writeText(password).then(() => {
      showNotification('🔒 Secure password generated and copied to clipboard!', 'success');
    }).catch(() => {
      showNotification('🔒 Secure password generated! Please copy it manually.', 'success');
    });
    
    // Hide password after 3 seconds
    setTimeout(() => {
      encryptionPassword.type = originalType;
      
      // Update toggle button icon back to "show" state
      if (togglePasswordBtn) {
        const svg = togglePasswordBtn.querySelector('svg path');
        if (svg) {
          svg.setAttribute('d', 'M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z');
          togglePasswordBtn.title = 'Show password';
        }
      }
    }, 3000);
  });

  // Generate secure password function
  function generateSecurePassword(length = 16) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';
    
    // Use crypto.getRandomValues for better randomness
    if (window.crypto && window.crypto.getRandomValues) {
      const randomArray = new Uint32Array(length);
      crypto.getRandomValues(randomArray);
      
      for (let i = 0; i < length; i++) {
        password += charset.charAt(randomArray[i] % charset.length);
      }
    } else {
      // Fallback to Math.random if crypto is not available
      for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }
    }
    
    return password;
  }

  // Enhanced form submission with encryption
  if (editorForm) {
    editorForm.addEventListener('submit', async function(e) {
      const password = encryptionPassword.value;
      
      if (password) {
        // For server-side encryption, let the form submit normally with the password
        // The server will handle the encryption
        // Form will be submitted with encryption enabled
      }
      // If encryption is not enabled, form submits normally
    });
  }

  // Check if current paste is encrypted and offer decryption
  function checkAndOfferDecryption() {
    const content = window.cmEditor ? window.cmEditor.getValue() : 
                   document.getElementById('pasteTextArea')?.value;
    
    if (content && content.includes('🔒 ENCRYPTED PASTE 🔒')) {
      showDecryptionPrompt(content);
    }
  }

  function showDecryptionPrompt(encryptedContent) {
    const modal = document.createElement('div');
    modal.className = 'decryption-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h3>🔒 Encrypted Paste Detected</h3>
        <p>This paste is encrypted. Enter the password to decrypt it:</p>
        <input type="password" id="decryptPassword" placeholder="Enter password" />
        <div class="modal-buttons">
          <button id="decryptBtn">Decrypt</button>
          <button id="cancelDecryptBtn">Cancel</button>
        </div>
        <small class="decrypt-note">The password is never sent to the server.</small>
      </div>
    `;
    
    document.body.appendChild(modal);

    const decryptBtn = modal.querySelector('#decryptBtn');
    const cancelBtn = modal.querySelector('#cancelDecryptBtn');
    const passwordInput = modal.querySelector('#decryptPassword');

    // Focus password input
    passwordInput.focus();

    // Handle Enter key
    passwordInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        decryptBtn.click();
      }
    });

    decryptBtn.addEventListener('click', async () => {
      const password = passwordInput.value;
      if (!password) {
        showNotification('Please enter a password.', 'error');
        passwordInput.classList.add('shake');
        passwordInput.addEventListener('animationend', () => {
          passwordInput.classList.remove('shake');
        }, { once: true });
        return;
      }

      // Add loading spinner
      decryptBtn.disabled = true;
      decryptBtn.innerHTML = 'Decrypting... <span class="spinner"></span>';
      passwordInput.classList.remove('shake'); // Remove shake if it was there

      try {
        // Extract encrypted data (remove the header)
        const encryptedData = encryptedContent.replace(/^🔒 ENCRYPTED PASTE 🔒\s*\n+/, '');

        // Decrypt
        const decryptedContent = await window.ShareBinCrypto.decrypt(encryptedData, password);

        // Update editor/textarea
        if (window.cmEditor) {
          window.cmEditor.setValue(decryptedContent);
        } else if (document.getElementById('pasteTextArea')) {
          document.getElementById('pasteTextArea').value = decryptedContent;
        }

        showNotification('Paste decrypted successfully!', 'success');
        // Trigger closing animation before removal
        modal.classList.add('closing');
        modal.addEventListener('animationend', () => {
          modal.remove();
        }, { once: true });

      } catch (error) {
        console.error('Decryption error:', error);
        showNotification('Decryption failed. Check your password.', 'error');
        passwordInput.classList.add('shake');
        passwordInput.addEventListener('animationend', () => {
          passwordInput.classList.remove('shake');
        }, { once: true });
        passwordInput.select();
      } finally {
        decryptBtn.disabled = false;
        decryptBtn.innerHTML = 'Decrypt'; // Reset button text
      }
    });

    cancelBtn.addEventListener('click', () => {
      // Trigger closing animation before removal
      modal.classList.add('closing');
      modal.addEventListener('animationend', () => {
        modal.remove();
      }, { once: true });
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('closing');
        modal.addEventListener('animationend', () => {
          modal.remove();
        }, { once: true });
      }
    });
  }

  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelectorAll('.notification');
    existing.forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 4000);
  }

  // Check for encrypted content on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndOfferDecryption);
  } else {
    checkAndOfferDecryption();
  }

})();
