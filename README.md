# flrbin

A pastebin for Markdown. Allows creation and sharing of Markdown instantly, and locking documents with edit codes.
Easily and freely self-hostable on Cloudflare Workers.


## TODO
### Core Features

- [x] add cloudflare worker and kv
- [x] edit history

### Future Roadmap (v2.0+)

#### 🚀 Modern Markdown Engine
- [ ] **Multi-Syntax Support**: Upgrade to micromark/remark ecosystem
  - [x] GitHub Flavored Markdown (GFM)
  - [ ] Math equations with micromark-extension-math (KaTeX/MathJax)
  - [ ] Mermaid diagrams support
  - [ ] MDX support for interactive components
  - [x] Definition lists, footnotes, and task lists
  - [ ] Custom syntax extensions (callouts, admonitions)
- [x] **Advanced Parser**: Replace marked.js with unified/remark
  - [x] AST-based processing for better extensibility
  - [x] Plugin ecosystem for custom transformations
  - [x] Better error handling and validation

#### 🔒 Security & Privacy
- [x] **Encryption Support**
  - [x] Client-side encryption with TweetNaCl
  - [x] Password-protected pastes with ChaCha20-Poly1305
  - [x] End-to-end encryption for sensitive content
  - [x] Key derivation using PBKDF2
- [ ] **Access Control**
  - [ ] View-only passwords (separate from edit codes)
  - [ ] Expiration dates with automatic cleanup
  - [ ] Rate limiting and abuse protection
  - [ ] IP-based access restrictions

#### ✨ Enhanced Editor Experience
- [ ] **Editor Interface**
  - [x] Enhanced CodeMirror with keyboard shortcuts
  - [x] Visual toolbar for common formatting
  - [x] Live preview with real-time updates
  - [ ] Block-based editing with drag & drop
  - [ ] Slash commands for quick formatting
- [ ] **Enhanced Preview**
  - [x] Real-time markdown rendering
  - [x] Support for all new features
  - [ ] Website-like rendering with custom themes
  - [ ] Print-friendly layouts
  - [ ] PDF export capabilities
  - [ ] Social media preview cards

#### 🎨 Modern UI/UX
- [ ] **Design System**
  - [x] Enhanced CSS with better typography and spacing
  - [x] Improved dark/light theme support
  - [x] Modern component styling
  - [ ] Consistent design language
  - [ ] Accessibility compliance (WCAG 2.1)
- [x] **Typography & Fonts**
  - [x] Improved font stacks and typography scales
  - [x] Better reading experience
  - [x] Enhanced code block styling


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
