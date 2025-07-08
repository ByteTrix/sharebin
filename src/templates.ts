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

const layout = (title: string, content: string, mode?: string, showKeyboardHint?: boolean) => `
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
    <link rel="stylesheet" href="/highlight-light.min.css" media="not all and (prefers-color-scheme: dark)" data-theme-light>
    <link rel="stylesheet" href="/highlight-dark.min.css" media="not all and (prefers-color-scheme: light)" data-theme-dark>
    <link rel="stylesheet" href="/main.css">
    <title>
      ${title || 'flrbin'}
    </title>
  </head>
  <body>
    <!-- Professional Theme Switcher -->
    <div class="theme-switcher">
      <button id="themeToggle" class="theme-toggle-btn" 
              title="Toggle theme (Auto/Light/Dark)" 
              aria-label="Toggle theme mode"
              role="button">
        <svg class="theme-icon theme-auto" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20V4Z"/>
        </svg>
        <svg class="theme-icon theme-light" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z"/>
        </svg>
        <svg class="theme-icon theme-dark" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.4 6.35,17.41C9.37,20.43 14,20.54 17.33,17.97Z"/>
        </svg>
        <span class="theme-label" id="theme-label">Auto</span>
      </button>
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
        ${_if(showKeyboardHint, `
          <div class="shortcuts-hint">
            <span class="hint-text">✨ Press <kbd>Ctrl</kbd> + <kbd>/</kbd> for keyboard shortcuts</span>
          </div>
        `)}
      </div>
    </footer>
    <script>
      // Theme management with enhanced accessibility
      const THEME_KEY = 'theme-mode';
      const themes = ['auto', 'light', 'dark'];
      const themeLabels = {
        auto: 'Auto',
        light: 'Light', 
        dark: 'Dark'
      };

      let currentTheme = localStorage.getItem(THEME_KEY) || 'auto';
      
      function updateTheme() {
        const btn = document.getElementById('themeToggle');
        const label = btn?.querySelector('.theme-label');
        
        // Update button state and accessibility
        document.documentElement.setAttribute('data-theme-mode', currentTheme);
        if (label) label.textContent = themeLabels[currentTheme];
        if (btn) {
          btn.setAttribute('aria-label', 'Current theme: ' + themeLabels[currentTheme] + '. Click to cycle to next theme.');
          btn.title = 'Current: ' + themeLabels[currentTheme] + ' - Click to change theme';
        }
        
        // Update syntax highlighting theme
        const lightHighlight = document.querySelector('[data-theme-light]');
        const darkHighlight = document.querySelector('[data-theme-dark]');
        
        // Apply actual theme
        let isDark = false;
        if (currentTheme === 'auto') {
          // Use system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          document.body.setAttribute('data-theme', prefersDark ? 'd' : 'l');
          isDark = prefersDark;
        } else {
          document.body.setAttribute('data-theme', currentTheme === 'dark' ? 'd' : 'l');
          isDark = currentTheme === 'dark';
        }
        
        // Update syntax highlighting media queries for manual theme switching
        if (lightHighlight && darkHighlight) {
          if (isDark) {
            lightHighlight.media = 'not all';
            darkHighlight.media = 'all';
          } else {
            lightHighlight.media = 'all';
            darkHighlight.media = 'not all';
          }
        }
      }

      function cycleTheme() {
        const currentIndex = themes.indexOf(currentTheme);
        currentTheme = themes[(currentIndex + 1) % themes.length];
        localStorage.setItem(THEME_KEY, currentTheme);
        updateTheme();
        
        // Announce theme change for screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = 'Theme changed to ' + themeLabels[currentTheme];
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
      }

      // Initialize theme
      updateTheme();

      // Listen for system theme changes when in auto mode
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (currentTheme === 'auto') {
          updateTheme();
        }
      });

      // Add click and keyboard handlers
      document.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('themeToggle');
        if (btn) {
          btn.addEventListener('click', cycleTheme);
          btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              cycleTheme();
            }
          });
        }
      });
    </script>
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
`, mode, true);

import { PasteRevision } from './storage';

export const pastePage = ({ id = '', html = '', title = '', mode = '', revisions = [], isEncrypted = false }: { id?: string; html?: string; title?: string; mode?: string; revisions?: PasteRevision[]; isEncrypted?: boolean } = {}) => layout(title, `
  <main class="paste-main">
    <div class="paste-document">
        
        <!-- Floating Action Menu -->
        <div class="floating-actions">
          <button class="action-menu-btn" onclick="toggleActionMenu()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"/>
            </svg>
          </button>
          <div class="action-menu" id="actionMenu" style="display: none;">
            <a href="/${id}/edit" class="menu-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
              </svg>
              Edit
            </a>
            <a href="/${id}/raw" class="menu-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5Z"/>
              </svg>
              View Raw
            </a>
            <button class="menu-item" onclick="copyToClipboard('${id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5Z"/>
              </svg>
              Copy ID
            </button>
            ${_if(revisions.length > 0, `
              <button class="menu-item" onclick="toggleRevisionHistory()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z"/>
                </svg>
                History (${revisions.length})
              </button>
            `)}
            ${_if(isEncrypted, `
              <button class="menu-item" onclick="showDecryptPrompt('${id}')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7A2,2 0 0,1 14,9V10H15A1,1 0 0,1 16,11V16A1,1 0 0,1 15,17H9A1,1 0 0,1 8,16V11A1,1 0 0,1 9,10H10V9A2,2 0 0,1 12,7M12,8A1,1 0 0,0 11,9V10H13V9A1,1 0 0,0 12,8Z"/>
                </svg>
                Decrypt
              </button>
            `)}
            <div class="menu-divider"></div>
            <a href="/${id}/delete" class="menu-item danger">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
              </svg>
              Delete
            </a>
          </div>
        </div>
      </div>

      <!-- Document Content -->
      <div class="document-content">
        ${html}
      </div>

      <!-- Floating Revision Panel -->
      ${_if(revisions.length > 0, `
        <div class="revision-panel" id="revisionPanel" style="display: none;">
          <div class="revision-panel-header">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z"/>
              </svg>
              Page History
            </h3>
            <button class="close-btn" onclick="toggleRevisionHistory()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
              </svg>
            </button>
          </div>
          <div class="revision-list">
            ${revisions.map((rev, index) => `
              <div class="revision-entry">
                <div class="revision-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
                  </svg>
                </div>
                <div class="revision-info">
                  <div class="revision-title" data-user-version="${revisions.length - index}">Loading...</div>
                  <div class="revision-date" data-timestamp="${rev.timestamp}">
                    <span class="date-relative">Loading...</span>
                    <span class="date-absolute">Loading...</span>
                  </div>
                </div>
                <a href="/${id}/edit?revision=${rev.timestamp}" class="revision-action">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
                  </svg>
                </a>
              </div>
            `).join('')}
          </div>
        </div>
      `)}
    </div>
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
    // Copy to clipboard function
    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
      }).catch(err => {
        console.error('Failed to copy: ', err);
        showNotification('Failed to copy', 'error');
      });
    }

    // Show notification
    function showNotification(message, type = 'info') {
      // Create notification container if it doesn't exist
      let container = document.getElementById('notification-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = 'position: fixed; top: 7.5rem; right: 1rem; z-index: 1050; pointer-events: none;';
        document.body.appendChild(container);
      }
      
      const notification = document.createElement('div');
      notification.className = \`notification notification-\${type}\`;
      notification.textContent = message;
      notification.style.marginBottom = '0.5rem';
      container.appendChild(notification);
      
      // Show notification
      setTimeout(() => {
        notification.classList.add('show');
      }, 10);
      
      // Hide and remove notification
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          if (container.contains(notification)) {
            container.removeChild(notification);
          }
          // Remove container if empty
          if (container.children.length === 0) {
            document.body.removeChild(container);
          }
        }, 300);
      }, 3000);
    }

    // Toggle action menu
    function toggleActionMenu() {
      const menu = document.getElementById('actionMenu');
      const btn = document.querySelector('.action-menu-btn');
      const isVisible = menu.style.display !== 'none';
      
      if (isVisible) {
        menu.style.display = 'none';
        btn.classList.remove('active');
        document.removeEventListener('click', closeActionMenuOnClickOutside);
      } else {
        menu.style.display = 'block';
        btn.classList.add('active');
        // Close menu when clicking outside
        setTimeout(() => {
          document.addEventListener('click', closeActionMenuOnClickOutside);
        }, 0);
      }
    }

    function closeActionMenuOnClickOutside(event) {
      const menu = document.getElementById('actionMenu');
      const btn = document.querySelector('.action-menu-btn');
      
      if (!menu.contains(event.target) && !btn.contains(event.target)) {
        menu.style.display = 'none';
        btn.classList.remove('active');
        document.removeEventListener('click', closeActionMenuOnClickOutside);
      }
    }

    // Toggle revision history panel
    function toggleRevisionHistory() {
      const panel = document.getElementById('revisionPanel');
      if (panel) {
        const isVisible = panel.style.display !== 'none';
        panel.style.display = isVisible ? 'none' : 'block';
      }
    }

    // Add copy buttons to code blocks
    function addCopyButtonsToCodeBlocks() {
      const codeBlocks = document.querySelectorAll('pre code');
      codeBlocks.forEach((codeBlock, index) => {
        const pre = codeBlock.parentElement;
        if (pre.querySelector('.copy-code-btn')) return; // Already has button
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-code-btn';
        copyBtn.title = 'Copy code';
        copyBtn.innerHTML = \`
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5Z"/>
          </svg>
        \`;
        
        copyBtn.addEventListener('click', () => {
          const code = codeBlock.textContent;
          copyToClipboard(code);
          
          // Visual feedback
          copyBtn.innerHTML = \`
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
            </svg>
          \`;
          setTimeout(() => {
            copyBtn.innerHTML = \`
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5Z"/>
              </svg>
            \`;
          }, 2000);
        });
        
        pre.style.position = 'relative';
        pre.appendChild(copyBtn);
      });
    }

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

    // Initialize when page loads
    document.addEventListener('DOMContentLoaded', () => {
      addCopyButtonsToCodeBlocks();
      initializeRevisionTimestamps();
      initializeUserVersions();
      
      // Update relative timestamps every minute
      setInterval(updateRelativeTimestamps, 60000);
    });

    // Update only the relative timestamps
    function updateRelativeTimestamps() {
      const dateElements = document.querySelectorAll('[data-timestamp]');
      dateElements.forEach(element => {
        const timestamp = parseInt(element.getAttribute('data-timestamp'));
        const date = new Date(timestamp);
        const relativeSpan = element.querySelector('.date-relative');
        
        if (relativeSpan) {
          relativeSpan.textContent = formatRelativeTime(date);
        }
      });
    }

    // Format timestamps and user versions for revisions
    function initializeRevisionTimestamps() {
      const dateElements = document.querySelectorAll('[data-timestamp]');
      dateElements.forEach(element => {
        const timestamp = parseInt(element.getAttribute('data-timestamp'));
        const date = new Date(timestamp);
        
        const relativeSpan = element.querySelector('.date-relative');
        const absoluteSpan = element.querySelector('.date-absolute');
        
        if (relativeSpan && absoluteSpan) {
          // Format relative time (e.g., "2 hours ago")
          relativeSpan.textContent = formatRelativeTime(date);
          
          // Format absolute time with better formatting
          absoluteSpan.textContent = formatAbsoluteTime(date);
          absoluteSpan.title = date.toLocaleString(); // Full timestamp on hover
        }
      });
    }

    function initializeUserVersions() {
      const userAgent = navigator.userAgent;
      const platform = navigator.platform;
      const language = navigator.language || 'en';
      
      // Try to get a user identifier from browser
      let userIdentifier = getUserIdentifier(userAgent, platform, language);
      
      const versionElements = document.querySelectorAll('[data-user-version]');
      versionElements.forEach(element => {
        const versionNumber = element.getAttribute('data-user-version');
        element.textContent = userIdentifier + ' v' + versionNumber;
      });
    }

    function getUserIdentifier(userAgent, platform, language) {
      // Try to identify browser and OS
      let browser = 'Unknown';
      let os = 'Unknown';
      
      // Detect browser
      if (userAgent.includes('Chrome') && !userAgent.includes('Edge')) {
        browser = 'Chrome';
      } else if (userAgent.includes('Firefox')) {
        browser = 'Firefox';
      } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        browser = 'Safari';
      } else if (userAgent.includes('Edge')) {
        browser = 'Edge';
      } else if (userAgent.includes('Opera')) {
        browser = 'Opera';
      }
      
      // Detect OS
      if (platform.includes('Win')) {
        os = 'Windows';
      } else if (platform.includes('Mac')) {
        os = 'macOS';
      } else if (platform.includes('Linux')) {
        os = 'Linux';
      } else if (userAgent.includes('Android')) {
        os = 'Android';
      } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
        os = 'iOS';
      }
      
      // Detect device type for mobile
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const deviceType = isMobile ? '📱' : '💻';
      
      // Create a more readable identifier
      if (browser !== 'Unknown' && os !== 'Unknown') {
        return deviceType + ' ' + browser + '/' + os;
      } else if (browser !== 'Unknown') {
        return deviceType + ' ' + browser;
      } else if (os !== 'Unknown') {
        return deviceType + ' ' + os;
      } else {
        return deviceType + ' Anonymous';
      }
    }

    function formatRelativeTime(date) {
      const now = new Date();
      const diffMs = now - date;
      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);
      const diffWeeks = Math.floor(diffDays / 7);
      const diffMonths = Math.floor(diffDays / 30);
      
      if (diffSecs < 30) {
        return 'Just now';
      } else if (diffSecs < 60) {
        return 'Less than a minute ago';
      } else if (diffMins === 1) {
        return '1 minute ago';
      } else if (diffMins < 60) {
        return diffMins + ' minutes ago';
      } else if (diffHours === 1) {
        return '1 hour ago';
      } else if (diffHours < 24) {
        return diffHours + ' hours ago';
      } else if (diffDays === 1) {
        return 'Yesterday';
      } else if (diffDays < 7) {
        return diffDays + ' days ago';
      } else if (diffWeeks === 1) {
        return '1 week ago';
      } else if (diffWeeks < 4) {
        return diffWeeks + ' weeks ago';
      } else if (diffMonths === 1) {
        return '1 month ago';
      } else if (diffMonths < 12) {
        return diffMonths + ' months ago';
      } else {
        const years = Math.floor(diffDays / 365);
        return years === 1 ? '1 year ago' : years + ' years ago';
      }
    }

    function formatAbsoluteTime(date) {
      const now = new Date();
      const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
      
      const options = {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      
      // Show year only if it's different from current year
      if (date.getFullYear() !== now.getFullYear()) {
        options.year = 'numeric';
      }
      
      return date.toLocaleDateString(navigator.language || 'en-US', options);
    }

    document.getElementById('decrypt-form')?.addEventListener('submit', async function(e) {
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
`, mode);

export const guidePage = ({ html = '', title = '', mode = '' } = {}) => layout(title, `
  <main>
    <div class="content-wrapper">
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
`, mode, true);

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
