# flrbin

A pastebin for Markdown. Allows creation and sharing of Markdown instantly, and locking documents with edit codes.
Easily and freely self-hostable on Cloudflare Workers.


## TODO
### Core Features

- [x] edit history

### Future Roadmap (v2.0+)

#### 🚀 Modern Markdown Engine
- [ ] **Multi-Syntax Support**: Upgrade to micromark/remark ecosystem
  - [ ] GitHub Flavored Markdown (GFM) with micromark-extension-gfm
  - [ ] Math equations with micromark-extension-math (KaTeX/MathJax)
  - [ ] Mermaid diagrams support
  - [ ] MDX support for interactive components
  - [ ] Definition lists, footnotes, and task lists
  - [ ] Custom syntax extensions (callouts, admonitions)
- [ ] **Advanced Parser**: Replace marked.js with unified/remark
  - [ ] AST-based processing for better extensibility
  - [ ] Plugin ecosystem for custom transformations
  - [ ] Better error handling and validation

#### 🔒 Security & Privacy
- [ ] **Encryption Support**
  - [ ] Client-side encryption with libsodium.js/TweetNaCl
  - [ ] Password-protected pastes with ChaCha20-Poly1305
  - [ ] End-to-end encryption for sensitive content
  - [ ] Key derivation using scrypt/argon2
- [ ] **Access Control**
  - [ ] View-only passwords (separate from edit codes)
  - [ ] Expiration dates with automatic cleanup
  - [ ] Rate limiting and abuse protection
  - [ ] IP-based access restrictions

#### ✨ Enhanced Editor Experience
- [ ] **Editor Interface**
  - [ ] Replace CodeMirror with modern alternatives:
    - [ ] Lexical (Meta's extensible editor framework)
    - [ ] TipTap (ProseMirror-based WYSIWYG)
    - [ ] Monaco Editor integration option
  - [ ] Block-based editing with drag & drop
  - [ ] Slash commands for quick formatting
- [ ] **Notion-like Rich Preview**
  - [ ] Website-like rendering with custom themes
  - [ ] Print-friendly layouts
  - [ ] PDF export capabilities
  - [ ] Social media preview cards

#### 🎨 Modern UI/UX
- [ ] **Design System**
  - [ ] Component-based architecture (React/Vue/Svelte)
  - [ ] Tailwind CSS or styled-components
  - [ ] Consistent design language
  - [ ] Accessibility compliance (WCAG 2.1)
- [ ] **Typography & Fonts**
  - [ ] Inter, Source Sans Pro, or custom font stacks
  - [ ] Proper typographic scales
  - [ ] Reading mode optimizations
  - [ ] Variable font support

#### ⚡ Modern Tech Stack
- [ ] **Frontend Modernization**
  - [ ] TypeScript throughout
  - [ ] Vite or esbuild for fast builds
  - [ ] Modern bundling with tree-shaking
  - [ ] Progressive Web App (PWA) features
- [ ] **Backend Improvements**
  - [ ] Cloudflare Durable Objects for real-time features
  - [ ] WebSockets for live collaboration
  - [ ] GraphQL API option
  - [ ] Rust/Wasm modules for performance-critical operations


#### 🏗️ Infrastructure
- [ ] **Self-hosting Options**
  - [ ] Docker Compose setup
  - [ ] Kubernetes manifests
  - [ ] SQLite + file storage backend
  - [ ] PostgreSQL option for larger deployments
- [ ] **Performance**
  - [ ] CDN integration for global speed
  - [ ] Image optimization and hosting
  - [ ] Lazy loading for large documents
  - [ ] Service workers for offline functionality
