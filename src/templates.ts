import { CloudflareEnv } from './env';

const _if = (condition: unknown, template: string) => (
  condition ? template : ''
);

const Tabs = () => `
  <input type="radio" name="tabs" id="tab1" class="tab-input" checked />
  <label class="tab" for="tab1">editor</label>
  <input type="radio" name="tabs" id="tab2" class="tab-input" />
  <label class="tab" for="tab2">preview</label>
  <small id="characterCount"></small>
`;

const Editor = (paste = '') => `
  <div id="editor-container">
    <textarea id="pasteTextArea" name="paste" required>${paste}</textarea>
    <div id="editor"></div>
  </div>

  <div id="preview-container">
  </div>

  <!-- Shortcuts Modal -->
  <div id="shortcuts-modal" class="shortcuts-modal" style="display: none;">
    <div class="shortcuts-modal-content">
      <div class="shortcuts-modal-header">
        <h3>⌨️ Keyboard Shortcuts</h3>
        <button id="close-shortcuts" class="close-button" title="Close shortcuts">&times;</button>
      </div>
      <div class="shortcuts-grid">
        <div class="shortcut-group">
          <h4>Text Formatting</h4>
          <div class="shortcut-item">
            <div class="shortcut-keys">
              <kbd>Ctrl</kbd> + <kbd>B</kbd>
            </div>
            <span>Bold text</span>
          </div>
          <div class="shortcut-item">
            <div class="shortcut-keys">
              <kbd>Ctrl</kbd> + <kbd>I</kbd>
            </div>
            <span>Italic text</span>
          </div>
          <div class="shortcut-item">
            <div class="shortcut-keys">
              <kbd>Ctrl</kbd> + <kbd>K</kbd>
            </div>
            <span>Insert link</span>
          </div>
          <div class="shortcut-item">
            <div class="shortcut-keys">
              <kbd>Ctrl</kbd> + <kbd>\`</kbd>
            </div>
            <span>Inline code</span>
          </div>
        </div>
        <div class="shortcut-group">
          <h4>Navigation</h4>
          <div class="shortcut-item">
            <div class="shortcut-keys">
              <kbd>Ctrl</kbd> + <kbd>G</kbd>
            </div>
            <span>Go to line</span>
          </div>
          <div class="shortcut-item">
            <div class="shortcut-keys">
              <kbd>Ctrl</kbd> + <kbd>F</kbd>
            </div>
            <span>Find text</span>
          </div>
          <div class="shortcut-item">
            <div class="shortcut-keys">
              <kbd>Ctrl</kbd> + <kbd>H</kbd>
            </div>
            <span>Find & replace</span>
          </div>
          <div class="shortcut-item">
            <div class="shortcut-keys">
              <kbd>F11</kbd>
            </div>
            <span>Fullscreen editor</span>
          </div>
        </div>
        <div class="shortcut-group">
          <h4>Lists & Structure</h4>
          <div class="shortcut-item">
            <div class="shortcut-keys">
              <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd>
            </div>
            <span>Bullet list</span>
          </div>
          <div class="shortcut-item">
            <div class="shortcut-keys">
              <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>O</kbd>
            </div>
            <span>Numbered list</span>
          </div>
          <div class="shortcut-item">
            <div class="shortcut-keys">
              <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>></kbd>
            </div>
            <span>Quote block</span>
          </div>
          <div class="shortcut-item">
            <div class="shortcut-keys">
              <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd>
            </div>
            <span>Heading</span>
          </div>
        </div>
        <div class="shortcut-group">
          <h4>Editor Control</h4>
          <div class="shortcut-item">
            <div class="shortcut-keys">
              <kbd>Tab</kbd>
            </div>
            <span>Increase indent</span>
          </div>
          <div class="shortcut-item">
            <div class="shortcut-keys">
              <kbd>Shift</kbd> + <kbd>Tab</kbd>
            </div>
            <span>Decrease indent</span>
          </div>
          <div class="shortcut-item">
            <div class="shortcut-keys">
              <kbd>Ctrl</kbd> + <kbd>A</kbd>
            </div>
            <span>Select all</span>
          </div>
          <div class="shortcut-item">
            <div class="shortcut-keys">
              <kbd>Ctrl</kbd> + <kbd>S</kbd>
            </div>
            <span>Save paste</span>
          </div>
          <div class="shortcut-item">
            <div class="shortcut-keys">
              <kbd>Ctrl</kbd> + <kbd>/</kbd>
            </div>
            <span>Show/hide shortcuts</span>
          </div>
        </div>
      </div>
      <div class="shortcuts-note">
        <p>💡 <strong>Tip:</strong> These shortcuts work directly in the editor for faster markdown formatting.</p>
      </div>
    </div>
  </div>
`;

const layout = (title: string, content: string, mode?: string) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="pastebin" >
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
    <link rel="stylesheet" href="/codemirror.min.css">
    <link rel="stylesheet" href="/highlight-light.min.css" media="(prefers-color-scheme: light)">
    <link rel="stylesheet" href="/highlight-dark.min.css" media="(prefers-color-scheme: dark)">
    <link rel="stylesheet" href="/main.css">
    <title>
      ${title || 'flrbin'}
    </title>
  </head>
  <body>
    <div class="dark-mode-container">
      <input style="display: none;" type="checkbox" id="darkSwitch" />
      <label class="dark-mode-btn" for="darkSwitch">🌒</label>
    </div>

    ${_if(mode === 'demo', `
      <div role="alert" class="demo-alert">
        <strong style="font-size: 2em">
          <p>This is a DEMO instance.</p>
          <p>Posts will be automatically deleted every few minutes.</p>
        </strong>
      </div>
    `)}

    ${content}
    <footer>
      <hr />
      <div class="footer-content">
        <div class="footer-links">
          <a href="/">new</a>
          <a href="/guide">guide</a>
          <a href="https://github.com/kvnlabs/flrbin">source</a>
        </div>
        <div class="shortcuts-hint">
          <span class="hint-text">✨ Press <kbd>Ctrl</kbd> + <kbd>/</kbd> for keyboard shortcuts</span>
        </div>
      </div>
    </footer>
    <script src="/theme-switch.js"></script>
    <script src="/nacl.min.js"></script>
    <script src="/nacl-util.min.js"></script>
    <script src="/crypto.js"></script>
  </body>
  </html>
`;

export const homePage = ({
  paste = '',
  url = '',
  errors = { url: '' },
  mode = '',
} = {}) => layout('flrbin', `
  <main>
    ${Tabs()}

    <form id="editor-form" method="post" action="/save">
      ${Editor(paste)}

      <div class="input-group">
        <div>
          <input
            name="editcode"
            type="text"
            placeholder="edit code (optional)"
            minlength="3"
            maxlength="40"
          />
        </div>
        <div>
          <input
            name="url"
            type="text"
            placeholder="custom url"
            minlength="3"
            maxlength="40"
            value="${url}"
            pattern=".*\\S+.*"
            aria-invalid="${Boolean(errors.url)}"
            ${_if(errors.url, 'aria-describedby="url-error"')}
          />
          ${_if(errors.url, `
            <small class="error" id="url-error">${errors.url}</small>
          `)}
        </div>
      </div>

      <div class="encryption-section">
        <label>
          <input type="checkbox" id="enableEncryption" name="enableEncryption" />
          <span class="encryption-label">🔒 Encrypt this paste with a password</span>
        </label>
        <div id="encryptionOptions" class="encryption-options" style="display: none;">
          <div class="input-group">
            <div>
              <input
                type="password"
                id="encryptionPassword"
                name="encryptionPassword"
                placeholder="Encryption password"
                minlength="8"
              />
            </div>
            <div>
              <button type="button" id="generatePassword" title="Generate secure password">🎲</button>
            </div>
          </div>
          <small class="encryption-note">
            🔒 Your paste will be encrypted with <strong>AES-256-GCM</strong> using <strong>PBKDF2</strong> key derivation (100,000 iterations).<br>
            Anyone who wants to view this paste will need to enter the password.<br>
            ⚠️ If you lose the password, the paste cannot be recovered.
          </small>
        </div>
      </div>

      <div class="button-group">
        <button type="submit">
          save
        </button>
      </div>
    </form>
  </main>
  <script src="/codemirror.min.js"></script>
  <script src="/cm-markdown.min.js"></script>
  <script src="/cm-sublime.min.js"></script>
  <script src="/editor.js"></script>
  <script src="/encryption-ui.js"></script>
`, mode);

import { PasteRevision } from './storage';

export const pastePage = ({ id = '', html = '', title = '', mode = '', revisions = [], isEncrypted = false }: { id?: string; html?: string; title?: string; mode?: string; revisions?: PasteRevision[]; isEncrypted?: boolean } = {}) => layout(title, `
  <main>
    <div class="paste-container">
      ${html}
    </div>
    <div class="button-group">
      <a class="btn" href="/${id}/raw">raw</a>
      <a class="btn" href="/${id}/edit">edit</a>
      <a class="btn" href="/${id}/delete">delete</a>
      ${_if(isEncrypted, `
        <button class="btn decrypt-btn" onclick="showDecryptPrompt('${id}')">🔓 Decrypt</button>
      `)}
    </div>
    ${_if(revisions.length > 0, `
      <div class="revision-history">
        <h3>Revision History</h3>
        <ul>
          ${revisions.map(rev => `
            <li>
              <a href="/${id}/edit?revision=${rev.timestamp}">
                ${new Date(rev.timestamp).toLocaleString()}
              </a>
            </li>
          `).join('')}
        </ul>
      </div>
    `)}
  </main>

  <!-- Decryption Modal -->
  <div id="decryption-modal" class="modal" style="display: none;">
    <div class="modal-content">
      <div class="modal-header">
        <h3>🔓 Decrypt Paste</h3>
        <button class="close-button" onclick="hideDecryptPrompt()">&times;</button>
      </div>
      <div class="modal-body">
        <p>Enter the password to decrypt this paste:</p>
        <form id="decrypt-form">
          <div class="input-group">
            <input
              type="password"
              id="decrypt-password"
              placeholder="Enter password"
              required
              autofocus
            />
          </div>
          <div class="button-group">
            <button type="submit" id="decrypt-submit-btn">🔓 Decrypt</button>
            <button type="button" onclick="hideDecryptPrompt()">Cancel</button>
          </div>
        </form>
        <div id="decrypt-error" class="error" style="display: none;"></div>
        <div id="decrypt-loading" class="loading" style="display: none;">
          <span>Decrypting...</span>
        </div>
      </div>
    </div>
  </div>

  <script>
    function showDecryptPrompt(id) {
      document.getElementById('decryption-modal').style.display = 'flex';
      document.getElementById('decrypt-password').focus();
    }

    function hideDecryptPrompt() {
      document.getElementById('decryption-modal').style.display = 'none';
      document.getElementById('decrypt-error').style.display = 'none';
      document.getElementById('decrypt-loading').style.display = 'none';
      document.getElementById('decrypt-password').value = '';
    }

    function showDecryptError(message) {
      const errorDiv = document.getElementById('decrypt-error');
      errorDiv.textContent = message;
      errorDiv.style.display = 'block';
    }

    function showDecryptLoading(show = true) {
      const loadingDiv = document.getElementById('decrypt-loading');
      const submitBtn = document.getElementById('decrypt-submit-btn');
      
      if (show) {
        loadingDiv.style.display = 'block';
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Decrypting...';
      } else {
        loadingDiv.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.textContent = '🔓 Decrypt';
      }
    }

    document.getElementById('decrypt-form').addEventListener('submit', async function(e) {
      e.preventDefault();
      const password = document.getElementById('decrypt-password').value;
      
      if (!password) {
        showDecryptError('Please enter a password');
        return;
      }

      showDecryptLoading(true);
      document.getElementById('decrypt-error').style.display = 'none';
      
      try {
        const response = await fetch('/${id}/decrypt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'password=' + encodeURIComponent(password)
        });

        if (response.ok) {
          window.location.reload();
        } else {
          showDecryptError('Invalid password or decryption failed');
        }
      } catch (error) {
        console.error('Decryption error:', error);
        showDecryptError('Decryption failed: ' + error.message);
      } finally {
        showDecryptLoading(false);
      }
    });
  </script>

  <style>
    .modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      justify-content: center;
      align-items: center;
    }

    .modal-content {
      background-color: var(--bg-color);
      padding: 0;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      width: 90%;
      max-width: 400px;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--border-color);
    }

    .modal-header h3 {
      margin: 0;
    }

    .close-button {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--text-secondary);
    }

    .modal-body {
      padding: 1.5rem;
    }

    .decrypt-btn {
      background-color: var(--primary-color, #007bff);
      color: white;
    }

    .error {
      color: var(--error-color, #dc3545);
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .loading {
      color: var(--text-secondary);
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--bg-color);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      padding: 1rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 1001;
      max-width: 300px;
    }

    .notification.success {
      border-color: var(--success-color, #28a745);
      background-color: var(--success-bg, #d4edda);
    }

    .notification.error {
      border-color: var(--error-color, #dc3545);
      background-color: var(--error-bg, #f8d7da);
    }
  </style>
`, mode);

export const guidePage = ({ html = '', title = '', mode = '' } = {}) => layout(title, `
  <main>
    <div class="paste-container">
      ${html}
    </div>
  </main>
`, mode);

export const editPage = (
  { id = '', paste = '', hasEditCode = false, errors = { editCode: '' }, mode = '' } = {},
) => layout(`edit ${id}`, `
  <main>
    ${Tabs()}

    <form id="editor-form" method="post" action="/${id}/save">
      ${Editor(paste)}

      <input class="display-none" name="url" type="text" value="${id}" disabled />
      <div class="input-group">
        ${_if(hasEditCode, `
          <div>
            <input
              name="editcode"
              type="text"
              placeholder="edit code"
              minlength="3"
              maxlength="40"
              required
              aria-invalid="${Boolean(errors.editCode)}"
              ${_if(errors.editCode, 'aria-describedby="editcode-error"')}
            />

            ${_if(errors.editCode, `
              <small class="error" id="editcode-error">${errors.editCode}</small>
            `)}
          </div>
        `)}
      </div>

      <div class="button-group">
        <button type="submit">
          save
        </button>
      </div>
    </form>
  </main>
  <script src="/codemirror.min.js"></script>
  <script src="/cm-markdown.min.js"></script>
  <script src="/cm-sublime.min.js"></script>
  <script src="/editor.js"></script>
  <script src="/encryption-ui.js"></script>
`, mode);

export const deletePage = (
  { id = '', hasEditCode = false, errors = { editCode: '' }, mode = '' } = {}
) => layout(`delete ${id}`, `
  <main>
    <div>
      <em>are you sure you want to delete this paste?</em>
      <strong>${id}</strong>
    </div>
    <form method="post" action="/${id}/delete">
      <div class="input-group">
        ${_if(hasEditCode, `
          <div>
            <input
              name="editcode"
              type="text"
              placeholder="edit code"
              minlength="3"
              maxlength="40"
              required
              aria-invalid="${Boolean(errors.editCode)}"
              ${_if(errors.editCode, 'aria-describedby="editcode-error"')}
            />

            ${_if(errors.editCode, `
              <small class="error" id="editcode-error">${errors.editCode}</small>
            `)}
          </div>
        `)}
      </div>

      <div class="button-group">
        <button type="submit">
          delete
        </button>

        <a class="btn" href="/${id}">
          cancel
        </a>
      </div>
    </form>
  </main>
`, mode);

export const errorPage = (mode = '') => layout('404', `
  <main>
    <h1>404</h1>
    <p>That paste doesn't exist! Maybe it was deleted?</p>
  </main>
`, mode);

export const passwordPromptPage = ({ id = '', mode = '', error = '' } = {}) => layout(`🔒 Encrypted Paste - ${id}`, `
  <main>
    <div class="encryption-prompt">
      <div class="encryption-prompt-content">
        <h2>🔒 This paste is encrypted</h2>
        <p>Enter the password to decrypt and view this paste:</p>
        
        <form id="decrypt-form" method="post" action="/${id}/decrypt">
          <div class="input-group">
            <div>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minlength="1"
                autofocus
                aria-invalid="${Boolean(error)}"
                ${_if(error, 'aria-describedby="password-error"')}
              />
              ${_if(error, `
                <small class="error" id="password-error">${error}</small>
              `)}
            </div>
          </div>
          
          <div class="button-group">
            <button type="submit">🔓 Decrypt</button>
            <a class="btn" href="/">Cancel</a>
          </div>
        </form>
        
        <div class="encryption-info">
          <small>
            <strong>🔒 Security Notice:</strong> Your password is processed securely and never stored on our servers.
            <br>If you've forgotten the password, the paste cannot be recovered.
          </small>
        </div>
      </div>
    </div>
  </main>
  
  <style>
    .encryption-prompt {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
    }
    
    .encryption-prompt-content {
      max-width: 400px;
      padding: 2rem;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      background: var(--bg-color);
      text-align: center;
    }
    
    .encryption-prompt h2 {
      margin-bottom: 1rem;
      color: var(--text-color);
    }
    
    .encryption-prompt p {
      margin-bottom: 1.5rem;
      color: var(--text-secondary);
    }
    
    .encryption-info {
      margin-top: 1.5rem;
      padding: 1rem;
      background: var(--code-bg);
      border-radius: 4px;
      text-align: left;
    }
    
    .encryption-info small {
      color: var(--text-secondary);
      line-height: 1.4;
    }
  </style>
`, mode);
