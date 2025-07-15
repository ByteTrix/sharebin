 import { CloudflareEnv } from './env';

const _if = (condition: unknown, template: string) => (
  condition ? template : ''
);

const ThemeToggle = () => `
<div class="theme-toggle-container">
    <a href="/" class="paste-btn" title="Create New Note">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
      </svg>
      <span>New</span>
    </a>
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

const NewNavbar = () => `
  <nav class="new-navbar">
    <div class="navbar-content">
      <!-- Project Name -->
      <div class="navbar-brand">
        <a href="/" class="brand-link">ShareBin</a>
      </div>
      
      <!-- Icon Actions -->
      <div class="navbar-actions">
        <!-- New Note Button -->
        <button class="new-note-btn" onclick="window.location.href='/'" title="New Note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
          </svg>
          <span>New</span>
        </button>
        <!-- GitHub Cat Icon -->
        <a href="https://github.com/kvnlabs/ShareBin" class="navbar-icon github-icon" title="GitHub" target="_blank" rel="noopener">
          <img src="/github-cat-static.png" alt="GitHub Cat" width="35" height="35">
        </a>
        
        
        <!-- Theme Dropdown -->
        <div class="navbar-menu-container">
          <button class="navbar-icon theme-toggle-icon" id="navbarThemeToggle" title="Theme">
            <img class="theme-icon theme-auto" src="/icons/auto.png" alt="Auto theme" aria-hidden="true">
            <img class="theme-icon theme-light" style="display: none;" src="/icons/light.png" alt="Light theme" aria-hidden="true">
            <img class="theme-icon theme-dark" style="display: none;" src="/icons/dark.png" alt="Dark theme" aria-hidden="true">
          </button>
          
          <div class="navbar-dropdown theme-dropdown" id="themeDropdown">
            <button class="dropdown-item" data-theme="auto">
              <img src="/icons/auto.png" alt="Auto" width="14" height="14">
              Auto
            </button>
            <button class="dropdown-item" data-theme="light">
              <img src="/icons/light.png" alt="Light" width="14" height="14">
              Light
            </button>
            <button class="dropdown-item" data-theme="dark">
              <img src="/icons/dark.png" alt="Dark" width="14" height="14">
              Dark
            </button>
          </div>
        </div>
        
        <!-- Three Dot Menu Icon -->
        <div class="navbar-menu-container">
          <button class="navbar-icon menu-toggle menu-dots" id="navbarMenuToggle" title="More options">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
          
          <div class="navbar-dropdown" id="navbarDropdown">
            <a href="/guide" class="dropdown-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
              </svg>
              Documentation
            </a>
            <a href="#" class="dropdown-item" onclick="alert('CLI commands feature coming soon!')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20,19V7H4V19H20M20,3A2,2 0 0,1 22,5V19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19V5C2,3.89 2.9,3 4,3H20M13,17V15H18V17H13M9.58,13L5.57,9H8.4L11.7,12.3L15,9H17.8L13.79,13L18.22,18H15.39L11.7,14.3L8,18H5.17L9.58,13Z"/>
              </svg>
              CLI Commands
            </a>
            <div class="dropdown-divider"></div>
            <a href="https://github.com/kvnlabs/ShareBin/issues" class="dropdown-item" target="_blank" rel="noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,12H10V10H14M14,16H10V14H14M20,8H17.19C16.74,7.22 16.12,6.55 15.37,6.04L17,4.41L15.59,3L13.42,5.17C12.96,5.06 12.49,5 12,5C11.51,5 11.04,5.06 10.59,5.17L8.41,3L7,4.41L8.62,6.04C7.88,6.55 7.26,7.22 6.81,8H4V10H6.09C6.04,10.33 6,10.66 6,11V12H4V14H6V15C6,15.34 6.04,15.67 6.09,16H4V18H6.81C7.85,19.79 9.78,21 12,21C14.22,21 16.15,19.79 17.19,18H20V16H17.91C17.96,15.67 18,15.34 18,15V14H20V12H18V11C18,10.66 17.96,10.33 17.91,10H20V8Z"/>
              </svg>
              Bug Report
            </a>
            <a href="mailto:support@sharebin.in" class="dropdown-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
              </svg>
              Support Me
            </a>
            <a href="#" class="dropdown-item" id="keyboard-shortcuts-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20,5H4C2.9,5 2,5.9 2,7V17C2,18.1 2.9,19 4,19H20C21.1,19 22,18.1 22,17V7C22,5.9 21.1,5 20,5M20,17H4V7H20V17M5,8H7V10H5V8M8,8H10V10H8V8M11,8H13V10H11V8M14,8H16V10H14V8M17,8H19V10H17V8M5,11H7V13H5V11M8,11H10V13H8V11M11,11H13V13H11V11M14,11H16V13H14V11M17,11H19V13H17V11M8,14H16V16H8V14Z"/>
              </svg>
              Keyboard Shortcuts
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
`;

const CharacterCount = () => `
  <small id="characterCount"></small>
`;

const Tabs = () => `
  <input type="radio" name="tabs" id="tab1" class="tab-input" checked />
  <label class="tab" for="tab1">editor</label>
  <input type="radio" name="tabs" id="tab2" class="tab-input" />
  <label class="tab" for="tab2">preview</label>
  <small id="characterCount"></small>
`;

const Editor = (paste = '', url = '', errors: any = { url: '' }) => `
  <!-- Modern Split Layout -->
  <div class="github-layout">
    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Editor Header with Tab-like Interface -->
      <div class="editor-header">
        <div class="editor-tabs">
          <button type="button" class="editor-tab active" data-tab="edit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
            </svg>
            Edit
          </button>
          <button type="button" class="editor-tab" data-tab="preview">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
            </svg>
            Preview
          </button>
        </div>
        <div class="editor-actions">
          <!-- Focus Mode Toggle -->
          <button type="button" class="focus-mode-btn" id="focusModeToggle" title="Focus Mode">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Content Container -->
      <div class="editor-content">
        <!-- Editor View -->
        <div id="editor-container" class="tab-content active" data-content="edit">
          <textarea id="pasteTextArea" name="paste" required>${paste}</textarea>
          <div id="editor"></div>
        </div>
        
        <!-- Preview View -->
        <div id="preview-container" class="tab-content" data-content="preview">
          <div class="preview-placeholder">Preview will appear here...</div>
        </div>
      </div>
    </div>
    
    <!-- Right Sidebar -->
    <div class="sidebar">
      <!-- Note Password -->
      <div class="sidebar-section">
        <label class="sidebar-label">Note password (optional)</label>
        <div class="password-field">
          <div class="input-with-action">
            <input
              type="password"
              id="encryptionPassword"
              name="encryptionPassword"
              placeholder="Optional password..."
              minlength="8"
              class="sidebar-input"
            />
            <button type="button" id="togglePasswordVisibility" class="input-action-btn" title="Show/Hide password">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
              </svg>
            </button>
            <button type="button" id="generatePassword" class="input-action-btn" title="Generate secure password">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6,2L8,4H16L18,2H20V4H18L16,6H8L6,4V2M4,6V8H6L8,6H16L18,8H20V6H22V8H20V16H22V18H20V20H18V18H16L14,20H10L8,18H6V20H4V18H2V16H4V8H2V6H4M6,8V16H8L10,18H14L16,16H18V8H16L14,6H10L8,8H6Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Expiration Delay -->
      <div class="sidebar-section">
        <label class="sidebar-label">Expiration delay</label>
        <div class="expiry-options">
          <div class="compact-expiry-buttons">
            <button type="button" class="compact-expiry-btn" data-hours="1">1 hour</button>
            <button type="button" class="compact-expiry-btn selected" data-hours="24">1 day</button>
            <button type="button" class="compact-expiry-btn" data-hours="168">1 week</button>
            <button type="button" class="compact-expiry-btn" data-hours="720">1 month</button>
            <button type="button" class="compact-expiry-btn" data-hours="0">infinite</button>
            <button type="button" class="compact-expiry-btn" id="customDateBtn" data-hours="custom">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19M5,6V5H19V6H5Z"/>
              </svg>
              Custom date
            </button>
          </div>
          <input
            type="datetime-local"
            id="customExpiryDate"
            name="customExpiryDate"
            class="sidebar-input"
            style="display: none;"
            placeholder="Custom date"
          />
        </div>
      </div>
      
      <!-- Delete after reading -->
      <div class="sidebar-section">
        <div class="toggle-option">
          <label class="toggle-option-label">
            <input type="checkbox" id="enableOneTimeView" name="enableOneTimeView" class="toggle-checkbox" />
            <span class="toggle-switch-small">
              <span class="toggle-slider-small"></span>
            </span>
            <span class="toggle-text">Delete the note after reading (One-Time)</span>
          </label>
        </div>
      </div>
      
      <!-- Custom URL -->
      <div class="sidebar-section">
        <label class="sidebar-label">Custom URL (optional)</label>
        <input
          name="url"
          type="text"
          placeholder="Custom URL slug"
          minlength="3"
          maxlength="40"
          value="${url}"
          pattern=".*\\S+.*"
          aria-invalid="${Boolean(errors.url)}"
          ${_if(errors.url, 'aria-describedby="url-error"')}
          class="sidebar-input"
        />
        ${_if(errors.url, `
          <small class="field-error" id="url-error">${errors.url}</small>
        `)}
      </div>
      
      <!-- Edit Code -->
      <div class="sidebar-section">
        <label class="sidebar-label">Edit Code (optional)</label>
        <input
          name="editcode"
          type="text"
          placeholder="Optional edit code"
          minlength="3"
          maxlength="40"
          class="sidebar-input"
        />
      </div>
      
      <!-- Action Buttons -->
      <div class="sidebar-actions">
        <button type="button" class="sidebar-btn secondary" id="attachFiles">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z"/>
          </svg>
          Attach files
        </button>
        
        <button type="submit" class="sidebar-btn primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
          </svg>
          Create note
        </button>
      </div>
      
      <!-- Hidden file input -->
      <input
        type="file"
        id="fileAttachment"
        name="fileAttachment"
        multiple
        accept=".txt,.md,.js,.ts,.html,.css,.json,.xml,.csv,.log,.py,.java,.cpp,.c,.php,.rb,.go,.rs,.swift,.kt,.scala,.sh,.bat,.sql,.yml,.yaml"
        class="hidden-file-input"
      />
      
      <!-- File list -->
      <div id="fileList" class="file-list" style="display: none;">
        <div class="file-list-header">
          <span id="fileCount">Attached Files</span>
          <button type="button" id="clearAllFiles" class="clear-all">Clear All</button>
        </div>
        <div id="fileItems" class="file-items"></div>
      </div>
    </div>
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
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <!-- External Libraries -->
    <link rel="stylesheet" href="/codemirror.min.css">
    <link rel="stylesheet" href="/highlight-light.min.css" media="(prefers-color-scheme: light)">
    <link rel="stylesheet" href="/highlight-dark.min.css" media="(prefers-color-scheme: dark)">
    <link rel="stylesheet" href="/highlight-light.min.css" media="not all and (prefers-color-scheme: dark)" data-theme-light>
    <link rel="stylesheet" href="/highlight-dark.min.css" media="not all and (prefers-color-scheme: light)" data-theme-dark>
    
    <!-- Modular CSS Architecture -->
    <link rel="stylesheet" href="/css/base.css">
    <link rel="stylesheet" href="/css/themes.css">
    <link rel="stylesheet" href="/css/layout.css">
    <link rel="stylesheet" href="/css/components.css">
    <link rel="stylesheet" href="/css/editor.css">
    <link rel="stylesheet" href="/css/responsive.css">
    <title>
      ${title || 'ShareBin'}
    </title>
  </head>
  <body>
    ${_if(!showNavbar, ThemeToggle())}
    ${_if(showNavbar, NewNavbar())}

    ${_if(mode === 'demo', `
      <div role="alert" class="demo-alert">
        <strong style="font-size: 2em">
          <p>This is a DEMO instance.</p>
          <p>Posts will be automatically deleted every few minutes.</p>
        </strong>
      </div>
    `)}

    ${content}
    ${_if(showKeyboardHint, `
      <div class="shortcuts-hint">
        <span class="hint-text">✨ Press <kbd>Ctrl</kbd> + <kbd>/</kbd> for keyboard shortcuts</span>
      </div>
    `)}
    <footer>
      <div class="footer-content">
        <div class="footer-info">
          <span>Crafted by <strong>kavin</strong> • Source code available on <a href="https://github.com/kvnlabs/ShareBin" target="_blank" rel="noopener">GitHub</a> • Version <strong id="version-number">v 1.0.0</strong></span>
        </div>
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

      function setTheme(theme) {
        currentTheme = theme;
        localStorage.setItem(themeStorageKey, currentTheme);
        applyTheme(currentTheme);
        updateThemeUI();
        
        // Close theme dropdown
        const themeDropdown = document.getElementById('themeDropdown');
        if (themeDropdown) {
          themeDropdown.classList.remove('show');
        }
        
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
        if (menu) menu.classList.toggle('open');
      }

      function toggleNavbarDropdown() {
        const dropdown = document.getElementById('navbarDropdown');
        if (dropdown) {
          dropdown.classList.toggle('show');
        }
      }

      function toggleThemeDropdown() {
        const dropdown = document.getElementById('themeDropdown');
        if (dropdown) {
          dropdown.classList.toggle('show');
        }
      }

      function toggleFocusMode() {
        const body = document.body;
        const focusBtn = document.getElementById('focusModeToggle');
        
        if (body.classList.contains('focus-mode')) {
          // Exit focus mode
          body.classList.remove('focus-mode');
          if (focusBtn) {
            focusBtn.title = 'Focus Mode';
            focusBtn.innerHTML = \`
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z"/>
              </svg>
            \`;
          }
        } else {
          // Enter focus mode
          body.classList.add('focus-mode');
          if (focusBtn) {
            focusBtn.title = 'Exit Focus Mode';
            focusBtn.innerHTML = \`
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z"/>
              </svg>
            \`;
          }
        }
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

      // Shortcuts modal functionality
      function toggleShortcutsModal() {
        const shortcutsModal = document.getElementById('shortcuts-modal');
        if (shortcutsModal) {
          const isVisible = shortcutsModal.style.display === 'flex';
          
          if (isVisible) {
            shortcutsModal.style.display = 'none';
          } else {
            shortcutsModal.style.display = 'flex';
          }
        }
      }
      
      function closeShortcutsModal() {
        const shortcutsModal = document.getElementById('shortcuts-modal');
        if (shortcutsModal) {
          shortcutsModal.style.display = 'none';
        }
      }
      

      // Add click handlers when DOM is ready
      document.addEventListener('DOMContentLoaded', () => {
        // Fetch and display GitHub version

        // Theme dropdown toggle
        const themeToggle = document.getElementById('navbarThemeToggle');
        const themeDropdown = document.getElementById('themeDropdown');
        
        if (themeToggle && themeDropdown) {
          themeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleThemeDropdown();
          });

          // Handle theme selection
          themeDropdown.addEventListener('click', (e) => {
            if (e.target.classList.contains('dropdown-item') || e.target.closest('.dropdown-item')) {
              const item = e.target.classList.contains('dropdown-item') ? e.target : e.target.closest('.dropdown-item');
              const selectedTheme = item.dataset.theme;
              if (selectedTheme) {
                setTheme(selectedTheme);
              }
            }
          });

          // Close theme dropdown when clicking outside
          document.addEventListener('click', (e) => {
            if (!themeToggle.contains(e.target) && !themeDropdown.contains(e.target)) {
              themeDropdown.classList.remove('show');
            }
          });
        }

        // Focus mode toggle
        const focusToggle = document.getElementById('focusModeToggle');
        if (focusToggle) {
          focusToggle.addEventListener('click', toggleFocusMode);
        }

        // Navbar dropdown menu
        const menuToggle = document.getElementById('navbarMenuToggle');
        const dropdown = document.getElementById('navbarDropdown');
        
        if (menuToggle && dropdown) {
          menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleNavbarDropdown();
          });

          // Close dropdown when clicking outside
          document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !dropdown.contains(e.target)) {
              dropdown.classList.remove('show');
            }
          });

          // Close dropdown when clicking on dropdown items
          dropdown.addEventListener('click', (e) => {
            if (e.target.classList.contains('dropdown-item')) {
              dropdown.classList.remove('show');
            }
          });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
          const menu = document.getElementById('navbarMobileMenu');
          const toggle = document.querySelector('.navbar-mobile-toggle');
          
          if (menu && menu.classList.contains('open') &&
              !menu.contains(e.target) &&
              toggle && !toggle.contains(e.target)) {
            menu.classList.remove('open');
          }
        });

        // Close mobile menu when clicking on nav links
        document.querySelectorAll('.navbar-mobile-nav .navbar-nav-link').forEach(link => {
          link.addEventListener('click', () => {
            const menu = document.getElementById('navbarMobileMenu');
            if (menu) menu.classList.remove('open');
          });
        });

        // GitHub icon hover effect - animate only on hover
        const githubIcon = document.querySelector('.github-icon img');
        const githubLink = document.querySelector('.github-icon');
        
        if (githubIcon && githubLink) {
          githubLink.addEventListener('mouseenter', () => {
            // Force GIF to restart from beginning by adding timestamp
            githubIcon.src = '/github-cat.gif?' + Date.now();
          });
          
          githubLink.addEventListener('mouseleave', () => {
            githubIcon.src = '/github-cat-static.png';
          });
        }
        
        // Keyboard shortcuts button
        const keyboardShortcutsBtn = document.getElementById('keyboard-shortcuts-btn');
        if (keyboardShortcutsBtn && typeof window.toggleShortcutsModal === 'function') {
          keyboardShortcutsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.toggleShortcutsModal();
          });
        }
        
        // Shortcuts modal close button
        const closeShortcutsBtn = document.getElementById('close-shortcuts');
        if (closeShortcutsBtn) {
          closeShortcutsBtn.addEventListener('click', closeShortcutsModal);
        }
        
        // Close shortcuts modal when clicking outside
        const shortcutsModal = document.getElementById('shortcuts-modal');
        if (shortcutsModal) {
          shortcutsModal.addEventListener('click', function(e) {
            if (e.target === shortcutsModal) {
              closeShortcutsModal();
            }
          });
          
          // Close shortcuts modal with Escape key
          document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && shortcutsModal.style.display === 'flex') {
              closeShortcutsModal();
            }
          });
        }
      });
    </script>
    <script src="/notification.js"></script>
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
    <form id="editor-form" method="post" action="/save" enctype="multipart/form-data">
      ${Editor(paste, url, errors)}
    </form>
  </main>
  <script src="/codemirror.min.js"></script>
  <script src="/cm-markdown.min.js"></script>
  <script src="/cm-sublime.min.js"></script>
  <script src="/editor.js"></script>
  <script src="/encryption-ui.js"></script>
`, mode, true, '', true);

import { PasteRevision, AttachmentInfo } from './storage';

export const pastePage = ({ id = '', html = '', title = '', mode = '', revisions = [], isEncrypted = false, isPasswordProtected = false, attachments = [], showNavbar = true }: { id?: string; html?: string; title?: string; mode?: string; revisions?: PasteRevision[]; isEncrypted?: boolean; isPasswordProtected?: boolean; attachments?: AttachmentInfo[]; showNavbar?: boolean } = {}) => layout(title, `
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
          ${isEncrypted ? `
            <div class="encrypted-content" data-encrypted-content="${html}" data-paste-id="${id}" data-password-protected="${isPasswordProtected}">
              ${isPasswordProtected ? `
                <div class="encryption-notice">
                  <h2>🔒 Password Protected Content</h2>
                  <p>This content is password protected and requires a password to decrypt.</p>
                  <div class="decrypt-form">
                    <input type="password" id="decryptPassword" placeholder="Enter password to decrypt..." />
                    <button onclick="decryptContent()" class="decrypt-btn">Decrypt</button>
                  </div>
                  <small>The password is not sent to the server. All decryption happens locally.</small>
                </div>
              ` : ''}
            </div>
          ` : html}
        </div>
        
        <!-- Attachments Section -->
        <div class="attachments-section" id="attachmentsSection" style="display: none;">
          <div class="attachments-header">
            <h3>📎 Attachments</h3>
            <div class="attachments-actions">
              <button class="download-all-btn" onclick="downloadAllAttachments()" title="Download all attachments">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                </svg>
                Download All
              </button>
              <span class="attachments-count" id="attachmentsCount">0 files</span>
            </div>
          </div>
          <div class="attachments-grid" id="attachmentsList">
            <!-- Attachments will be populated here -->
          </div>
        </div>
      </div>

      <!-- Enhanced Revision Panel -->
      ${_if(revisions.length > 0, `
        <div class="revision-panel" id="revisionPanel">
          <div class="revision-panel-header">
            <div class="revision-title-section">
              <h3>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z"/>
                </svg>
                Page History
              </h3>
              <span class="revision-count">${revisions.length} revisions</span>
            </div>
            <button class="close-btn" onclick="toggleRevisionHistory()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
              </svg>
            </button>
          </div>
          <div class="revision-list">
            ${revisions.map((rev, index) => `
              <div class="revision-entry" data-revision-index="${index}">
                <div class="revision-content">
                  <div class="revision-header">
                    <div class="revision-info">
                      <span class="revision-title" data-user-version="${revisions.length - index}">Revision ${revisions.length - index}</span>
                      <span class="revision-date" data-timestamp="${rev.timestamp}">
                        <span class="date-relative">Loading...</span>
                        <span class="date-absolute">Loading...</span>
                      </span>
                    </div>
                    <div class="revision-actions">
                      <a href="/${id}/edit?revision=${rev.timestamp}" class="revision-action-btn" title="Edit this revision">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
                        </svg>
                        Edit
                      </a>
                      <button class="revision-action-btn primary" onclick="restoreRevision('${rev.timestamp}')" title="Restore this revision">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z"/>
                        </svg>
                        Restore
                      </button>
                    </div>
                  </div>
                </div>
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
    function addCopyButtons() {
      addCopyButtonsToCodeBlocks();
    }
    
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
      document.getElementById('decrypt-password').value = '';
    }

    function showDecryptError(message) {
      const errorDiv = document.getElementById('decrypt-error');
      errorDiv.textContent = message;
      errorDiv.style.display = 'block';
    }

    // Decryption function for client-side encrypted content
    async function decryptContent() {
      const encryptedContainer = document.querySelector('.encrypted-content');
      const passwordInput = document.getElementById('decryptPassword');
      const decryptBtn = document.querySelector('.decrypt-btn');
      
      if (!encryptedContainer) return;
      
      const encryptedContent = encryptedContainer.getAttribute('data-encrypted-content');
      const pasteId = encryptedContainer.getAttribute('data-paste-id');
      const isPasswordProtected = encryptedContainer.getAttribute('data-password-protected') === 'true';
      
      if (!encryptedContent) {
        showNotification('No encrypted content found', 'error');
        return;
      }
      
      let password = null;
      
      if (isPasswordProtected) {
        if (!passwordInput) return;
        password = passwordInput.value;
        if (!password) {
          showNotification('Please enter a password', 'error');
          return;
        }
        
        // Show loading state
        decryptBtn.disabled = true;
        decryptBtn.textContent = 'Decrypting...';
      }
      
      try {
        if (!window.ShareBinCrypto) {
          throw new Error('Encryption system not available');
        }
        
        let decryptedText;
        
        if (isPasswordProtected) {
          // Password-protected decryption
          decryptedText = await window.ShareBinCrypto.decrypt(encryptedContent, password);
        } else {
          // Default decryption (auto-decrypt)
          decryptedText = await window.ShareBinCrypto.decryptDefault(encryptedContent);
        }
        
        // Process the decrypted markdown
        const response = await fetch('/preview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: decryptedText })
        });
        
        if (response.ok) {
          const html = await response.text();
          
          // Replace the encrypted content with decrypted content
          const documentContent = document.querySelector('.document-content');
          documentContent.innerHTML = html;
          
          // Add copy buttons to code blocks
          addCopyButtons();
          
          // Show attachments after successful decryption
          const attachmentData = ${JSON.stringify(attachments)};
          if (attachmentData.length > 0) {
            displayAttachments(attachmentData);
          }
          
          // Only show success notification for password-protected content
          if (isPasswordProtected) {
            showNotification('Content decrypted successfully!', 'success');
          }
        } else {
          throw new Error('Failed to process decrypted content');
        }
        
      } catch (error) {
        console.error('Decryption error:', error);
        showNotification('Decryption failed: ' + error.message, 'error');
        if (passwordInput) {
          passwordInput.select();
        }
      } finally {
        if (decryptBtn) {
          decryptBtn.disabled = false;
          decryptBtn.textContent = 'Decrypt';
        }
      }
    }
    
    // Function to wait for crypto system to be available
    async function waitForCryptoSystem() {
      return new Promise((resolve) => {
        if (window.ShareBinCrypto) {
          resolve(window.ShareBinCrypto);
          return;
        }
        
        const checkCrypto = () => {
          if (window.ShareBinCrypto) {
            resolve(window.ShareBinCrypto);
          } else {
            setTimeout(checkCrypto, 50);
          }
        };
        
        checkCrypto();
      });
    }
    
    // Auto-decrypt non-password-protected content silently
    document.addEventListener('DOMContentLoaded', async function() {
      const encryptedContainer = document.querySelector('.encrypted-content');
      if (encryptedContainer) {
        const isPasswordProtected = encryptedContainer.getAttribute('data-password-protected') === 'true';
        if (!isPasswordProtected) {
          // Wait for crypto system to be available before auto-decrypting
          await waitForCryptoSystem();
          decryptContent();
        }
      }
    });
    
    // Allow Enter key to decrypt
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && e.target.id === 'decryptPassword') {
        decryptContent();
      }
    });
    
    // Initialize attachments
    function initializeAttachments() {
      // Only show attachments if content is not encrypted or already decrypted
      const encryptedContainer = document.querySelector('.encrypted-content');
      const isEncrypted = ${isEncrypted};
      
      // Don't show attachments if content is still encrypted
      if (isEncrypted && encryptedContainer) {
        return; // Skip attachment display for encrypted content
      }
      
      // Use real attachments passed from server
      const attachmentData = ${JSON.stringify(attachments)};
      
      if (attachmentData.length > 0) {
        const attachmentsSection = document.getElementById('attachmentsSection');
        if (attachmentsSection) {
          attachmentsSection.classList.add('loading');
        }
        
        // Small delay to ensure proper positioning
        setTimeout(() => {
          displayAttachments(attachmentData);
          if (attachmentsSection) {
            attachmentsSection.classList.remove('loading');
            attachmentsSection.classList.add('loaded');
          }
        }, 100);
      }
    }
    
    function displayAttachments(attachments) {
      const attachmentsSection = document.getElementById('attachmentsSection');
      const attachmentsList = document.getElementById('attachmentsList');
      const attachmentsCount = document.getElementById('attachmentsCount');
      
      if (!attachmentsSection || !attachmentsList || !attachmentsCount) return;
      
      attachmentsSection.style.display = 'block';
      attachmentsCount.textContent = attachments.length === 1 ? '1 file' : \`\${attachments.length} files\`;
      
      attachmentsList.innerHTML = attachments.map(attachment => \`
        <div class="attachment-item">
          <div class="attachment-info">
            <svg class="attachment-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="\${getFileIcon(attachment.originalName)}"/>
            </svg>
            <div class="attachment-details">
              <div class="attachment-name" title="\${attachment.originalName}">\${attachment.originalName}</div>
              <div class="attachment-size">\${formatFileSize(attachment.size)}</div>
            </div>
          </div>
          <div class="attachment-actions">
            <button class="attachment-btn primary" onclick="downloadAttachment('\${attachment.id}', '\${attachment.originalName}')">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
              </svg>
              Download
            </button>
            <button class="attachment-btn" onclick="viewAttachment('\${attachment.id}', '\${attachment.type}', '\${attachment.originalName}')">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
              </svg>
              View
            </button>
          </div>
        </div>
      \`).join('');
    }
    
    function downloadAttachment(attachmentId, filename) {
      const url = \`/attachment/\${attachmentId}?paste=\${encodeURIComponent('${id}')}&action=download\`;
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      showNotification('Downloading ' + filename, 'success');
    }
    
    function viewAttachment(attachmentId, type, filename) {
      if (type.startsWith('text/') || type === 'application/json') {
        // Open in new tab for text files with inline display
        const url = \`/attachment/\${attachmentId}?paste=\${encodeURIComponent('${id}')}&action=view\`;
        window.open(url, '_blank');
      } else {
        // Download non-text files
        downloadAttachment(attachmentId, filename);
      }
    }
    
    function getFileIcon(filename) {
      const ext = filename.split('.').pop().toLowerCase();
      
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
    
    function formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    function downloadAllAttachments() {
      const attachmentData = ${JSON.stringify(attachments)};
      
      if (attachmentData.length === 0) {
        showNotification('No attachments to download', 'error');
        return;
      }
      
      // Show notification
      showNotification(\`Downloading \${attachmentData.length} attachments...\`, 'info');
      
      // Download each attachment with a small delay to avoid overwhelming the browser
      attachmentData.forEach((attachment, index) => {
        setTimeout(() => {
          downloadAttachment(attachment.id, attachment.originalName);
        }, index * 200); // 200ms delay between downloads
      });
    }

    // Initialize when page loads
    document.addEventListener('DOMContentLoaded', () => {
      addCopyButtonsToCodeBlocks();
      initializeRevisionTimestamps();
      initializeUserVersions();
      initializeAttachments();
      initializeRevisionFilters();
      initializeRevisionSizes();
      
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

    // Enhanced revision history functions
    function viewRevision(timestamp) {
      // Create a modal or overlay to show the revision content
      const modal = document.createElement('div');
      modal.className = 'revision-modal';
      modal.innerHTML = \`
        <div class="revision-modal-content">
          <div class="revision-modal-header">
            <h3>Revision from \${formatAbsoluteTime(new Date(parseInt(timestamp)))}</h3>
            <button class="close-btn" onclick="this.closest('.revision-modal').remove()">×</button>
          </div>
          <div class="revision-modal-body">
            <div class="loading">Loading revision...</div>
          </div>
        </div>
      \`;
      
      document.body.appendChild(modal);
      
      // Fetch and display the revision content
      fetch('/${id}/revision/' + timestamp)
        .then(response => response.text())
        .then(content => {
          modal.querySelector('.revision-modal-body').innerHTML = \`
            <div class="revision-content">\${content}</div>
          \`;
        })
        .catch(error => {
          modal.querySelector('.revision-modal-body').innerHTML = \`
            <div class="error">Failed to load revision: \${error.message}</div>
          \`;
        });
    }
    
    function restoreRevision(timestamp) {
      if (confirm('Are you sure you want to restore this revision? This will replace the current content.')) {
        showNotification('Restoring revision...', 'info');
        
        fetch('/${id}/restore/' + timestamp, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            showNotification('Revision restored successfully!', 'success');
            setTimeout(() => window.location.reload(), 1000);
          } else {
            showNotification(data.error || 'Failed to restore revision', 'error');
          }
        })
        .catch(error => {
          console.error('Restore error:', error);
          showNotification('Error restoring revision: ' + error.message, 'error');
        });
      }
    }
    
    // Initialize revision filters
    function initializeRevisionFilters() {
      const filterButtons = document.querySelectorAll('.revision-filter');
      const revisionEntries = document.querySelectorAll('.revision-entry');
      
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          // Update active filter
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          const filter = button.dataset.filter;
          
          revisionEntries.forEach((entry, index) => {
            const shouldShow = filter === 'all' ||
                             (filter === 'recent' && index < 5) ||
                             (filter === 'major' && index % 3 === 0);
            
            entry.style.display = shouldShow ? 'flex' : 'none';
          });
        });
      });
    }
    
    // Calculate and display revision sizes
    function initializeRevisionSizes() {
      const sizeElements = document.querySelectorAll('.change-size');
      const revisions = ${JSON.stringify(revisions)};
      
      sizeElements.forEach((element, index) => {
        const currentSize = revisions[index]?.content?.length || 0;
        const previousSize = revisions[index + 1]?.content?.length || 0;
        const diff = currentSize - previousSize;
        
        let sizeText = '';
        let className = '';
        
        if (diff > 0) {
          sizeText = '+' + diff + ' chars';
          className = 'addition';
        } else if (diff < 0) {
          sizeText = diff + ' chars';
          className = 'deletion';
        } else {
          sizeText = 'No change';
          className = 'neutral';
        }
        
        element.textContent = sizeText;
        element.className = 'change-size ' + className;
      });
    }

    document.getElementById('decrypt-form')?.addEventListener('submit', async function(e) {
      e.preventDefault();
      const password = document.getElementById('decrypt-password').value;
      
      if (!password) {
        showDecryptError('Please enter a password');
        return;
      }

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
      }
    });
  </script>
  </script>
`, mode, false);

export const guidePage = ({ html = '', title = '', mode = '' } = {}) => layout(title, `
  <main>
    <div class="content-wrapper">
      ${html}
    </div>
  </main>
`, mode, false);

const EditEditor = (paste = '', id = '', hasEditCode = false, isEncrypted = false, isPasswordProtected = false, errors: any = { editCode: '' }, existingAttachments: any[] = []) => `
  <!-- Modern Edit Layout -->
  <div class="github-layout">
    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Editor Header -->
      <div class="editor-header">
        <div class="editor-tabs">
          <button type="button" class="editor-tab active" data-tab="edit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
            </svg>
            Edit
          </button>
          <button type="button" class="editor-tab" data-tab="preview">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
            </svg>
            Preview
          </button>
        </div>
        <div class="editor-actions">
          <button type="button" class="focus-mode-btn" id="focusModeToggle" title="Focus Mode">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Content Container -->
      <div class="editor-content">
        <!-- Editor View -->
        <div id="editor-container" class="tab-content active" data-content="edit">
          ${_if(isEncrypted && isPasswordProtected, `
            <div class="encrypted-edit-content" data-encrypted-content="${paste}" data-paste-id="${id}" data-password-protected="${isPasswordProtected}">
              <div class="encryption-notice">
                <div class="lock-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
                  </svg>
                </div>
                <h3>🔒 Password Protected Content</h3>
                <p>This content is password protected and needs to be decrypted before editing.</p>
                <div class="password-input-group">
                  <label for="editDecryptPassword">Enter password to decrypt:</label>
                  <input type="password" id="editDecryptPassword" placeholder="Enter password" />
                </div>
                <button class="decrypt-btn" onclick="decryptForEdit()">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
                  </svg>
                  Decrypt & Edit
                </button>
              </div>
            </div>
          `)}
          ${_if(isEncrypted && !isPasswordProtected, `
            <div class="encrypted-edit-content" data-encrypted-content="${paste}" data-paste-id="${id}" data-password-protected="${isPasswordProtected}" style="display: none;">
              <!-- Auto-decrypt for default encrypted content -->
            </div>
            <textarea id="pasteTextArea" name="paste" required style="display: none;">${paste}</textarea>
            <div id="editor"></div>
          `)}
          ${_if(!isEncrypted, `
            <textarea id="pasteTextArea" name="paste" required style="display: none;">${paste}</textarea>
            <div id="editor"></div>
          `)}
        </div>
        
        <!-- Preview View -->
        <div id="preview-container" class="tab-content" data-content="preview">
          <div class="preview-placeholder">Preview will appear here...</div>
        </div>
      </div>
    </div>
    
    <!-- Edit Sidebar -->
    <div class="sidebar">
      <!-- Note Information -->
      <div class="sidebar-section">
        <label class="sidebar-label">Note ID</label>
        <input
          type="text"
          value="${id}"
          class="sidebar-input"
          readonly
          style="background: var(--faint-bg-color); cursor: text;"
        />
      </div>
      
      <!-- Edit Code Section -->
      <div class="sidebar-section">
        <label class="sidebar-label">Edit Code ${hasEditCode ? '(required)' : '(optional)'}</label>
        <input
          name="editcode"
          type="text"
          placeholder="${hasEditCode ? 'Enter edit code to save changes' : 'Optional edit code'}"
          minlength="3"
          maxlength="40"
          ${hasEditCode ? 'required' : ''}
          aria-invalid="${Boolean(errors.editCode)}"
          ${_if(errors.editCode, 'aria-describedby="editcode-error"')}
          class="sidebar-input"
        />
        ${_if(errors.editCode, `
          <small class="field-error" id="editcode-error">${errors.editCode}</small>
        `)}
        ${_if(hasEditCode, `
          <small class="field-help">This note requires an edit code to save changes.</small>
        `)}
      </div>
      
      <!-- Action Buttons -->
      <div class="sidebar-actions">
        <button type="button" class="sidebar-btn secondary" id="attachFiles">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z"/>
          </svg>
          Attach files
        </button>
        
        <button type="submit" class="sidebar-btn primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"/>
          </svg>
          Save note
        </button>
        
        <a href="/${id}" class="sidebar-btn secondary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
          </svg>
          Cancel
        </a>
      </div>
      
      <!-- Hidden file input -->
      <input
        type="file"
        id="fileAttachment"
        name="fileAttachment"
        multiple
        accept=".txt,.md,.js,.ts,.html,.css,.json,.xml,.csv,.log,.py,.java,.cpp,.c,.php,.rb,.go,.rs,.swift,.kt,.scala,.sh,.bat,.sql,.yml,.yaml"
        class="hidden-file-input"
      />
      
      <!-- File list -->
      <div id="fileList" class="file-list" style="display: none;">
        <div class="file-list-header">
          <span id="fileCount">Attached Files</span>
          <button type="button" id="clearAllFiles" class="clear-all">Clear All</button>
        </div>
        <div id="fileItems" class="file-items"></div>
      </div>
      
      <!-- Existing Attachments -->
      ${existingAttachments.length > 0 ? `
        <div class="existing-attachments">
          <div class="sidebar-section">
            <label class="sidebar-label">Existing Attachments (${existingAttachments.length})</label>
            <div class="existing-attachments-list">
              ${existingAttachments.map(attachment => `
                <div class="existing-attachment-item">
                  <div class="attachment-info">
                    <svg class="attachment-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                    <div class="attachment-details">
                      <div class="attachment-name" title="${attachment.originalName}">${attachment.originalName}</div>
                      <div class="attachment-size">${attachment.size < 1024 ? attachment.size + ' B' : attachment.size < 1048576 ? Math.round(attachment.size/1024) + ' KB' : Math.round(attachment.size/1048576) + ' MB'}</div>
                    </div>
                  </div>
                  <div class="attachment-actions">
                    <button type="button" class="attachment-btn small" onclick="downloadEditAttachment('${attachment.id}', '${attachment.originalName}')">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                      </svg>
                      Download
                    </button>
                    <button type="button" class="attachment-btn small danger" onclick="removeExistingAttachment('${attachment.id}')">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  </div>
`;

export const editPage = (
  { id = '', paste = '', hasEditCode = false, isEncrypted = false, isPasswordProtected = false, errors = { editCode: '' }, mode = '', existingAttachments = [] as any[] } = {},
) => layout(`edit ${id}`, `
  <main>
    <form id="editor-form" method="post" action="/${id}/save" enctype="multipart/form-data">
      ${EditEditor(paste, id, hasEditCode, isEncrypted, isPasswordProtected, errors, existingAttachments)}
      <input type="hidden" name="url" value="${id}" />
      <input type="hidden" name="isEncrypted" value="${isEncrypted}" />
      <input type="hidden" name="isPasswordProtected" value="${isPasswordProtected}" />
      <!-- Hidden password field for re-encryption -->
      <input type="hidden" id="encryptionPassword" name="encryptionPassword" value="" />
    </form>
  </main>
  <script src="/codemirror.min.js"></script>
  <script src="/cm-markdown.min.js"></script>
  <script src="/cm-sublime.min.js"></script>
  <script src="/editor.js"></script>
  <script src="/encryption-ui.js"></script>
  <script>
    // Decryption function for edit page
    async function decryptForEdit() {
      const encryptedContainer = document.querySelector('.encrypted-edit-content');
      const passwordInput = document.getElementById('editDecryptPassword');
      const decryptBtn = document.querySelector('.decrypt-btn');
      
      if (!encryptedContainer) return;
      
      const encryptedContent = encryptedContainer.getAttribute('data-encrypted-content');
      const pasteId = encryptedContainer.getAttribute('data-paste-id');
      const isPasswordProtected = encryptedContainer.getAttribute('data-password-protected') === 'true';
      
      if (!encryptedContent) {
        showNotification('No encrypted content found', 'error');
        return;
      }
      
      let password = null;
      
      if (isPasswordProtected) {
        if (!passwordInput) return;
        password = passwordInput.value;
        if (!password) {
          showNotification('Please enter a password', 'error');
          return;
        }
        
        // Show loading state
        decryptBtn.disabled = true;
        decryptBtn.textContent = 'Decrypting...';
      }
      
      try {
        if (!window.ShareBinCrypto) {
          throw new Error('Encryption system not available');
        }
        
        let decryptedText;
        
        if (isPasswordProtected) {
          // Password-protected decryption
          decryptedText = await window.ShareBinCrypto.decrypt(encryptedContent, password);
        } else {
          // Default decryption (auto-decrypt)
          try {
            decryptedText = await window.ShareBinCrypto.decryptDefault(encryptedContent);
          } catch (defaultDecryptError) {
            // If default decryption fails, content might be plain text or use different encryption
            // Default decryption failed, treating as plain text
            decryptedText = encryptedContent; // Use as-is if not encrypted
          }
        }
        
        // Replace the encrypted content with the editor
        const editorContent = document.querySelector('.editor-content');
        if (editorContent) {
          editorContent.innerHTML = \`
            <!-- Editor View -->
            <div id="editor-container" class="tab-content active" data-content="edit">
              <textarea id="pasteTextArea" name="paste" required>\${decryptedText}</textarea>
              <div id="editor"></div>
            </div>
            
            <!-- Preview View -->
            <div id="preview-container" class="tab-content" data-content="preview">
              <div class="preview-placeholder">Preview will appear here...</div>
            </div>
          \`;
        }
        
        // Store the password for re-encryption during save
        if (isPasswordProtected && password) {
          const hiddenPasswordField = document.getElementById('encryptionPassword');
          if (hiddenPasswordField) {
            hiddenPasswordField.value = password;
          }
        }
        
        // Clear any existing editor
        if (window.cmEditor) {
          window.cmEditor = null;
        }
        
        // Reinitialize the editor
        setTimeout(() => {
          if (typeof window.initializeEditor === 'function') {
            // Reinitializing editor after decryption...
            const success = window.initializeEditor();
            if (success) {
              // Editor reinitialized successfully
            } else {
              console.error('Failed to reinitialize editor');
            }
          } else {
            console.error('initializeEditor function not found');
          }
        }, 100);
        
        showNotification('Content decrypted successfully!', 'success');
        
      } catch (error) {
        console.error('Decryption error:', error);
        showNotification('Decryption failed: ' + error.message, 'error');
        if (passwordInput) {
          passwordInput.select();
        }
      } finally {
        if (decryptBtn) {
          decryptBtn.disabled = false;
          decryptBtn.textContent = 'Decrypt & Edit';
        }
      }
    }
    
    // Auto-decrypt non-password-protected content
    document.addEventListener('DOMContentLoaded', function() {
      const encryptedContainer = document.querySelector('.encrypted-edit-content');
      if (encryptedContainer) {
        const isPasswordProtected = encryptedContainer.getAttribute('data-password-protected') === 'true';
        const encryptedContent = encryptedContainer.getAttribute('data-encrypted-content');
        
        if (!isPasswordProtected && encryptedContent) {
          // Check if content looks like it's actually encrypted before trying to decrypt
          if (encryptedContent.startsWith('SHAREBIN_DEFAULT:')) {
            // This is default encrypted content, auto-decrypt it
            // Found default encrypted content, auto-decrypting...
            
            // Decrypt immediately without relying on decryptForEdit
            setTimeout(async () => {
              try {
                if (!window.ShareBinCrypto) {
                  throw new Error('ShareBinCrypto not available');
                }
                
                const decryptedText = await window.ShareBinCrypto.decryptDefault(encryptedContent);
                // Auto-decryption successful, setting up editor...
                
                // Set the decrypted content directly to the textarea
                const textarea = document.getElementById('pasteTextArea');
                if (textarea) {
                  textarea.value = decryptedText;
                  // Textarea updated with decrypted content
                  
                  // Update CodeMirror if it exists
                  if (window.cmEditor) {
                    window.cmEditor.setValue(decryptedText);
                    // CodeMirror updated with decrypted content
                  } else {
                    // Initialize the editor if it doesn't exist yet
                    setTimeout(() => {
                      if (typeof window.initializeEditor === 'function') {
                        window.initializeEditor();
                        // Editor initialized
                      }
                    }, 100);
                  }
                }
                
                // For default encryption, clear the password field since it's not password protected
                const hiddenPasswordField = document.getElementById('encryptionPassword');
                if (hiddenPasswordField) {
                  hiddenPasswordField.value = '';
                }
              } catch (error) {
                console.error('Auto-decryption failed:', error);
                // Fall back to showing raw content
                const textarea = document.getElementById('pasteTextArea');
                if (textarea) {
                  textarea.value = encryptedContent;
                  setTimeout(() => {
                    if (typeof window.initializeEditor === 'function') {
                      window.initializeEditor();
                    }
                  }, 100);
                }
              }
            }, 100);
          } else {
            // Check if it's JSON encrypted content
            try {
              const parsedContent = JSON.parse(encryptedContent);
              if (parsedContent && typeof parsedContent === 'object' && parsedContent.ciphertext) {
                // This looks like encrypted content, auto-decrypt it
                setTimeout(decryptForEdit, 100);
              } else {
                // Not encrypted JSON, treat as plain text
                // Content is not encrypted, treating as plain text
                const textarea = document.getElementById('pasteTextArea');
                if (textarea) {
                  textarea.value = encryptedContent;
                  setTimeout(() => {
                    if (typeof window.initializeEditor === 'function') {
                      window.initializeEditor();
                    }
                  }, 100);
                }
              }
            } catch (e) {
              // Not JSON, treat as plain text
              // Content is not JSON, treating as plain text
              const textarea = document.getElementById('pasteTextArea');
              if (textarea) {
                textarea.value = encryptedContent;
                setTimeout(() => {
                  if (typeof window.initializeEditor === 'function') {
                    window.initializeEditor();
                  }
                }, 100);
              }
            }
          }
        }
      }
    });
    
    // Edit page attachment functions
    function downloadEditAttachment(attachmentId, filename) {
      const url = \`/attachment/\${attachmentId}?paste=\${encodeURIComponent('${id}')}&action=download\`;
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
    }
    
    function removeExistingAttachment(attachmentId) {
      if (confirm('Are you sure you want to remove this attachment?')) {
        const attachmentItem = document.querySelector(\`[onclick*="\${attachmentId}"]\`).closest('.existing-attachment-item');
        if (attachmentItem) {
          attachmentItem.remove();
          
          // Add hidden input to mark for deletion
          const hiddenInput = document.createElement('input');
          hiddenInput.type = 'hidden';
          hiddenInput.name = 'removeAttachment';
          hiddenInput.value = attachmentId;
          document.getElementById('editor-form').appendChild(hiddenInput);
        }
      }
    }
  </script>
`, mode, true, '', true);

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

export const errorPage = (mode = '') => layout('404 - Not Found', `
  <main class="confirmation-main">
    <div class="confirmation-panel">
      <!-- Error Icon -->
      <div class="error-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2M12,21L10.91,15.74L2,15L10.91,14.26L12,8L13.09,14.26L22,15L13.09,15.74L12,21Z"/>
        </svg>
      </div>
      
      <!-- Heading -->
      <h1 class="confirmation-heading">404 - Page Not Found</h1>
      
      <!-- Sub-text -->
      <p class="confirmation-subtext">The paste you're looking for doesn't exist. It may have been deleted, expired, or you may have mistyped the URL.</p>
      
      <!-- Actions -->
      <div class="action-buttons">
        <a href="/" class="btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
          </svg>
          Go Home
        </a>
        <a href="javascript:history.back()" class="btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
          </svg>
          Go Back
        </a>
      </div>
      
      <!-- Info Section -->
      <div class="info-section">
        <p class="info-text">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,17A1.5,1.5 0 0,1 10.5,15.5A1.5,1.5 0 0,1 12,14A1.5,1.5 0 0,1 13.5,15.5A1.5,1.5 0 0,1 12,17M12,13A1,1 0 0,1 11,12V8A1,1 0 0,1 12,7A1,1 0 0,1 13,8V12A1,1 0 0,1 12,13Z"/>
          </svg>
          <strong>Tip:</strong> If you're looking for a specific paste, make sure the URL is correct and the paste hasn't expired.
        </p>
      </div>
    </div>
  </main>
  
  <style>
    .confirmation-main {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
      padding: 2rem 1rem;
    }
    
    .confirmation-panel {
      background: var(--bg-color);
      padding: 3rem 2.5rem;
      max-width: 500px;
      width: 100%;
      text-align: center;
    }
    
    .error-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 96px;
      height: 96px;
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      border-radius: 50%;
      margin: 0 auto 2rem;
      color: white;
    }
    
    .confirmation-heading {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color);
      margin-bottom: 1rem;
      letter-spacing: -0.025em;
    }
    
    .confirmation-subtext {
      color: var(--faint-color);
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 2.5rem;
    }
    
    .action-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }
    
    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 1.75rem;
      background: var(--link-color);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      min-width: 140px;
      justify-content: center;
    }
    
    .btn-primary:hover {
      background: var(--link-hover-color);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 1.75rem;
      background: var(--faint-bg-color);
      color: var(--color);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      min-width: 140px;
      justify-content: center;
    }
    
    .btn-secondary:hover {
      background: var(--light-bg-color);
      border-color: var(--link-color);
      transform: translateY(-1px);
    }
    
    .info-section {
      padding-top: 2rem;
      border-top: 1px solid var(--border-color);
    }
    
    .info-text {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      color: var(--faint-color);
      font-size: 0.9rem;
      line-height: 1.5;
      text-align: left;
    }
    
    .info-text svg {
      flex-shrink: 0;
      margin-top: 0.125rem;
      opacity: 0.7;
    }
    
    .info-text strong {
      color: var(--color);
    }
    
    /* Mobile Responsive */
    @media (max-width: 768px) {
      .confirmation-main {
        padding: 1rem;
        min-height: 50vh;
      }
      
      .confirmation-panel {
        padding: 2rem 1.5rem;
      }
      
      .confirmation-heading {
        font-size: 1.75rem;
      }
      
      .error-icon {
        width: 80px;
        height: 80px;
      }
      
      .error-icon svg {
        width: 48px;
        height: 48px;
      }
      
      .action-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .btn-primary,
      .btn-secondary {
        width: 100%;
        max-width: 280px;
      }
    }
  </style>
`, mode, false); // showNavbar = false for error page

export const oneTimeViewWarningPage = ({ id = '', mode = '' } = {}) => layout(`⚠️ One-Time View Warning - ${id}`, `
  <main class="confirmation-main">
    <div class="confirmation-panel">
      <!-- Warning Icon -->
      <div class="warning-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2M12,21L10.91,15.74L2,15L10.91,14.26L12,8L13.09,14.26L22,15L13.09,15.74L12,21Z"/>
        </svg>
      </div>
      
      <!-- Heading -->
      <h1 class="confirmation-heading">One-Time View Warning</h1>
      
      <!-- Sub-text -->
      <p class="confirmation-subtext">
        <strong>This paste will be deleted after you view it once.</strong><br>
        After clicking "View Content", you will not be able to access this paste again. Make sure you're ready to view and process the content.
      </p>
      
      <!-- Actions -->
      <div class="action-buttons">
        <button onclick="proceedToView()" class="btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
          </svg>
          View Content (One Time Only)
        </button>
        
        <a href="/" class="btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
          </svg>
          Go Home
        </a>
      </div>
      
      <!-- Info Section -->
      <div class="info-section">
        <p class="info-text">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,17A1.5,1.5 0 0,1 10.5,15.5A1.5,1.5 0 0,1 12,14A1.5,1.5 0 0,1 13.5,15.5A1.5,1.5 0 0,1 12,17M12,13A1,1 0 0,1 11,12V8A1,1 0 0,1 12,7A1,1 0 0,1 13,8V12A1,1 0 0,1 12,13Z"/>
          </svg>
          <strong>Tip:</strong> If you need to share content that can be viewed multiple times, create a new paste without the "Delete after reading" option.
        </p>
      </div>
    </div>
  </main>
  
  <style>
    .confirmation-main {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
      padding: 2rem 1rem;
    }
    
    .confirmation-panel {
      background: var(--bg-color);
      padding: 3rem 2.5rem;
      max-width: 550px;
      width: 100%;
      text-align: center;
    }
    
    .warning-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 96px;
      height: 96px;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      border-radius: 50%;
      margin: 0 auto 2rem;
      color: white;
    }
    
    .confirmation-heading {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color);
      margin-bottom: 1rem;
      letter-spacing: -0.025em;
    }
    
    .confirmation-subtext {
      color: var(--faint-color);
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 2.5rem;
    }
    
    .confirmation-subtext strong {
      color: var(--color);
      font-weight: 600;
    }
    
    .action-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }
    
    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 1.75rem;
      background: var(--link-color);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      min-width: 180px;
      justify-content: center;
    }
    
    .btn-primary:hover {
      background: var(--link-hover-color);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 1.75rem;
      background: var(--faint-bg-color);
      color: var(--color);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      min-width: 140px;
      justify-content: center;
    }
    
    .btn-secondary:hover {
      background: var(--light-bg-color);
      border-color: var(--link-color);
      transform: translateY(-1px);
    }
    
    .info-section {
      padding-top: 2rem;
      border-top: 1px solid var(--border-color);
    }
    
    .info-text {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      color: var(--faint-color);
      font-size: 0.9rem;
      line-height: 1.5;
      text-align: left;
    }
    
    .info-text svg {
      flex-shrink: 0;
      margin-top: 0.125rem;
      opacity: 0.7;
    }
    
    .info-text strong {
      color: var(--color);
    }
    
    /* Mobile Responsive */
    @media (max-width: 768px) {
      .confirmation-main {
        padding: 1rem;
        min-height: 50vh;
      }
      
      .confirmation-panel {
        padding: 2rem 1.5rem;
      }
      
      .confirmation-heading {
        font-size: 1.75rem;
      }
      
      .warning-icon {
        width: 80px;
        height: 80px;
      }
      
      .warning-icon svg {
        width: 48px;
        height: 48px;
      }
      
      .action-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .btn-primary,
      .btn-secondary {
        width: 100%;
        max-width: 280px;
      }
    }
  </style>
  
  <script>
    function proceedToView() {
      // Add a confirmation dialog for extra safety
      if (confirm('Are you sure you want to view this one-time content? It will be permanently deleted after viewing.')) {
        // Proceed to the actual paste view
        window.location.href = '/${id}?confirm=true';
      }
    }
  </script>
`, mode, false); // showNavbar = false for one-time view

export const passwordPromptPage = ({ id = '', mode = '', error = '' } = {}) => layout(`🔒 Encrypted Paste - ${id}`, `
  <main class="confirmation-main">
    <div class="confirmation-panel">
      <!-- Lock Icon -->
      <div class="lock-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
        </svg>
      </div>
      
      <!-- Heading -->
      <h1 class="confirmation-heading">Password Required</h1>
      
      <!-- Sub-text -->
      <p class="confirmation-subtext">
        This paste is password-protected.<br>
        Enter the correct password to view the content.
      </p>
      
      <!-- Password Form -->
      <form id="decrypt-form" method="post" action="/${id}/decrypt" class="password-form">
        <div class="input-group">
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            class="password-input"
            required
            minlength="1"
            autofocus
            aria-invalid="${Boolean(error)}"
            ${_if(error, 'aria-describedby="password-error"')}
          />
          ${_if(error, `
            <small class="error-message" id="password-error">❌ ${error}</small>
          `)}
        </div>
        
        <div class="action-buttons">
          <button type="submit" class="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
            </svg>
            Decrypt Content
          </button>
          
          <a href="/" class="btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
            </svg>
            Go Home
          </a>
        </div>
      </form>

      <!-- Info Section -->
      <div class="info-section">
        <p class="info-text">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,17A1.5,1.5 0 0,1 10.5,15.5A1.5,1.5 0 0,1 12,14A1.5,1.5 0 0,1 13.5,15.5A1.5,1.5 0 0,1 12,17M12,13A1,1 0 0,1 11,12V8A1,1 0 0,1 12,7A1,1 0 0,1 13,8V12A1,1 0 0,1 12,13Z"/>
          </svg>
          <strong>Security:</strong> Your password is processed securely and never stored on our servers.
        </p>
      </div>
    </div>
  </main>
  
  <style>
    .confirmation-main {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
      padding: 2rem 1rem;
    }
    
    .confirmation-panel {
      background: var(--bg-color);
      padding: 3rem 2.5rem;
      max-width: 550px;
      width: 100%;
      text-align: center;
    }
    
    .lock-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 96px;
      height: 96px;
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      border-radius: 50%;
      margin: 0 auto 2rem;
      color: white;
    }
    
    .confirmation-heading {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color);
      margin-bottom: 1rem;
      letter-spacing: -0.025em;
    }
    
    .confirmation-subtext {
      color: var(--faint-color);
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 2.5rem;
    }
    
    .password-form {
      margin-bottom: 2rem;
    }
    
    .input-group {
      margin-bottom: 1.5rem;
    }
    
    .password-input {
      width: 100%;
      padding: 0.875rem 1rem;
      border: 2px solid var(--border-color);
      border-radius: 8px;
      font-size: 1rem;
      background: var(--bg-color);
      color: var(--color);
      transition: border-color 0.2s ease;
      box-sizing: border-box;
    }
    
    .password-input:focus {
      outline: none;
      border-color: var(--link-color);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .error-message {
      display: block;
      margin-top: 0.75rem;
      color: #ef4444;
      font-size: 0.875rem;
      font-weight: 500;
      text-align: left;
    }
    
    .action-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }
    
    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 1.75rem;
      background: var(--link-color);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      min-width: 160px;
      justify-content: center;
    }
    
    .btn-primary:hover {
      background: var(--link-hover-color);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 1.75rem;
      background: var(--faint-bg-color);
      color: var(--color);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      min-width: 140px;
      justify-content: center;
    }
    
    .btn-secondary:hover {
      background: var(--light-bg-color);
      border-color: var(--link-color);
      transform: translateY(-1px);
    }
    
    .info-section {
      padding-top: 2rem;
      border-top: 1px solid var(--border-color);
    }
    
    .info-text {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      color: var(--faint-color);
      font-size: 0.9rem;
      line-height: 1.5;
      text-align: left;
    }
    
    .info-text svg {
      flex-shrink: 0;
      margin-top: 0.125rem;
      opacity: 0.7;
    }
    
    .info-text strong {
      color: var(--color);
    }
    
    /* Mobile Responsive */
    @media (max-width: 768px) {
      .confirmation-main {
        padding: 1rem;
        min-height: 50vh;
      }
      
      .confirmation-panel {
        padding: 2rem 1.5rem;
      }
      
      .confirmation-heading {
        font-size: 1.75rem;
      }
      
      .lock-icon {
        width: 80px;
        height: 80px;
      }
      
      .lock-icon svg {
        width: 48px;
        height: 48px;
      }
      
      .action-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .btn-primary,
      .btn-secondary {
        width: 100%;
        max-width: 280px;
      }
    }
  </style>
`, mode, false);

export const noteCreatedPage = ({ id = '', url = '', mode = '' } = {}) => layout(`Note Created - ${id}`, `
  <main class="confirmation-main">
    <div class="confirmation-panel">
      <!-- Success Icon -->
      <div class="success-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"/>
        </svg>
      </div>
      
      <!-- Heading -->
      <h1 class="confirmation-heading">Note created successfully</h1>
      
      <!-- Sub-text -->
      <p class="confirmation-subtext">Your note has been created and is ready to share</p>
      
      <!-- URL Input Field -->
      <div class="url-section">
        <input
          type="text"
          id="noteUrl"
          class="url-input"
          value="${url}"
          readonly
          onclick="this.select()"
        />
        
        <!-- Copy Link Button -->
        <button type="button" id="copyUrlBtn" class="copy-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
          </svg>
          Copy link
        </button>
      </div>
      
      <!-- QR Code Section -->
      <div class="qr-section">
        <div class="qr-content">
          <!-- QR Code -->
          <div class="qr-code-container">
            <canvas id="qrCanvas" width="200" height="200"></canvas>
          </div>
          
          <!-- QR Info -->
          <div class="qr-info">
            <p class="qr-description">Share this note on mobile devices by scanning the QR code</p>
            <div class="qr-actions">
              <button type="button" id="exportQrBtn" class="export-qr-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
                Export QR code
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Create Another Note Link -->
      <div class="bottom-actions">
        <a href="/" class="create-another-link">Create another note</a>
      </div>
    </div>
  </main>

  <style>
    .confirmation-main {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh; /* Reduced from calc(100vh - 200px) to make footer more visible */
      padding: 1rem; /* Reduced padding */
    }

    .confirmation-panel {
      background: var(--bg-color);
      padding: 2rem;
      max-width: 600px;
      width: 100%;
      text-align: center;
    }

    .success-icon {
      color: #10b981;
      margin: 0 auto 1.5rem auto; /* Center the icon */
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .confirmation-heading {
      font-size: 1.75rem;
      font-weight: 600;
      color: var(--color);
      margin-bottom: 0.75rem;
    }

    .confirmation-subtext {
      color: var(--faint-color);
      font-size: 1rem;
      margin-bottom: 2rem;
    }

    .url-section {
      margin-bottom: 1.5rem;
    }

    .url-input {
      width: 85%;
      padding: 0.75rem;
      font-family: var(--monospace);
      font-size: 0.9rem;
      background: var(--faint-bg-color);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      color: var(--color);
      text-align: center;
      margin-bottom: 0.5rem;
      cursor: pointer;
    }

    .url-input:focus {
      outline: none;
      border-color: var(--link-color);
      box-shadow: 0 0 0 2px rgba(91, 78, 150, 0.1);
    }

    .copy-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      height: 32px;
      background: var(--link-color);
      color: var(--bg-color);
      border: none;
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .copy-btn:hover {
      background: var(--link-hover-color);
      transform: translateY(-1px);
    }

    .qr-section {
      margin-top: 1.5rem;
      padding: 1.5rem;
      background: var(--faint-bg-color);
      border: 1px solid var(--border-color);
      border-radius: 8px;
    }

    .qr-content {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      text-align: left;
    }

    .qr-code-container {
      flex-shrink: 0;
    }

    #qrCanvas {
      border: 1px solid var(--border-color);
      border-radius: 6px;
      background: white;
    }

    .qr-info {
      flex: 1;
      min-width: 0;
    }

    .qr-description {
      color: var(--color);
      font-size: 0.9rem;
      line-height: 1.4;
      margin-bottom: 1rem;
    }

    .export-qr-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.5rem 0.75rem;
      background: var(--bg-color);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      color: var(--color);
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .export-qr-btn:hover {
      background: var(--light-bg-color);
      border-color: var(--link-color);
    }

    .bottom-actions {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-color);
    }

    .create-another-link {
      color: var(--link-color);
      text-decoration: none;
      font-weight: 500;
      font-size: 0.95rem;
      transition: color 0.2s ease;
    }

    .create-another-link:hover {
      color: var(--link-hover-color);
      text-decoration: underline;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .confirmation-panel {
        padding: 1.5rem;
        max-width: 100%;
        margin: 0 1rem;
      }

      .qr-content {
        flex-direction: column;
        text-align: center;
      }

      .qr-info {
        text-align: center;
      }

      .url-input {
        width: 100%;
        margin-bottom: 1rem;
      }
    }

    @media (max-width: 480px) {
      .confirmation-main {
        padding: 1rem 0.5rem;
      }

      .confirmation-panel {
        padding: 1rem;
      }

      .confirmation-heading {
        font-size: 1.5rem;
      }

      #qrCanvas {
        width: 150px;
        height: 150px;
      }
    }
  </style>

  <!-- QR Code Generation Script -->
  <script>
    // Simple QR Code generation using a public API
    let qrCodeGenerated = false;
    
    function generateQRCode(text, canvas) {
      if (qrCodeGenerated) return; // Prevent multiple generations
      
      const ctx = canvas.getContext('2d');
      const size = 200;
      
      // Create QR code using qr-server.com API
      const qrUrl = \`https://api.qrserver.com/v1/create-qr-code/?size=\${size}x\${size}&data=\${encodeURIComponent(text)}&format=png&margin=10\`;
      
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = function() {
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);
        qrCodeGenerated = true; // Mark as generated
      };
      img.onerror = function() {
        // Fallback: draw a simple placeholder
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, size, size);
        ctx.fillStyle = '#666';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('QR Code', size/2, size/2 - 10);
        ctx.fillText('Unavailable', size/2, size/2 + 10);
      };
      img.src = qrUrl;
    }

    // Copy URL functionality
    function copyToClipboard(text) {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text).then(() => {
          showNotification('Link copied to clipboard!', 'success');
        }).catch(() => {
          fallbackCopyTextToClipboard(text);
        });
      } else {
        fallbackCopyTextToClipboard(text);
      }
    }

    function fallbackCopyTextToClipboard(text) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          showNotification('Link copied to clipboard!', 'success');
        } else {
          showNotification('Failed to copy link', 'error');
        }
      } catch (err) {
        showNotification('Failed to copy link', 'error');
      }
      
      document.body.removeChild(textArea);
    }

    // Export QR code functionality
    function exportQRCode() {
      const canvas = document.getElementById('qrCanvas');
      const link = document.createElement('a');
      link.download = 'sharebin-qr-code.png';
      link.href = canvas.toDataURL();
      link.click();
      showNotification('QR code downloaded!', 'success');
    }

    // Initialize when page loads
    document.addEventListener('DOMContentLoaded', () => {
      const noteUrl = document.getElementById('noteUrl').value;
      const qrCanvas = document.getElementById('qrCanvas');
      const copyBtn = document.getElementById('copyUrlBtn');
      const exportBtn = document.getElementById('exportQrBtn');
      
      // Generate QR code
      generateQRCode(noteUrl, qrCanvas);
      
      // Copy URL button
      copyBtn.addEventListener('click', () => {
        copyToClipboard(noteUrl);
      });
      
      // Export QR code button
      exportBtn.addEventListener('click', exportQRCode);
      
      // Auto-select URL input on focus
      document.getElementById('noteUrl').addEventListener('focus', function() {
        this.select();
      });
    });
  </script>
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
