# flrbin Roadmap

## Core Features
- [x] Cloudflare Worker and KV storage
- [x] Edit history and revisions

## Future Roadmap (v2.0+)

### 🚀 Modern Markdown Engine
- [ ] **Multi-Syntax Support**:
  - [x] GitHub Flavored Markdown (GFM)
  - [ ] Add copy button to code block
  - [ ] Math equations (KaTeX/MathJax)
  - [ ] Mermaid diagrams support
  - [ ] MDX support for interactive components
  - [x] Definition lists, footnotes, and task lists
  - [ ] Custom syntax extensions (callouts, admonitions)
- [x] **Advanced Parser**: Replace marked.js with unified/remark
  - [x] AST-based processing for better extensibility
  - [x] Plugin ecosystem for custom transformations
  - [x] Better error handling and validation

### 🔒 Security & Privacy
- [x] **Encryption Support**
  - [x] Server-side encryption with AES-256-GCM
  - [x] Password-protected pastes with industry-standard encryption
  - [x] Secure key derivation using PBKDF2 (100,000 iterations)
  - [x] Zero-knowledge architecture - passwords never stored
- [ ] **Access Control**
  - [ ] View-only passwords (separate from edit codes)
  - [ ] Expiration dates with automatic cleanup
  - [ ] Rate limiting and abuse protection
  - [ ] IP-based access restrictions

### ✨ Enhanced Editor Experience
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

### 🎨 Modern UI/UX
- [ ] **Design System**
  - [x] Enhanced CSS with better typography and spacing
  - [x] Improved dark/light theme support
  - [x] Modern component styling
  - [x] Consistent design language
  - [ ] Accessibility compliance (WCAG 2.1)
- [x] **Typography & Fonts**
  - [x] Improved font stacks and typography scales
  - [x] Better reading experience
  - [x] Enhanced code block styling

### 🏗️ Infrastructure
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
