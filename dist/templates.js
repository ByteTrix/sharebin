const _if = (condition, template) => (condition ? template : '');
const Tabs = () => `
  <div class="tab-container">
    <input type="radio" name="tabs" id="tab1" class="tab-input" checked />
    <label class="tab" for="tab1">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
      Editor
    </label>
    <input type="radio" name="tabs" id="tab2" class="tab-input" />
    <label class="tab" for="tab2">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
      Preview
    </label>
    <small id="characterCount" aria-live="polite"></small>
  </div>
`;
const Editor = (paste = '') => `
  <div id="editor-container">
    <textarea id="pasteTextArea" name="paste" required>${paste}</textarea>
    <div id="editor"></div>
  </div>

  <div id="preview-container">
  </div>
`;
const layout = (title, content, mode) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="A modern, fast, and secure Markdown pastebin">
    <meta name="theme-color" content="#8b5cf6">
    <meta name="color-scheme" content="dark light">
    
    <!-- Preload critical fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="/codemirror.min.css">
    <link rel="stylesheet" href="/highlight-unified.css">
    <link rel="stylesheet" href="/main.css">
    
    <!-- Favicon -->
    <link rel="icon" href="/favicon.ico" sizes="any">
    
    <title>${title ? `${title} - flrbin` : 'flrbin - Modern Markdown Pastebin'}</title>
  </head>
  <body>
    <!-- Theme Toggle -->
    <div class="dark-mode-container">
      <input style="display: none;" type="checkbox" id="darkSwitch" aria-label="Toggle dark mode" />
      <label class="dark-mode-btn" for="darkSwitch" title="Toggle theme">
        <span style="display: none;">�</span>
        <span>🌞</span>
      </label>
    </div>

    ${_if(mode === 'demo', `
      <div role="alert" class="demo-alert">
        <strong>⚠️ Demo Instance</strong>
        <p>This is a demonstration. Posts will be automatically deleted every few minutes.</p>
        <p>For permanent storage, please deploy your own instance.</p>
      </div>
    `)}

    ${content}
    
    <footer>
      <hr />
      <nav class="footer-links" aria-label="Footer navigation">
        <a href="/" aria-label="Create new paste">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="12" y1="18" x2="12" y2="12"/>
            <line x1="9" y1="15" x2="15" y2="15"/>
          </svg>
          New
        </a>
        <a href="/guide" aria-label="View documentation">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          Guide
        </a>
        <a href="https://github.com/kevinfiol/flrbin" target="_blank" rel="noopener noreferrer" aria-label="View source code">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
          Source
        </a>
      </nav>
    </footer>
    
    <!-- Scripts -->
    <script src="/theme-switch.js"></script>
  </body>
  </html>
`;
export const homePage = ({ paste = '', url = '', errors = { url: '' }, mode = '', } = {}) => layout('', `
  <main>
    <header style="text-align: center; margin: 3rem 0;">
      <h1 style="background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 1rem;">
        ✏️ flrbin
      </h1>
      <p style="font-size: var(--text-lg); color: var(--text-secondary); max-width: 600px; margin: 0 auto;">
        A modern, fast, and secure Markdown pastebin. Share your thoughts, code, and documentation with ease.
      </p>
    </header>

    ${Tabs()}

    <form id="editor-form" method="post" action="/save" novalidate>
      ${Editor(paste)}

      <div class="input-group">
        <div>
          <label for="url-input" style="display: block; font-weight: 500; margin-bottom: var(--space-2); color: var(--text-secondary);">
            Custom URL (optional)
          </label>
          <input
            id="url-input"
            name="url"
            type="text"
            placeholder="my-awesome-paste"
            minlength="3"
            maxlength="40"
            value="${url}"
            pattern=".*\\S+.*"
            aria-invalid="${Boolean(errors.url)}"
            aria-describedby="url-help${errors.url ? ' url-error' : ''}"
          />
          <small id="url-help" style="color: var(--text-tertiary); font-size: var(--text-xs); margin-top: var(--space-1); display: block;">
            3-40 characters, letters, numbers, and hyphens allowed
          </small>
          ${_if(errors.url, `
            <small class="error" id="url-error">${errors.url}</small>
          `)}
        </div>
        <div>
          <label for="editcode-input" style="display: block; font-weight: 500; margin-bottom: var(--space-2); color: var(--text-secondary);">
            Edit Code (optional)
          </label>
          <input
            id="editcode-input"
            name="editcode"
            type="text"
            placeholder="secret-edit-code"
            minlength="3"
            maxlength="40"
            aria-describedby="editcode-help"
          />
          <small id="editcode-help" style="color: var(--text-tertiary); font-size: var(--text-xs); margin-top: var(--space-1); display: block;">
            Protect your paste from unauthorized edits
          </small>
        </div>
      </div>

      <div class="button-group">
        <button type="submit">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17,21 17,13 7,13 7,21"/>
            <polyline points="7,3 7,8 15,8"/>
          </svg>
          Save Paste
        </button>
        <button type="button" id="clear-btn" class="btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3,6 5,6 21,6"/>
            <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
            <line x1="10" y1="11" x2="10" y2="17"/>
            <line x1="14" y1="11" x2="14" y2="17"/>
          </svg>
          Clear
        </button>
      </div>
    </form>
  </main>
  <script src="/marked.min.js"></script>
  <script src="/codemirror.min.js"></script>
  <script src="/cm-markdown.min.js"></script>
  <script src="/cm-sublime.min.js"></script>
  <script src="/editor.js"></script>
`, mode);
export const pastePage = ({ id = '', html = '', title = '', mode = '' } = {}) => layout(title, `
  <main>
    <header style="margin-bottom: var(--space-6); padding-bottom: var(--space-4); border-bottom: 1px solid var(--border-primary);">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4);">
        <div>
          <h1 style="font-size: var(--text-2xl); margin: 0; font-family: var(--font-mono); color: var(--accent-primary);">
            ${id}
          </h1>
          ${title ? `<p style="margin: var(--space-2) 0 0; color: var(--text-secondary);">${title}</p>` : ''}
        </div>
        <div class="button-group" style="margin: 0;">
          <a class="btn btn-secondary" href="/${id}/raw" title="View raw markdown">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
            Raw
          </a>
          <a class="btn" href="/${id}/edit" title="Edit this paste">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit
          </a>
          <a class="btn btn-danger" href="/${id}/delete" title="Delete this paste">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3,6 5,6 21,6"/>
              <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
            Delete
          </a>
        </div>
      </div>
    </header>
    
    <article class="paste-container" role="main">
      ${html}
    </article>
  </main>
`, mode);
export const guidePage = ({ html = '', title = '', mode = '' } = {}) => layout(title, `
  <main>
    <div class="paste-container">
      ${html}
    </div>
  </main>
`, mode);
export const editPage = ({ id = '', paste = '', hasEditCode = false, errors = { editCode: '' }, mode = '' } = {}) => layout(`Edit ${id}`, `
  <main>
    <header style="margin-bottom: var(--space-6); padding-bottom: var(--space-4); border-bottom: 1px solid var(--border-primary);">
      <h1 style="display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-2xl); margin: 0;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
        Editing <code style="font-family: var(--font-mono); color: var(--accent-primary);">${id}</code>
      </h1>
      <p style="margin: var(--space-2) 0 0; color: var(--text-secondary);">
        Make your changes and save to update this paste.
      </p>
    </header>

    ${Tabs()}

    <form id="editor-form" method="post" action="/${id}/save" novalidate>
      ${Editor(paste)}

      <input class="display-none" name="url" type="text" value="${id}" disabled />
      
      ${_if(hasEditCode, `
        <div class="input-group">
          <div>
            <label for="editcode-input" style="display: block; font-weight: 500; margin-bottom: var(--space-2); color: var(--text-secondary);">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <circle cx="12" cy="16" r="1"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Edit Code Required
            </label>
            <input
              id="editcode-input"
              name="editcode"
              type="password"
              placeholder="Enter your edit code to save changes"
              minlength="3"
              maxlength="40"
              required
              aria-invalid="${Boolean(errors.editCode)}"
              ${_if(errors.editCode, 'aria-describedby="editcode-error"')}
            />
            <small style="color: var(--text-tertiary); font-size: var(--text-xs); margin-top: var(--space-1); display: block;">
              This paste is protected. You need the edit code to save changes.
            </small>
            ${_if(errors.editCode, `
              <small class="error" id="editcode-error">${errors.editCode}</small>
            `)}
          </div>
        </div>
      `)}

      <div class="button-group">
        <button type="submit">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17,21 17,13 7,13 7,21"/>
            <polyline points="7,3 7,8 15,8"/>
          </svg>
          Save Changes
        </button>
        <a class="btn btn-secondary" href="/${id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18"/>
            <path d="M6 6L18 18"/>
          </svg>
          Cancel
        </a>
      </div>
    </form>
  </main>
  <script src="/marked.min.js"></script>
  <script src="/codemirror.min.js"></script>
  <script src="/cm-markdown.min.js"></script>
  <script src="/cm-sublime.min.js"></script>
  <script src="/editor.js"></script>
`, mode);
export const deletePage = ({ id = '', hasEditCode = false, errors = { editCode: '' }, mode = '' } = {}) => layout(`Delete ${id}`, `
  <main>
    <div class="delete-confirmation">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--error)" stroke-width="2" style="margin: 0 auto var(--space-4);">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
      
      <em>Are you sure you want to permanently delete this paste?</em>
      <strong>${id}</strong>
      
      <p style="margin-top: var(--space-4); color: var(--text-tertiary); font-size: var(--text-sm);">
        This action cannot be undone. The paste and all its content will be permanently removed.
      </p>
    </div>
    
    <form method="post" action="/${id}/delete">
      ${_if(hasEditCode, `
        <div class="input-group">
          <div>
            <label for="editcode-input" style="display: block; font-weight: 500; margin-bottom: var(--space-2); color: var(--text-secondary);">
              Edit Code Required
            </label>
            <input
              id="editcode-input"
              name="editcode"
              type="password"
              placeholder="Enter edit code to confirm deletion"
              minlength="3"
              maxlength="40"
              required
              aria-invalid="${Boolean(errors.editCode)}"
              ${_if(errors.editCode, 'aria-describedby="editcode-error"')}
              style="text-align: center;"
            />
            ${_if(errors.editCode, `
              <small class="error" id="editcode-error">${errors.editCode}</small>
            `)}
          </div>
        </div>
      `)}

      <div class="button-group">
        <button type="submit" class="btn-danger">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3,6 5,6 21,6"/>
            <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
            <line x1="10" y1="11" x2="10" y2="17"/>
            <line x1="14" y1="11" x2="14" y2="17"/>
          </svg>
          Confirm Delete
        </button>

        <a class="btn btn-secondary" href="/${id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18"/>
            <path d="M6 6L18 18"/>
          </svg>
          Cancel
        </a>
      </div>
    </form>
  </main>
`, mode);
export const errorPage = (mode = '') => layout('404 - Not Found', `
  <main style="text-align: center; padding: var(--space-20) 0;">
    <div style="max-width: 500px; margin: 0 auto;">
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="1" style="margin-bottom: var(--space-6); opacity: 0.5;">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
      
      <h1 style="font-size: var(--text-5xl); margin-bottom: var(--space-4); color: var(--text-primary);">
        404
      </h1>
      
      <p style="font-size: var(--text-xl); margin-bottom: var(--space-2); color: var(--text-secondary);">
        Paste not found
      </p>
      
      <p style="color: var(--text-tertiary); margin-bottom: var(--space-8);">
        The paste you're looking for doesn't exist or may have been deleted.
      </p>
      
      <div class="button-group" style="justify-content: center;">
        <a class="btn" href="/">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9L12 2L21 9V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
          Go Home
        </a>
        <a class="btn btn-secondary" href="/guide">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          View Guide
        </a>
      </div>
    </div>
  </main>
`, mode);
