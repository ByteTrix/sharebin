(function() {
  const MAX_LENGTH = 40000;
  const cmEl = document.getElementById('editor');
  const textArea = document.getElementById('pasteTextArea');
  const editorTab = document.getElementById('tab1');
  const editorForm = document.getElementById('editor-form');
  const previewTab = document.getElementById('tab2');
  const previewContainer = document.getElementById('preview-container');
  const characterCount = document.getElementById('characterCount');

  // Check if required elements exist
  if (!cmEl || !textArea || !editorTab || !previewTab || !previewContainer) {
    console.error('Required editor elements not found:', {
      cmEl: !!cmEl,
      textArea: !!textArea,
      editorTab: !!editorTab,
      previewTab: !!previewTab,
      previewContainer: !!previewContainer
    });
    return;
  }

  console.log('All required elements found, initializing editor...');

  // Check if CodeMirror is available
  if (typeof CodeMirror === 'undefined') {
    console.error('CodeMirror not loaded');
    return;
  }

  console.log('CodeMirror available, proceeding with initialization...');

  // onload, reset to editorTab since we can't be sure preview tab will be populated
  editorTab.click();

  // hide paste textarea
  textArea.style.display = 'none';

  const editor = new CodeMirror(cmEl, {
    mode: 'markdown',
    value: textArea.value,
    keymap: 'sublime',
    theme: 'default',
    viewportMargin: Infinity,
    lineNumbers: true,
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
      previewContainer.innerHTML = '<p style="color: var(--faint-color); font-style: italic; padding: var(--spacing-4);">Preview will appear here...</p>';
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
      } else {
        // Show error message if server preview fails
        previewContainer.innerHTML = `<div style="color: var(--error-color); padding: var(--spacing-4); border: 1px solid var(--error-color); border-radius: 0.375rem; margin: var(--spacing-4);">
          <strong>Preview Error:</strong> Unable to generate preview. Please try again.
        </div>`;
      }
      
    } catch (error) {
      console.error('Server preview error:', error);
      // Show error message if server preview fails
      previewContainer.innerHTML = `<div style="color: var(--error-color); padding: var(--spacing-4); border: 1px solid var(--error-color); border-radius: 0.375rem; margin: var(--spacing-4);">
        <strong>Preview Error:</strong> Unable to generate preview. Please try again.
      </div>`;
    }
  }

  // initialize characterCount
  const updateCharacterCount = (count) => {
    characterCount.innerHTML = `${count}/${MAX_LENGTH}`;
    
    // Add visual warning when approaching limit
    if (count > MAX_LENGTH * 0.9) {
      characterCount.style.color = 'var(--error-color)';
    } else if (count > MAX_LENGTH * 0.8) {
      characterCount.style.color = 'orange';
    } else {
      characterCount.style.color = 'var(--faint-color)';
    }
  };

  updateCharacterCount(textArea.value.length);

  const updateTextArea = debounce((value) => {
    textArea.value = value;
  }, 1500);

  // set onChange to update text area with editor text
  // this is helpful for persistence across page reloads
  const onChange = (instance, change) => {
    const value = instance.getValue();
    textArea.value = value;
    updateCharacterCount(value.length);
    updateTextArea(value);
    
    // Update preview if preview tab is active
    if (previewTab.checked) {
      debouncedPreviewUpdate();
    }
  };

  // Debounced preview update for performance
  const debouncedPreviewUpdate = debounce(updatePreview, 500);

  // this is a long-winded way of implementing a max-length on CodeMirror
  const onBeforeChange = (instance, change) => {
    if (change.update) {
      const newLine = instance.getDoc().lineSeparator();
      let text = change.text.join(newLine);
      let delta = text.length - (instance.indexFromPos(change.to) - instance.indexFromPos(change.from));
      if (delta <= 0) return true;

      delta = instance.getValue().length + delta - MAX_LENGTH;
      if (delta > 0) {
        text = text.substr(0, text.length - delta);
        change.update(change.from, change.to, text.split(newLine));
      }
    }

    return true;
  };

  editor.on('change', onChange);
  editor.on('beforeChange', onBeforeChange);

  // set event listener to refresh editor on tab select
  editorTab.addEventListener('click', () => {
    editor.refresh();
  });

  // override form submit
  editorForm.addEventListener('submit', (ev) => {
    ev.preventDefault();

    // set textarea to ensure it is up to date
    textArea.value = editor.getValue();

    editorForm.submit();
  });

  // populate preview tab when activating it
  previewTab.addEventListener('change', () => {
    if (previewTab.checked) {
      updatePreview();
    }
  });

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

  // Make toggleShortcutsModal available globally for debugging
  window.toggleShortcutsModal = toggleShortcutsModal;

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
    const fileAttachmentList = document.getElementById('fileAttachmentList');
    const fileItems = document.querySelector('.file-items');
    const fileCount = document.querySelector('.file-count');
    const clearFilesBtn = document.getElementById('clearFiles');
    const fileAttachmentLabel = document.querySelector('.file-attachment-label');

    if (!fileInput || !fileAttachmentList || !fileItems || !fileCount || !clearFilesBtn) {
      console.log('File attachment elements not found, skipping initialization');
      return;
    }

    let selectedFiles = [];

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
    clearFilesBtn.addEventListener('click', function() {
      selectedFiles = [];
      updateFileList();
    });

    // Handle drag and drop
    fileAttachmentLabel.addEventListener('dragover', function(e) {
      e.preventDefault();
      fileAttachmentLabel.classList.add('drag-over');
    });

    fileAttachmentLabel.addEventListener('dragleave', function(e) {
      e.preventDefault();
      fileAttachmentLabel.classList.remove('drag-over');
    });

    fileAttachmentLabel.addEventListener('drop', function(e) {
      e.preventDefault();
      fileAttachmentLabel.classList.remove('drag-over');
      
      const files = Array.from(e.dataTransfer.files);
      files.forEach(file => {
        // Check if file is already selected
        if (!selectedFiles.find(f => f.name === file.name && f.size === file.size)) {
          selectedFiles.push(file);
        }
      });

      updateFileList();
    });

    function updateFileList() {
      if (selectedFiles.length === 0) {
        fileAttachmentList.style.display = 'none';
        return;
      }

      fileAttachmentList.style.display = 'block';
      fileCount.textContent = `Selected files (${selectedFiles.length}):`;

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
        case 'java':
          return "M8.851,18.56S9.53,19.15 11.36,19.15C16.66,19.15 16.87,16.41 16.87,16.41V15.74C16.87,15.74 15.36,16.91 12.27,16.91C8.84,16.91 8.851,18.56 8.851,18.56M8.544,15.688S9.257,16.25 11.021,16.25C15.191,16.25 15.191,14.289 15.191,14.289V13.591C15.191,13.591 13.72,14.74 10.63,14.74C7.2,14.74 8.544,15.688 8.544,15.688M14.581,17.56C14.581,17.56 16.87,16.41 16.87,16.41V15.74C16.87,15.74 15.36,16.91 12.27,16.91S8.851,18.56 8.851,18.56S9.53,19.15 11.36,19.15C16.66,19.15 16.87,16.41 16.87,16.41V15.74M14.581,16.25C14.581,16.25 16.87,15.1 16.87,15.1V14.43C16.87,14.43 15.36,15.6 12.27,15.6S8.851,17.25 8.851,17.25S9.53,17.84 11.36,17.84C16.66,17.84 16.87,15.1 16.87,15.1V14.43";
        default:
          return "M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z";
      }
    }

    // Attach files to form data when submitting
    const originalSubmit = editorForm.addEventListener;
    editorForm.addEventListener('submit', function(e) {
      if (selectedFiles.length > 0) {
        // Store files in a hidden input or handle them differently
        // For now, we'll just log them as the backend would need to handle file uploads
        console.log('Files to attach:', selectedFiles);
        
        // You could convert files to base64 and store in hidden inputs
        // or handle them via FormData when implementing backend support
      }
    });

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
    const quickExpiryButtons = document.querySelectorAll('.quick-expiry-btn');
    const customExpiryInput = document.getElementById('customExpiryDate');
    const selectedExpiryDisplay = document.getElementById('selectedExpiryDisplay');
    const expiryDisplayValue = document.getElementById('expiryDisplayValue');
    const clearExpiryBtn = document.getElementById('clearExpiry');

    if (!enableExpiryCheckbox || !expiryDateOptions || !customExpiryInput) {
      console.log('Expiry date elements not found, skipping initialization');
      return;
    }

    let selectedExpiryDate = null;

    // Toggle expiry options visibility
    enableExpiryCheckbox.addEventListener('change', function() {
      if (this.checked) {
        expiryDateOptions.style.display = 'block';
      } else {
        expiryDateOptions.style.display = 'none';
        clearSelectedExpiry();
      }
    });

    // Handle quick expiry button clicks
    quickExpiryButtons.forEach(button => {
      button.addEventListener('click', function() {
        const hours = parseInt(this.dataset.hours);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + hours);
        
        // Clear previous selections
        quickExpiryButtons.forEach(btn => btn.classList.remove('selected'));
        customExpiryInput.value = '';
        
        // Mark this button as selected
        this.classList.add('selected');
        
        setSelectedExpiry(expiryDate, this.textContent);
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
        
        // Clear quick button selections
        quickExpiryButtons.forEach(btn => btn.classList.remove('selected'));
        
        setSelectedExpiry(expiryDate, 'Custom date');
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
      expiryDisplayValue.textContent = formattedDate;
      selectedExpiryDisplay.style.display = 'flex';
      
      // Set a hidden input value for form submission
      let hiddenInput = document.getElementById('selectedExpiryTimestamp');
      if (!hiddenInput) {
        hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.id = 'selectedExpiryTimestamp';
        hiddenInput.name = 'expiryTimestamp';
        expiryDateOptions.appendChild(hiddenInput);
      }
      hiddenInput.value = date.getTime();
    }

    function clearSelectedExpiry() {
      selectedExpiryDate = null;
      selectedExpiryDisplay.style.display = 'none';
      quickExpiryButtons.forEach(btn => btn.classList.remove('selected'));
      customExpiryInput.value = '';
      
      // Remove hidden input
      const hiddenInput = document.getElementById('selectedExpiryTimestamp');
      if (hiddenInput) {
        hiddenInput.remove();
      }
    }

    // Set minimum datetime for custom input to current time
    function setMinDateTime() {
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

    // Make expiry functions available globally for debugging
    window.getSelectedExpiryDate = function() {
      return selectedExpiryDate;
    };
  }

  // Initialize expiry date
  initializeExpiryDate();

  // Initialize everything
  console.log('Editor initialization complete');
})();
