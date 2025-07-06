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
        e.preventDefault();
        
        try {
          // Get the content from the editor
          const content = window.cmEditor ? window.cmEditor.getValue() : document.getElementById('pasteTextArea').value;
          
          if (!content.trim()) {
            showNotification('Please enter some content to encrypt.', 'error');
            return;
          }

          showNotification('Encrypting paste...', 'info');
          
          // Encrypt the content
          const encryptedContent = await window.flrbinCrypto.encrypt(content, password);
          
          // Replace the textarea content with encrypted version
          const textarea = document.getElementById('pasteTextArea');
          textarea.value = `🔒 ENCRYPTED PASTE 🔒\n\n${encryptedContent}`;
          
          // Update editor if present
          if (window.cmEditor) {
            window.cmEditor.setValue(textarea.value);
          }
          
          // Clear password field for security
          encryptionPassword.value = '';
          encryptionCheckbox.checked = false;
          encryptionOptions.style.display = 'none';
          
          showNotification('Paste encrypted successfully! Submitting...', 'success');
          
          // Submit the form with encrypted content
          setTimeout(() => {
            this.submit();
          }, 1000);
          
        } catch (error) {
          console.error('Encryption error:', error);
          showNotification(`Encryption failed: ${error.message}`, 'error');
        }
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
        return;
      }
      
      try {
        showNotification('Decrypting...', 'info');
        
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
        modal.remove();
        
      } catch (error) {
        console.error('Decryption error:', error);
        showNotification('Decryption failed. Check your password.', 'error');
        passwordInput.select();
      }
    });
    
    cancelBtn.addEventListener('click', () => {
      modal.remove();
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
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
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      notification.remove();
    }, 4000);
  }

  // Check for encrypted content on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndOfferDecryption);
  } else {
    checkAndOfferDecryption();
  }

})();
