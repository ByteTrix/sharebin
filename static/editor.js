(function() {
  const cmEl = document.getElementById('editor');
  const textArea = document.getElementById('pasteTextArea');
  const editorForm = document.getElementById('editor-form');
  const previewContainer = document.getElementById('preview-container');
  const editorTabs = document.querySelectorAll('.editor-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  // Check if required elements exist
  if (!cmEl || !textArea || !previewContainer || !editorTabs.length) {
    console.error('Required editor elements not found:', {
      cmEl: !!cmEl,
      textArea: !!textArea,
      previewContainer: !!previewContainer,
      editorTabs: editorTabs.length
    });
    return;
  }

  console.log('All required elements found, initializing modern editor...');

  // Check if CodeMirror is available
  if (typeof CodeMirror === 'undefined') {
    console.error('CodeMirror not loaded');
    return;
  }

  console.log('CodeMirror available, proceeding with initialization...');

  // hide paste textarea
  textArea.style.display = 'none';

  const editor = new CodeMirror(cmEl, {
    mode: 'markdown',
    value: textArea.value,
    keymap: 'sublime',
    theme: 'default',
    viewportMargin: Infinity,
    lineNumbers: false,
    lineWrapping: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    extraKeys: {
      'Ctrl-B': function(cm) {
        wrapSelection(cm, '**', '**');
      },
      'Ctrl-I': function(cm) {
        wrapSelection(cm, '*', '*');
      },
      'Ctrl-K': function(cm) {
        insertLink(cm);
      },
      'Ctrl-`': function(cm) {
        wrapSelection(cm, '`', '`');
      },
      'Ctrl-Shift-L': function(cm) {
        insertListItem(cm);
      },
      'Ctrl-Shift-O': function(cm) {
        insertNumberedList(cm);
      },
      'Ctrl-Shift-.': function(cm) {
        insertQuote(cm);
      },
      'Ctrl-Shift-H': function(cm) {
        insertHeading(cm);
      },
      'Ctrl-S': function(cm) {
        // Save the form
        if (editorForm) {
          editorForm.submit();
        }
      },
      'Ctrl-Shift-T': function(cm) {
        insertTable(cm);
      },
      'Ctrl-/': function(cm) {
        toggleShortcutsModal();
      }
    }
  });

  console.log('CodeMirror editor created successfully');

  // attach editor to window
  window.cmEditor = editor;

  console.log('Editor attached to window.cmEditor');

  // Helper functions for editor shortcuts
  function wrapSelection(cm, before, after) {
    if (cm.getSelection()) {
      cm.replaceSelection(before + cm.getSelection() + after);
    } else {
      const cursor = cm.getCursor();
      cm.replaceRange(before + after, cursor);
      cm.setCursor(cursor.line, cursor.ch + before.length);
    }
  }

  function insertLink(cm) {
    const selection = cm.getSelection();
    const linkText = selection || 'link text';
    const replacement = `[${linkText}](url)`;
    cm.replaceSelection(replacement);
    
    if (!selection) {
      const cursor = cm.getCursor();
      cm.setSelection(
        { line: cursor.line, ch: cursor.ch - replacement.length + 1 },
        { line: cursor.line, ch: cursor.ch - 5 }
      );
    }
  }

  function insertListItem(cm) {
    const cursor = cm.getCursor();
    const line = cm.getLine(cursor.line);
    
    if (line.trim() === '') {
      cm.replaceRange('- ', cursor);
    } else {
      cm.replaceRange('\n- ', { line: cursor.line, ch: line.length });
    }
  }

  function insertTable(cm) {
    const table = `| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |`;
    
    cm.replaceSelection(table);
  }

  function insertNumberedList(cm) {
    const cursor = cm.getCursor();
    const line = cm.getLine(cursor.line);
    
    if (line.trim() === '') {
      cm.replaceRange('1. ', cursor);
    } else {
      cm.replaceRange('\n1. ', { line: cursor.line, ch: line.length });
    }
  }

  function insertQuote(cm) {
    const cursor = cm.getCursor();
    const line = cm.getLine(cursor.line);
    
    if (!line.startsWith('>')) {
      cm.replaceRange('> ', { line: cursor.line, ch: 0 });
    }
  }

  function insertHeading(cm) {
    const cursor = cm.getCursor();
    const line = cm.getLine(cursor.line);
    
    if (!line.startsWith('#')) {
      cm.replaceRange('## ', { line: cursor.line, ch: 0 });
    }
  }

  // Enhanced preview with server-side markdown processing
  async function updatePreview() {
    const content = editor.getValue();
    
    if (!content.trim()) {
      previewContainer.innerHTML = '<p style="color: #888; font-style: italic; padding: 1rem;">Preview will appear here...</p>';
      return;
    }

    try {
      // Use server-side processing for accurate preview
      const response = await fetch('/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: content })
      });
      
      if (response.ok) {
        const html = await response.text();
        previewContainer.innerHTML = html;
        
        // Add the document-content class to ensure proper styling
        if (!previewContainer.classList.contains('document-content')) {
          previewContainer.classList.add('document-content');
        }
        
        // Ensure the preview container is visible
        previewContainer.style.display = 'block';
        previewContainer.style.visibility = 'visible';
        previewContainer.style.opacity = '1';
      } else {
        // Show error message if server preview fails
        previewContainer.innerHTML = `<div style="color: #e74c3c; padding: 0.75rem; border: 1px solid #e74c3c; border-radius: 0.25rem; margin: 0.5rem;">
          <strong>Preview Error:</strong> Unable to generate preview (Status: ${response.status}).
        </div>`;
      }
      
    } catch (error) {
      console.error('Server preview error:', error);
      // Show error message if server preview fails
      previewContainer.innerHTML = `<div style="color: #e74c3c; padding: 0.75rem; border: 1px solid #e74c3c; border-radius: 0.25rem; margin: 0.5rem;">
        <strong>Preview Error:</strong> Unable to generate preview.
      </div>`;
    }
  }


  const updateTextArea = debounce((value) => {
    textArea.value = value;
  }, 1500);

  // set onChange to update text area with editor text
  // this is helpful for persistence across page reloads
  const onChange = (instance, change) => {
    const value = instance.getValue();
    textArea.value = value;
    updateTextArea(value);
    
    // Update preview only if preview mode is active
    const activeTab = document.querySelector('.editor-tab.active');
    if (activeTab && activeTab.dataset.tab === 'preview') {
      debouncedPreviewUpdate();
    }
  };

  // Debounced preview update for performance
  const debouncedPreviewUpdate = debounce(updatePreview, 500);

  editor.on('change', onChange);

  // Tab switching functionality
  editorTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;
      
      // Update active tab
      editorTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update active content
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.dataset.content === targetTab) {
          content.classList.add('active');
        }
      });
      
      // Update preview if switching to preview tab
      if (targetTab === 'preview') {
        updatePreview();
      } else if (targetTab === 'edit') {
        // Refresh editor when switching back
        setTimeout(() => {
          editor.refresh();
        }, 100);
      }
    });
  });

  // Force initial preview update if preview tab is active
  setTimeout(() => {
    const activeTab = document.querySelector('.editor-tab.active');
    if (activeTab && activeTab.dataset.tab === 'preview') {
      updatePreview();
    }
  }, 500);

  // Enhanced form validation
  function validateForm() {
    const content = editor.getValue().trim();
    const customUrl = document.getElementById('url')?.value?.trim() || '';
    const encryptionPassword = document.getElementById('encryptionPassword')?.value || '';
    const isPasswordProtected = document.getElementById('passwordProtected')?.checked || false;
    
    const errors = [];
    
    // Validate content
    if (!content) {
      errors.push('Please enter some content for your paste');
    }
    
    // Validate custom URL
    if (customUrl) {
      if (customUrl.length > 40) {
        errors.push('Custom URL must be 40 characters or less');
      }
      if (!/^[a-zA-Z0-9\-_]+$/.test(customUrl)) {
        errors.push('Custom URL can only contain letters, numbers, hyphens, and underscores');
      }
      if (customUrl === 'guide') {
        errors.push('The URL "guide" is reserved');
      }
    }
    
    // Validate encryption password
    if (isPasswordProtected && encryptionPassword.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    return errors;
  }

  // Enhanced notification system
  function showNotification(message, type = 'info', duration = 4000) {
    // Remove existing notifications
    const existing = document.querySelectorAll('.notification');
    existing.forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Add icon based on type
    const icon = type === 'error' ? '❌' : type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
    notification.innerHTML = `<span class="notification-icon">${icon}</span><span class="notification-message">${message}</span>`;

    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    // Auto-remove
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, duration);
  }

  // Real-time validation feedback
  function setupRealTimeValidation() {
    const urlInput = document.getElementById('url');
    const passwordInput = document.getElementById('encryptionPassword');
    const passwordCheckbox = document.getElementById('passwordProtected');
    
    if (urlInput) {
      urlInput.addEventListener('input', function() {
        const value = this.value.trim();
        const errorDiv = document.getElementById('url-error') || createErrorDiv('url-error');
        
        if (value) {
          if (value.length > 40) {
            showInputError(errorDiv, 'URL must be 40 characters or less');
          } else if (!/^[a-zA-Z0-9\-_]+$/.test(value)) {
            showInputError(errorDiv, 'Only letters, numbers, hyphens, and underscores allowed');
          } else if (value === 'guide') {
            showInputError(errorDiv, 'The URL "guide" is reserved');
          } else {
            hideInputError(errorDiv);
          }
        } else {
          hideInputError(errorDiv);
        }
      });
    }
    
    if (passwordInput && passwordCheckbox) {
      const validatePassword = () => {
        const isProtected = passwordCheckbox.checked;
        const password = passwordInput.value;
        const errorDiv = document.getElementById('password-error') || createErrorDiv('password-error');
        
        if (isProtected && password.length > 0 && password.length < 8) {
          showInputError(errorDiv, 'Password must be at least 8 characters long');
        } else {
          hideInputError(errorDiv);
        }
      };
      
      passwordInput.addEventListener('input', validatePassword);
      passwordCheckbox.addEventListener('change', validatePassword);
    }
  }
  
  function createErrorDiv(id) {
    const errorDiv = document.createElement('div');
    errorDiv.id = id;
    errorDiv.className = 'input-error';
    errorDiv.style.display = 'none';
    return errorDiv;
  }
  
  function showInputError(errorDiv, message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    errorDiv.classList.add('show');
    
    // Position error div if it's not already in the DOM
    if (!errorDiv.parentNode) {
      const input = document.getElementById(errorDiv.id.replace('-error', ''));
      if (input) {
        input.parentNode.appendChild(errorDiv);
      }
    }
  }
  
  function hideInputError(errorDiv) {
    errorDiv.style.display = 'none';
    errorDiv.classList.remove('show');
  }

  // Character count with warning
  function setupCharacterCount() {
    const characterCount = document.getElementById('characterCount');
    if (characterCount) {
      const updateCount = () => {
        const content = editor.getValue();
        const length = content.length;
        characterCount.textContent = `${length.toLocaleString()} characters`;
        
        // Add warning for very long content
        if (length > 100000) {
          characterCount.style.color = 'var(--error-color)';
          characterCount.title = 'Very long content may affect performance';
        } else if (length > 50000) {
          characterCount.style.color = 'var(--warning-color)';
          characterCount.title = 'Large content size';
        } else {
          characterCount.style.color = 'var(--faint-color)';
          characterCount.title = '';
        }
      };
      
      editor.on('change', updateCount);
      updateCount(); // Initial count
    }
  }

  // override form submit
  if (editorForm) {
    editorForm.addEventListener('submit', async (ev) => {
      ev.preventDefault();

      // Validate form before submission
      const errors = validateForm();
      if (errors.length > 0) {
        showNotification(errors[0], 'error');
        return;
      }

      // Add loading state to submit button
      const submitBtn = editorForm.querySelector('.sidebar-btn.primary[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating...';
        
        // Reset button state function
        const resetButton = () => {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        };
        
        // Reset button after 10 seconds as fallback
        setTimeout(resetButton, 10000);
      }

      // Get all form data
      let content = editor.getValue();
      const encryptionPasswordInput = document.getElementById('encryptionPassword');
      const editCodeInput = document.getElementById('editcode');
      const customUrlInput = document.getElementById('url');
      
      const hasPassword = encryptionPasswordInput && encryptionPasswordInput.value.trim();
      const password = hasPassword ? encryptionPasswordInput.value.trim() : null;
      
      try {
        if (!window.ShareBinCrypto) {
          throw new Error('Encryption system not available');
        }
        
        // Always encrypt content
        let encryptedContent;
        let isPasswordProtected = false;
        
        if (password) {
          // Password-protected encryption
          encryptedContent = await window.ShareBinCrypto.encrypt(content, password);
          isPasswordProtected = true;
        } else {
          // Default encryption (auto-decrypt for viewers)
          encryptedContent = await window.ShareBinCrypto.encryptDefault(content);
        }
        
        // Encrypt edit code if provided
        let encryptedEditCode = null;
        if (editCodeInput && editCodeInput.value.trim()) {
          const editCode = editCodeInput.value.trim();
          if (password) {
            encryptedEditCode = await window.ShareBinCrypto.encrypt(editCode, password);
          } else {
            encryptedEditCode = await window.ShareBinCrypto.encryptDefault(editCode);
          }
        }
        
        // Set encrypted content
        textArea.value = encryptedContent;
        
        // Update edit code field with encrypted version
        if (encryptedEditCode && editCodeInput) {
          editCodeInput.value = encryptedEditCode;
        }
        
        // Clear the password field after encryption
        if (encryptionPasswordInput) {
          encryptionPasswordInput.value = '';
        }
        
        // Add encrypted flag to form
        let encryptedInput = document.getElementById('isEncrypted');
        if (!encryptedInput) {
          encryptedInput = document.createElement('input');
          encryptedInput.type = 'hidden';
          encryptedInput.id = 'isEncrypted';
          encryptedInput.name = 'isEncrypted';
          editorForm.appendChild(encryptedInput);
        }
        encryptedInput.value = 'true';
        
        // Add password protection flag
        let passwordProtectedInput = document.getElementById('isPasswordProtected');
        if (!passwordProtectedInput) {
          passwordProtectedInput = document.createElement('input');
          passwordProtectedInput.type = 'hidden';
          passwordProtectedInput.id = 'isPasswordProtected';
          passwordProtectedInput.name = 'isPasswordProtected';
          editorForm.appendChild(passwordProtectedInput);
        }
        passwordProtectedInput.value = isPasswordProtected.toString();
        
        showNotification('Content encrypted successfully!', 'success');
        
      } catch (error) {
        console.error('Encryption error:', error);
        showNotification('Encryption failed: ' + error.message, 'error');
        
        // Reset button on error
        if (submitBtn) {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
        return;
      }

      // Ensure expiry timestamp is properly set if expiry is selected
      if (window.getSelectedExpiryDate && window.getSelectedExpiryDate()) {
        const expiryDate = window.getSelectedExpiryDate();
        let hiddenInput = document.getElementById('selectedExpiryTimestamp');
        if (!hiddenInput) {
          hiddenInput = document.createElement('input');
          hiddenInput.type = 'hidden';
          hiddenInput.id = 'selectedExpiryTimestamp';
          hiddenInput.name = 'expiryTimestamp';
          editorForm.appendChild(hiddenInput);
        }
        hiddenInput.value = expiryDate.getTime().toString();
      } else {
        // Check if custom date is set directly (fallback)
        const customExpiryInput = document.getElementById('customExpiryDate');
        if (customExpiryInput && customExpiryInput.value) {
          const customDate = new Date(customExpiryInput.value);
          if (customDate.getTime() > Date.now()) {
            let hiddenInput = document.getElementById('selectedExpiryTimestamp');
            if (!hiddenInput) {
              hiddenInput = document.createElement('input');
              hiddenInput.type = 'hidden';
              hiddenInput.id = 'selectedExpiryTimestamp';
              hiddenInput.name = 'expiryTimestamp';
              editorForm.appendChild(hiddenInput);
            }
            hiddenInput.value = customDate.getTime().toString();
          }
        }
      }

      // Handle file attachments properly
      const fileInput = document.getElementById('fileAttachment');
      if (fileInput && window.getSelectedFiles) {
        const selectedFiles = window.getSelectedFiles();
        if (selectedFiles.length > 0) {
          // Create a new FormData object
          const formData = new FormData();
          
          // Add all form fields
          const formElements = editorForm.elements;
          for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            if (element.name && element.type !== 'file') {
              if (element.type === 'checkbox') {
                if (element.checked) {
                  formData.append(element.name, element.value);
                }
              } else {
                formData.append(element.name, element.value);
              }
            }
          }
          
          // Add selected files
          selectedFiles.forEach(file => {
            formData.append('fileAttachment', file);
          });
          
          // Submit using fetch
          fetch(editorForm.action, {
            method: 'POST',
            body: formData
          }).then(response => {
            if (response.redirected) {
              window.location.href = response.url;
            } else {
              // Handle non-redirect responses
              response.text().then(text => {
                document.open();
                document.write(text);
                document.close();
              });
            }
          }).catch(error => {
            console.error('Form submission error:', error);
            // Reset button on error
            if (submitBtn) {
              submitBtn.classList.remove('loading');
              submitBtn.disabled = false;
              submitBtn.textContent = originalText;
            }
          });
          
          return;
        }
      }

      editorForm.submit();
    });
  }

  // Add toolbar for common formatting options
  function createToolbar() {
    const toolbar = document.createElement('div');
    toolbar.className = 'editor-toolbar';
    toolbar.innerHTML = `
      <div class="toolbar-group">
        <button type="button" title="Bold (Ctrl+B)" data-action="bold">**B**</button>
        <button type="button" title="Italic (Ctrl+I)" data-action="italic">*I*</button>
        <button type="button" title="Code (Ctrl+Shift+C)" data-action="code">\`Code\`</button>
      </div>
      <div class="toolbar-group">
        <button type="button" title="Link (Ctrl+K)" data-action="link">🔗</button>
        <button type="button" title="List (Ctrl+Shift+L)" data-action="list">• List</button>
        <button type="button" title="Table (Ctrl+Shift+T)" data-action="table">📊</button>
      </div>
      <div class="toolbar-group">
        <button type="button" title="Heading" data-action="heading"># H</button>
        <button type="button" title="Quote" data-action="quote">❝ Quote</button>
      </div>
    `;
    
    toolbar.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const action = e.target.dataset.action;
        handleToolbarAction(action);
        editor.focus();
      }
    });
    
    cmEl.parentNode.insertBefore(toolbar, cmEl);
  }

  function handleToolbarAction(action) {
    switch (action) {
      case 'bold':
        wrapSelection(editor, '**', '**');
        break;
      case 'italic':
        wrapSelection(editor, '*', '*');
        break;
      case 'code':
        wrapSelection(editor, '`', '`');
        break;
      case 'link':
        insertLink(editor);
        break;
      case 'list':
        insertListItem(editor);
        break;
      case 'table':
        insertTable(editor);
        break;
      case 'heading':
        const cursor = editor.getCursor();
        const line = editor.getLine(cursor.line);
        if (!line.startsWith('#')) {
          editor.replaceRange('## ', { line: cursor.line, ch: 0 });
        }
        break;
      case 'quote':
        const cursor2 = editor.getCursor();
        const line2 = editor.getLine(cursor2.line);
        if (!line2.startsWith('>')) {
          editor.replaceRange('> ', { line: cursor2.line, ch: 0 });
        }
        break;
    }
  }

  // Toolbar disabled for cleaner interface
  // Users can use keyboard shortcuts for formatting
  // createToolbar();

  // Shortcuts modal functionality
  const shortcutsModal = document.getElementById('shortcuts-modal');
  const closeShortcutsBtn = document.getElementById('close-shortcuts');

  function toggleShortcutsModal() {
    if (shortcutsModal) {
      const isVisible = shortcutsModal.style.display === 'flex';
      
      if (isVisible) {
        shortcutsModal.style.display = 'none';
        editor.focus();
      } else {
        shortcutsModal.style.display = 'flex';
        // Focus the modal for accessibility
        setTimeout(() => {
          const closeButton = shortcutsModal.querySelector('#close-shortcuts');
          if (closeButton) {
            closeButton.focus();
          }
        }, 100);
      }
    }
  }

  function closeShortcutsModal() {
    if (shortcutsModal) {
      shortcutsModal.style.display = 'none';
      editor.focus();
    }
  }

  // Event listeners for modal
  if (closeShortcutsBtn) {
    closeShortcutsBtn.addEventListener('click', closeShortcutsModal);
  }

  if (shortcutsModal) {
    // Close modal when clicking outside content
    shortcutsModal.addEventListener('click', function(e) {
      if (e.target === shortcutsModal) {
        closeShortcutsModal();
      }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && shortcutsModal.style.display === 'flex') {
        closeShortcutsModal();
      }
    });
  }


  // Add click handler for footer shortcuts hint
  const shortcutsHint = document.querySelector('.shortcuts-hint');
  if (shortcutsHint) {
    shortcutsHint.addEventListener('click', function(e) {
      e.preventDefault();
      toggleShortcutsModal();
    });
  }

  function debounce(cb, wait) {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => cb(...args), wait);
    };
  }

  // File Attachment Functionality
  function initializeFileAttachment() {
    const fileInput = document.getElementById('fileAttachment');
    const fileList = document.getElementById('fileList');
    const fileItems = document.getElementById('fileItems');
    const clearFilesBtn = document.getElementById('clearAllFiles');
    const fileCount = document.getElementById('fileCount');
    const attachFilesBtn = document.getElementById('attachFiles');

    if (!fileInput) {
      console.log('File attachment elements not found, skipping initialization');
      return;
    }

    let selectedFiles = [];

    // Connect attach button to file input
    if (attachFilesBtn) {
      attachFilesBtn.addEventListener('click', function(e) {
        e.preventDefault();
        fileInput.click();
      });
    }

    // Handle file selection
    fileInput.addEventListener('change', function(e) {
      const files = Array.from(e.target.files);
      
      files.forEach(file => {
        // Check if file is already selected
        if (!selectedFiles.find(f => f.name === file.name && f.size === file.size)) {
          selectedFiles.push(file);
        }
      });

      updateFileList();
      // Clear the input so the same file can be selected again if removed and re-added
      fileInput.value = '';
    });

    // Handle clear all files
    if (clearFilesBtn) {
      clearFilesBtn.addEventListener('click', function() {
        selectedFiles = [];
        updateFileList();
      });
    }

    function updateFileList() {
      if (!fileList || !fileItems) return;

      if (selectedFiles.length === 0) {
        fileList.style.display = 'none';
        return;
      }

      fileList.style.display = 'block';
      if (fileCount) {
        fileCount.textContent = `Selected files (${selectedFiles.length}):`;
      }

      // Clear existing items
      fileItems.innerHTML = '';

      // Add each file
      selectedFiles.forEach((file, index) => {
        const fileItem = createFileItem(file, index);
        fileItems.appendChild(fileItem);
      });
    }

    function createFileItem(file, index) {
      const item = document.createElement('div');
      item.className = 'file-item';

      const size = formatFileSize(file.size);
      const icon = getFileIcon(file.name);

      item.innerHTML = `
        <div class="file-info">
          <svg class="file-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="${icon}"/>
          </svg>
          <div class="file-details">
            <div class="file-name" title="${file.name}">${file.name}</div>
            <div class="file-size">${size}</div>
          </div>
        </div>
        <button type="button" class="file-remove-btn" title="Remove file" data-index="${index}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
          </svg>
        </button>
      `;

      // Add remove handler
      const removeBtn = item.querySelector('.file-remove-btn');
      removeBtn.addEventListener('click', function() {
        selectedFiles.splice(index, 1);
        updateFileList();
      });

      return item;
    }

    function formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function getFileIcon(filename) {
      const ext = filename.split('.').pop().toLowerCase();
      
      // Return SVG paths for different file types
      switch (ext) {
        case 'js':
        case 'ts':
        case 'jsx':
        case 'tsx':
          return "M3,3H21V21H3V3M7.73,18.04C8.13,18.89 8.92,19.59 10.27,19.59C11.77,19.59 12.8,18.79 12.8,17.04V11.26H11.1V17C11.1,17.86 10.75,18.08 10.2,18.08C9.62,18.08 9.38,17.68 9.09,17.18L7.73,18.04M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86Z";
        case 'html':
        case 'htm':
          return "M12,17.56L16.07,16.43L16.62,10.33H9.38L9.2,8.3H16.8L17,6.31H7L7.56,12.32H14.45L14.22,14.9L12,15.5L9.78,14.9L9.64,13.24H7.64L7.93,16.43L12,17.56M4.07,3H19.93L18.5,19.2L12,21L5.5,19.2L4.07,3Z";
        case 'css':
          return "M5,3L4.35,6.34H17.94L17.5,8.5H3.92L3.26,11.83H16.85L16.09,15.64L10.61,17.45L5.86,15.64L6.19,14H2.85L2.06,18L9.91,21L18.96,18L20.16,11.97L20.4,10.76L21.94,3H5Z";
        case 'json':
          return "M5,3H7V5H5V10A2,2 0 0,1 3,12A2,2 0 0,1 5,14V19H7V21H5C3.93,20.73 3,20.1 3,19V15A2,2 0 0,0 1,13H0V11H1A2,2 0 0,0 3,9V5C3,3.9 3.9,3 5,3M19,3A2,2 0 0,1 21,5V9A2,2 0 0,0 23,11H24V13H23A2,2 0 0,0 21,15V19A2,2 0 0,1 19,21H17V19H19V14A2,2 0 0,1 21,12A2,2 0 0,1 19,10V5H17V3H19M12,15A1,1 0 0,1 13,16A1,1 0 0,1 12,17A1,1 0 0,1 11,16A1,1 0 0,1 12,15M8,15A1,1 0 0,1 9,16A1,1 0 0,1 8,17A1,1 0 0,1 7,16A1,1 0 0,1 8,15M16,15A1,1 0 0,1 17,16A1,1 0 0,1 16,17A1,1 0 0,1 15,16A1,1 0 0,1 16,15Z";
        case 'md':
        case 'markdown':
          return "M22.269,19.385H1.731a1.73,1.73 0,0 1,-1.73 -1.73V6.345a1.73,1.73 0,0 1,1.73 -1.73H22.269a1.73,1.73 0,0 1,1.73 1.73V17.654A1.73,1.73 0,0 1,22.269 19.385ZM5.547,16.855L8.3,14.1H6.977V9.646H4.117V14.1H2.794ZM16.982,9.646H14.122V14.1H12.8L15.552,16.855L18.3,14.1H16.982Z";
        case 'txt':
          return "M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z";
        case 'pdf':
          return "M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z";
        case 'py':
          return "M19.14,7.5A2.86,2.86 0 0,1 22,10.36V14.14A2.86,2.86 0 0,1 19.14,17H12C12,17.39 12.32,17.96 12.71,17.96H17V19.64A2.86,2.86 0 0,1 14.14,22.5H9.86A2.86,2.86 0 0,1 7,19.64V15.89C7,14.31 8.28,13.04 9.86,13.04H15.11C16.69,13.04 17.96,11.76 17.96,10.18V7.5H19.14M14.86,19.29C14.46,19.29 14.14,19.59 14.14,20.18C14.14,20.77 14.46,20.89 14.86,20.89A0.71,0.71 0 0,0 15.57,20.18C15.57,19.59 15.25,19.29 14.86,19.29M9.14,5.71C9.54,5.71 9.86,5.41 9.86,4.82C9.86,4.23 9.54,4.11 9.14,4.11A0.71,0.71 0 0,0 8.43,4.82C8.43,5.41 8.75,5.71 9.14,5.71M15.11,1.5A2.86,2.86 0 0,1 17.96,4.36V8.11C17.96,9.69 16.69,10.96 15.11,10.96H9.86C8.28,10.96 7,12.24 7,13.82V15.89C7,16.28 6.68,16.85 6.29,16.85H2V15.18A2.86,2.86 0 0,1 4.86,12.32H12C12,11.93 11.68,11.36 11.29,11.36H7V9.68A2.86,2.86 0 0,1 9.86,6.82H15.11A2.86,2.86 0 0,1 17.96,4V1.5H15.11Z";
        default:
          return "M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z";
      }
    }

    // Make selected files available globally for form submission
    window.getSelectedFiles = function() {
      return selectedFiles;
    };
  }

  // Initialize file attachment
  initializeFileAttachment();

  // Expiry Date Functionality
  function initializeExpiryDate() {
    const enableExpiryCheckbox = document.getElementById('enableExpiryDate');
    const expiryDateOptions = document.getElementById('expiryDateOptions');
    const quickExpiryButtons = document.querySelectorAll('.compact-expiry-btn'); // Changed from quick-expiry-btn
    const customExpiryInput = document.getElementById('customExpiryDate');
    const selectedExpiryDisplay = document.getElementById('selectedExpiryDisplay');
    const expiryDisplayValue = document.getElementById('expiryDisplayValue');
    const clearExpiryBtn = document.getElementById('clearExpiry');

    if (!quickExpiryButtons.length) {
      console.log('Expiry date elements not found, skipping initialization');
      return;
    }

    let selectedExpiryDate = null;

    // Initialize default selection (1 day)
    function initializeDefaultSelection() {
      const defaultButton = document.querySelector('.compact-expiry-btn[data-hours="24"]');
      if (defaultButton && defaultButton.classList.contains('selected')) {
        const hours = parseInt(defaultButton.dataset.hours);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + hours);
        setSelectedExpiry(expiryDate, defaultButton.textContent);
      }
    }

    // Toggle expiry options visibility - only if elements exist
    if (enableExpiryCheckbox && expiryDateOptions) {
      enableExpiryCheckbox.addEventListener('change', function() {
        if (this.checked) {
          expiryDateOptions.style.display = 'block';
        } else {
          expiryDateOptions.style.display = 'none';
          clearSelectedExpiry();
        }
      });
    } else {
      console.log('Expiry checkbox or options not found, skipping expiry toggle initialization');
    }

    // Handle quick expiry button clicks
    quickExpiryButtons.forEach(button => {
      button.addEventListener('click', function() {
        const hours = this.dataset.hours;
        let expiryDate = null;
        
        if (hours === 'custom') {
          // Custom date button clicked
          // Clear previous selections
          quickExpiryButtons.forEach(btn => btn.classList.remove('selected'));
          
          // Mark this button as selected
          this.classList.add('selected');
          
          // Show custom date input
          customExpiryInput.style.display = 'block';
          customExpiryInput.focus();
          
          // Clear any existing expiry
          clearSelectedExpiry();
          
          return;
        }
        
        const hoursNum = parseInt(hours);
        
        if (hoursNum > 0) {
          expiryDate = new Date();
          expiryDate.setHours(expiryDate.getHours() + hoursNum);
        }
        
        // Clear previous selections
        quickExpiryButtons.forEach(btn => btn.classList.remove('selected'));
        customExpiryInput.value = '';
        customExpiryInput.style.display = 'none';
        
        // Mark this button as selected
        this.classList.add('selected');
        
        if (hoursNum === 0) {
          // Infinite expiry
          clearSelectedExpiry();
        } else {
          setSelectedExpiry(expiryDate, this.textContent);
        }
      });
    });

    // Handle custom date input
    customExpiryInput.addEventListener('change', function() {
      if (this.value) {
        const expiryDate = new Date(this.value);
        const now = new Date();
        
        if (expiryDate <= now) {
          alert('Expiry date must be in the future');
          this.value = '';
          return;
        }
        
        // Keep custom button selected
        quickExpiryButtons.forEach(btn => btn.classList.remove('selected'));
        const customBtn = document.getElementById('customDateBtn');
        if (customBtn) {
          customBtn.classList.add('selected');
        }
        
        setSelectedExpiry(expiryDate, 'Custom date');
      } else {
        // If input is cleared, clear the expiry
        clearSelectedExpiry();
      }
    });

    // Handle clear expiry
    if (clearExpiryBtn) {
      clearExpiryBtn.addEventListener('click', function() {
        clearSelectedExpiry();
      });
    }

    function setSelectedExpiry(date, label) {
      selectedExpiryDate = date;
      
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      };
      
      const formattedDate = date.toLocaleDateString(navigator.language || 'en-US', options);
      
      if (expiryDisplayValue) {
        expiryDisplayValue.textContent = formattedDate;
      }
      
      if (selectedExpiryDisplay) {
        selectedExpiryDisplay.style.display = 'flex';
      }
      
      // Set a hidden input value for form submission
      let hiddenInput = document.getElementById('selectedExpiryTimestamp');
      if (!hiddenInput && expiryDateOptions) {
        hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.id = 'selectedExpiryTimestamp';
        hiddenInput.name = 'expiryTimestamp';
        expiryDateOptions.appendChild(hiddenInput);
      }
      if (hiddenInput) {
        hiddenInput.value = date.getTime();
      }
    }

    function clearSelectedExpiry() {
      selectedExpiryDate = null;
      
      if (selectedExpiryDisplay) {
        selectedExpiryDisplay.style.display = 'none';
      }
      
      // Remove hidden input
      const hiddenInput = document.getElementById('selectedExpiryTimestamp');
      if (hiddenInput) {
        hiddenInput.remove();
      }
    }

    // Set minimum datetime for custom input to current time
    function setMinDateTime() {
      if (!customExpiryInput) return;
      
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      
      const minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
      customExpiryInput.min = minDateTime;
    }

    // Initialize minimum datetime
    setMinDateTime();
    
    // Update minimum datetime every minute
    setInterval(setMinDateTime, 60000);

    // Initialize default selection
    initializeDefaultSelection();

    // Make expiry functions available globally for debugging
    window.getSelectedExpiryDate = function() {
      return selectedExpiryDate;
    };
  }

  // Initialize expiry date
  initializeExpiryDate();

  // Modern Interface Functionality
  function initializeModernInterface() {
    // Password toggle functionality
    const enableEncryption = document.getElementById('enableEncryption');
    const passwordField = document.getElementById('passwordField');
    const togglePasswordVisibility = document.getElementById('togglePasswordVisibility');
    const encryptionPassword = document.getElementById('encryptionPassword');

    if (enableEncryption && passwordField) {
      enableEncryption.addEventListener('change', function() {
        if (this.checked) {
          passwordField.style.display = 'block';
          setTimeout(() => {
            if (encryptionPassword) {
              encryptionPassword.focus();
            }
          }, 100);
        } else {
          passwordField.style.display = 'none';
          if (encryptionPassword) {
            encryptionPassword.value = '';
          }
        }
      });
    }

    if (togglePasswordVisibility && encryptionPassword) {
      togglePasswordVisibility.addEventListener('click', function() {
        const type = encryptionPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        encryptionPassword.setAttribute('type', type);
        
        // Update icon
        const icon = type === 'password' 
          ? 'M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z'
          : 'M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.09L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.76,7.13 11.37,7 12,7Z';
        
        this.querySelector('path').setAttribute('d', icon);
      });
    }

    // Expiry buttons functionality is handled by the main expiry initialization
    // This section is removed to avoid conflicts

    // File attachment button
    const attachFilesBtn = document.getElementById('attachFiles');
    const fileAttachment = document.getElementById('fileAttachment');
    
    if (attachFilesBtn && fileAttachment) {
      attachFilesBtn.addEventListener('click', function(e) {
        e.preventDefault();
        fileAttachment.click();
      });
      
      // Add visual feedback when hovering
      attachFilesBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-1px)';
      });
      
      attachFilesBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    }

    // Ensure Create Note button functionality
    const createNoteBtn = document.querySelector('.sidebar-btn.primary[type="submit"]');
    if (createNoteBtn) {
      createNoteBtn.addEventListener('click', function(e) {
        // Let the form submission handle the note creation
        console.log('Create note button clicked');
      });
      
      // Add visual feedback
      createNoteBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-1px)';
      });
      
      createNoteBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    }

  }

  // Initialize modern interface
  initializeModernInterface();

  // Initialize enhanced validation and feedback
  setupRealTimeValidation();
  setupCharacterCount();

  // Initialize everything
  console.log('Modern editor initialization complete');
})();
