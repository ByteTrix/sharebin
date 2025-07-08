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

  // Initialize everything
  console.log('Editor initialization complete');
})();
