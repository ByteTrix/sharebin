import { CloudflareEnv } from './env';

const _if = (condition: unknown, template: string) => (
  condition ? template : ''
);

const ThemeToggle = () => `
  <div class="theme-toggle-container">
    <button id="themeToggle" class="theme-toggle" 
            title="Toggle theme (Auto/Light/Dark)" 
            aria-label="Toggle theme mode"
            role="button">
      <img class="theme-icon theme-auto" src="/icons/auto.png" alt="Auto theme" aria-hidden="true">
      <img class="theme-icon theme-light" style="display: none;" src="/icons/light.png" alt="Light theme" aria-hidden="true">
      <img class="theme-icon theme-dark" style="display: none;" src="/icons/dark.png" alt="Dark theme" aria-hidden="true">
    </button>
  </div>
`;

const Navbar = (currentPage = '') => `
  <nav class="navbar">
    <div class="navbar-container">
      <a href="/" class="navbar-brand">
        <div class="navbar-brand-icon">F</div>
        <span>ShareBin</span>
      </a>
      
      <ul class="navbar-nav">
        <li class="navbar-nav-item">
          <a href="/" class="navbar-nav-link ${currentPage === 'home' ? 'active' : ''}">
            <svg class="navbar-theme-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            New
          </a>
        </li>
        <li class="navbar-nav-item">
          <a href="/guide" class="navbar-nav-link ${currentPage === 'guide' ? 'active' : ''}">
            <svg class="navbar-theme-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18,17V16H6V17H18M15,15V14H6V15H15M18,13V12H6V13H18M18,11V10H6V11H18M18,9V8H6V9H18M18,7V6H6V7H18Z"/>
            </svg>
            Guide
          </a>
        </li>
        <li class="navbar-nav-item">
          <a href="/about" class="navbar-nav-link ${currentPage === 'about' ? 'active' : ''}">
            <svg class="navbar-theme-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
            </svg>
            About
          </a>
        </li>
      </ul>
      
      <div class="navbar-actions">
        <button id="navbarThemeToggle" class="navbar-theme-toggle" 
                title="Toggle theme (Auto/Light/Dark)" 
                aria-label="Toggle theme mode"
                role="button">
          <img class="navbar-theme-icon theme-auto" src="/icons/auto.png" alt="Auto theme" aria-hidden="true">
          <img class="navbar-theme-icon theme-light" style="display: none;" src="/icons/light.png" alt="Light theme" aria-hidden="true">
          <img class="navbar-theme-icon theme-dark" style="display: none;" src="/icons/dark.png" alt="Dark theme" aria-hidden="true">
        </button>
      </div>
      
      <button class="navbar-mobile-toggle" onclick="toggleMobileMenu()" aria-label="Toggle navigation">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/>
        </svg>
      </button>
    </div>
    
    <div class="navbar-mobile-menu" id="navbarMobileMenu">
      <ul class="navbar-mobile-nav">
        <li class="navbar-nav-item">
          <a href="/" class="navbar-nav-link ${currentPage === 'home' ? 'active' : ''}">
            <svg class="navbar-theme-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2L2,7L12,12L22,7L12,2M2,17L12,22L22,17L12,12L2,17Z"/>
            </svg>
            New Paste
          </a>
        </li>
        <li class="navbar-nav-item">
          <a href="/guide" class="navbar-nav-link ${currentPage === 'guide' ? 'active' : ''}">
            <svg class="navbar-theme-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18,17V16H6V17H18M15,15V14H6V15H15M18,13V12H6V13H18M18,11V10H6V11H18M18,9V8H6V9H18M18,7V6H6V7H18Z"/>
            </svg>
            Guide
          </a>
        </li>
        <li class="navbar-nav-item">
          <a href="/about" class="navbar-nav-link ${currentPage === 'about' ? 'active' : ''}">
            <svg class="navbar-theme-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
            </svg>
            About
          </a>
        </li>
      </ul>
      <div class="navbar-mobile-actions">
        <button id="navbarMobileThemeToggle" class="navbar-theme-toggle" 
                title="Toggle theme (Auto/Light/Dark)" 
                aria-label="Toggle theme mode"
                role="button">
          <svg class="navbar-theme-icon theme-auto" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C8.84,1 15.17,1 19.08,4.93C19.47,5.32 19.82,5.75 20.13,6.2C20.86,5.47 20.25,4.31 19.43,4.39C14.87,4.39 11.14,8.11 11.14,12.68C11.14,17.25 14.87,21 19.43,21C20.69,21 21.88,20.54 22.88,19.77C23.27,19.5 23.63,19.18 23.93,18.83C24.58,18.04 23.69,16.83 22.55,17.29C21.28,17.8 19.97,17.05 18.97,15.95Z"/>
          </svg>
          <span class="navbar-theme-label">Auto</span>
        </button>
      </div>
    </div>
  </nav>
`;

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

const layout = (title: string, content: string, mode?: string, showKeyboardHint?: boolean, currentPage?: string, showNavbar = false) => `
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
      ${title || 'ShareBin'}
    </title>
  </head>
  <body>
    ${ThemeToggle()}

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
          <a href="/about">about</a>
          <a href="https://github.com/kvnlabs/ShareBin">source</a>
        </div>
        ${_if(showKeyboardHint, `
          <div class="shortcuts-hint">
            <span class="hint-text">✨ Press <kbd>Ctrl</kbd> + <kbd>/</kbd> for keyboard shortcuts</span>
          </div>
        `)}
      </div>
    </footer>
    <script>
      // Advanced theme switcher for navbar
      const themes = ['auto', 'light', 'dark'];
      const themeLabels = { auto: 'Auto', light: 'Light', dark: 'Dark' };
      const themeStorageKey = 'navbar-theme';
      let currentTheme = localStorage.getItem(themeStorageKey) || 'auto';

      function applyTheme(theme) {
        if (theme === 'auto') {
          document.body.removeAttribute('data-theme');
        } else {
          document.body.setAttribute('data-theme', theme === 'light' ? 'l' : 'd');
        }
      }

      function updateThemeUI() {
        const icons = {
          auto: document.querySelectorAll('.theme-auto'),
          light: document.querySelectorAll('.theme-light'),  
          dark: document.querySelectorAll('.theme-dark')
        };
        
        const labels = document.querySelectorAll('.navbar-theme-label');
        
        // Hide all icons
        Object.values(icons).forEach(iconList => {
          iconList.forEach(icon => icon.style.display = 'none');
        });
        
        // Show current theme icon
        icons[currentTheme].forEach(icon => icon.style.display = 'block');
        
        // Update labels
        labels.forEach(label => label.textContent = themeLabels[currentTheme]);
      }

      function cycleTheme() {
        const currentIndex = themes.indexOf(currentTheme);
        currentTheme = themes[(currentIndex + 1) % themes.length];
        localStorage.setItem(themeStorageKey, currentTheme);
        applyTheme(currentTheme);
        updateThemeUI();
        
        // Announce to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = 'Theme changed to ' + themeLabels[currentTheme];
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
      }

      function toggleMobileMenu() {
        const menu = document.getElementById('navbarMobileMenu');
        menu.classList.toggle('open');
      }

      // Initialize theme
      applyTheme(currentTheme);
      updateThemeUI();

      // Listen for system theme changes when in auto mode
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (currentTheme === 'auto') {
          applyTheme('auto');
        }
      });

      // Add click handlers when DOM is ready
      document.addEventListener('DOMContentLoaded', () => {
        // Desktop theme toggle
        const desktopToggle = document.getElementById('navbarThemeToggle');
        if (desktopToggle) {
          desktopToggle.addEventListener('click', cycleTheme);
          desktopToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              cycleTheme();
            }
          });
        }

        // Mobile theme toggle
        const mobileToggle = document.getElementById('navbarMobileThemeToggle');
        if (mobileToggle) {
          mobileToggle.addEventListener('click', cycleTheme);
          mobileToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              cycleTheme();
            }
          });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
          const menu = document.getElementById('navbarMobileMenu');
          const toggle = document.querySelector('.navbar-mobile-toggle');
          
          if (menu && menu.classList.contains('open') && 
              !menu.contains(e.target) && 
              !toggle.contains(e.target)) {
            menu.classList.remove('open');
          }
        });

        // Close mobile menu when clicking on nav links
        document.querySelectorAll('.navbar-mobile-nav .navbar-nav-link').forEach(link => {
          link.addEventListener('click', () => {
            document.getElementById('navbarMobileMenu').classList.remove('open');
          });
        });
      });
    </script>
    <script src="/nacl.min.js"></script>
    <script src="/nacl-util.min.js"></script>
    <script src="/crypto.js"></script>
    <script src="/theme-switch.js"></script>
  </body>
  </html>
`;

export const homePage = ({
  paste = '',
  url = '',
  errors = { url: '' },
  mode = '',
} = {}) => layout('ShareBin', `
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

      <div class="file-attachment-section">
        <label class="file-attachment-label">
          <svg class="file-attachment-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
          <span class="file-attachment-text">📎 Attach files (optional)</span>
          <input
            type="file"
            id="fileAttachment"
            name="fileAttachment"
            multiple
            accept=".txt,.md,.js,.ts,.html,.css,.json,.xml,.csv,.log,.py,.java,.cpp,.c,.php,.rb,.go,.rs,.swift,.kt,.scala,.sh,.bat,.sql,.yml,.yaml"
            class="file-input-hidden"
          />
        </label>
        <div id="fileAttachmentList" class="file-attachment-list" style="display: none;">
          <div class="file-attachment-header">
            <span class="file-count">Selected files:</span>
            <button type="button" id="clearFiles" class="clear-files-btn" title="Clear all files">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
              </svg>
            </button>
          </div>
          <div class="file-items"></div>
        </div>
        <small class="file-attachment-note">
          💡 Attach text files, code, or documents. Files will be included as appendices to your paste.
        </small>
      </div>

      <div class="expiry-date-section">
        <label>
          <input type="checkbox" id="enableExpiryDate" name="enableExpiryDate" />
          <span class="expiry-date-label">⏰ Set expiry date for this paste</span>
        </label>
        <div id="expiryDateOptions" class="expiry-date-options" style="display: none;">
          <div class="expiry-options-grid">
            <div class="quick-expiry-options">
              <label class="quick-option-label">Quick options:</label>
              <div class="quick-expiry-buttons">
                <button type="button" class="quick-expiry-btn" data-hours="1">1 Hour</button>
                <button type="button" class="quick-expiry-btn" data-hours="24">1 Day</button>
                <button type="button" class="quick-expiry-btn" data-hours="168">1 Week</button>
                <button type="button" class="quick-expiry-btn" data-hours="720">1 Month</button>
              </div>
            </div>
            <div class="custom-expiry-option">
              <label for="customExpiryDate" class="custom-expiry-label">Or set custom date:</label>
              <input
                type="datetime-local"
                id="customExpiryDate"
                name="customExpiryDate"
                class="custom-expiry-input"
              />
            </div>
          </div>
          <div class="selected-expiry-display" id="selectedExpiryDisplay" style="display: none;">
            <span class="expiry-display-text">Expires: <strong id="expiryDisplayValue"></strong></span>
            <button type="button" id="clearExpiry" class="clear-expiry-btn" title="Clear expiry date">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
              </svg>
            </button>
          </div>
        </div>
        <small class="expiry-date-note">
          🕒 Your paste will be automatically deleted at the specified time. This cannot be undone.
          <br>💡 Perfect for temporary content that should not persist indefinitely.
        </small>
      </div>

      <div class="one-time-view-section">
        <label>
          <input type="checkbox" id="enableOneTimeView" name="enableOneTimeView" />
          <span class="one-time-view-label">🔥 One-time view (paste will be deleted after first view)</span>
        </label>
        <small class="one-time-view-note">
          ⚠️ <strong>Warning:</strong> Once someone views this paste, it will be permanently deleted and cannot be recovered.
          <br>💡 Perfect for sharing sensitive information that should only be seen once.
        </small>
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
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
              Edit
            </a>
            <a href="/${id}/raw" class="menu-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              View Raw
            </a>
            <button class="menu-item" onclick="copyToClipboard('${id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
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
      <div class="notion-container">
        <div class="document-content">
          ${html}
        </div>
      </div>

      <!-- Floating Revision Panel -->
      ${_if(revisions.length > 0, `
        <div class="revision-panel" id="revisionPanel">
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
                <div class="revision-info">
                  <span class="revision-title" data-user-version="${revisions.length - index}">Loading...</span>
                  <span class="revision-date" data-timestamp="${rev.timestamp}">
                    <span class="date-relative">Loading...</span>
                    <span class="date-absolute">Loading...</span>
                  </span>
                </div>
                <a href="/${id}/edit?revision=${rev.timestamp}" class="revision-action" title="Edit this revision">
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
      const body = document.body;
      if (panel) {
        const isVisible = panel.classList.contains('show');
        if (isVisible) {
          panel.classList.remove('show');
          body.classList.remove('revision-panel-open');
        } else {
          panel.classList.add('show');
          body.classList.add('revision-panel-open');
        }
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
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
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
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
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
`, mode, false);

export const guidePage = ({ html = '', title = '', mode = '' } = {}) => layout(title, `
  <main>
    <div class="content-wrapper">
      ${html}
    </div>
  </main>
`, mode, false);

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
`, mode, false);

export const errorPage = (mode = '') => layout('404', `
  <main>
    <h1>404</h1>
    <p>That paste doesn't exist! Maybe it was deleted?</p>
  </main>
`, mode, false);

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
`, mode, false);

export const aboutPage = ({ mode = '' } = {}) => layout('About - ShareBin', `
  <main>
    <div class="content-wrapper">
      <h1>About ShareBin</h1>
      
      <div class="about-section">
        <h2>What is ShareBin?</h2>
        <p>ShareBin is a modern, minimalist pastebin service built for sharing text and code snippets quickly and securely. It features a clean, responsive design with dark and light themes to match your preference.</p>
      </div>

      <div class="about-section">
        <h2>Features</h2>
        <ul>
          <li><strong>Fast & Simple:</strong> Create and share pastes in seconds with our intuitive editor</li>
          <li><strong>Code Highlighting:</strong> Syntax highlighting for multiple programming languages</li>
          <li><strong>Encryption:</strong> Optional client-side encryption for sensitive content</li>
          <li><strong>Responsive Design:</strong> Works beautifully on desktop, tablet, and mobile</li>
          <li><strong>Theme Support:</strong> Auto, light, and dark themes to suit your environment</li>
          <li><strong>Version History:</strong> Track changes with built-in revision support</li>
          <li><strong>Markdown Support:</strong> Rich text formatting with markdown rendering</li>
        </ul>
      </div>

      <div class="about-section">
        <h2>Privacy & Security</h2>
        <p>Your privacy matters to us. ShareBin offers client-side encryption for sensitive pastes, ensuring that only you and those you share the password with can access your content. Regular pastes are stored securely and can be deleted at any time.</p>
      </div>

      <div class="about-section">
        <h2>Open Source</h2>
        <p>ShareBin is built with modern web technologies and runs on Cloudflare Workers for global performance and reliability. The project is designed to be fast, secure, and user-friendly.</p>
      </div>

      <div class="about-actions">
        <a href="/" class="btn">Create New Paste</a>
        <a href="/guide" class="btn btn-secondary">View Guide</a>
      </div>
    </div>
  </main>

  <style>
    .about-section {
      margin-bottom: 2rem;
    }

    .about-section h2 {
      color: var(--text-primary);
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    .about-section p {
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .about-section ul {
      color: var(--text-secondary);
      line-height: 1.6;
      padding-left: 1.5rem;
    }

    .about-section li {
      margin-bottom: 0.5rem;
    }

    .about-section li strong {
      color: var(--text-primary);
    }

    .about-actions {
      margin-top: 3rem;
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .btn-secondary {
      background: var(--border-color);
      color: var(--text-primary);
    }

    .btn-secondary:hover {
      background: var(--bg-secondary);
    }
  </style>
`, mode, false);
