// Encryption UI for flrbin
(function() {
  const encryptionCheckbox = document.getElementById('enableEncryption');
  const encryptionOptions = document.getElementById('encryptionOptions');
  const encryptionPassword = document.getElementById('encryptionPassword');
  const generatePasswordBtn = document.getElementById('generatePassword');
  const editorForm = document.getElementById('editor-form');

  if (!encryptionCheckbox || !encryptionOptions || !encryptionPassword || !generatePasswordBtn) {
    return; // Not on the right page
  }

  // Toggle encryption options
  encryptionCheckbox.addEventListener('change', function() {
    if (this.checked) {
      encryptionOptions.style.display = 'block';
      encryptionPassword.required = true;
    } else {
      encryptionOptions.style.display = 'none';
      encryptionPassword.required = false;
      encryptionPassword.value = '';
    }
  });

  // Generate secure password
  generatePasswordBtn.addEventListener('click', function() {
    if (window.flrbinCrypto) {
      const password = window.flrbinCrypto.generatePassword(16);
      encryptionPassword.value = password;
      
      // Show the password temporarily
      const originalType = encryptionPassword.type;
      encryptionPassword.type = 'text';
      encryptionPassword.select();
      
      // Copy to clipboard
      navigator.clipboard.writeText(password).then(() => {
        showNotification('Password generated and copied to clipboard!');
      }).catch(() => {
        showNotification('Password generated! Please copy it manually.');
      });
      
      // Hide password after 3 seconds
      setTimeout(() => {
        encryptionPassword.type = originalType;
      }, 3000);
    } else {
      showNotification('Encryption not available. Please refresh the page.', 'error');
    }
  });

  // Enhanced form submission with encryption
  if (editorForm) {
    editorForm.addEventListener('submit', async function(e) {
      const enableEncryption = encryptionCheckbox.checked;
      const password = encryptionPassword.value;
      
      if (enableEncryption && password) {
        // For server-side encryption, let the form submit normally with the password
        // The server will handle the encryption
        console.log('Form will be submitted with encryption enabled');
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
        const decryptedContent = await window.flrbinCrypto.decrypt(encryptedData, password);

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
