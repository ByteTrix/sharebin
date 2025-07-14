# ShareBin Project

## Project Overview

**ShareBin** is a modern, self-hostable Markdown pastebin service built for Cloudflare Workers. It allows users to create, share, and manage Markdown documents with advanced features like custom URLs, edit protection, and automatic cleanup in demo mode.

### Key Characteristics
- **Technology Stack**: Cloudflare Workers, KV Storage
- **Purpose**: Markdown document sharing
- **Deployment**: Cloudflare Workers (serverless)
- **Storage**: Cloudflare KV (key-value store)
- **Frontend**: Vanilla JavaScript with CodeMirror editor

## Architecture Overview

### Core Components

1. **Worker Handler** (`src/index.ts`)
   - Main entry point for HTTP requests
   - Handles routing and middleware
   - Processes scheduled events (cron jobs)

2. **Router** (`src/router.ts`)
   - Custom HTTP router implementation
   - Supports GET and POST methods
   - URL pattern matching with parameters

3. **Storage Layer** (`src/storage.ts`)
   - Abstraction over Cloudflare KV
   - Implements compression using lz-string
   - Handles paste CRUD operations

4. **Template Engine** (`src/templates.ts`)
   - Server-side HTML generation
   - Multiple page templates (home, paste, edit, delete, guide, error)
   - Responsive design with dark mode support

5. **Cron Jobs** (`src/cron.ts`)
   - Automatic cleanup for demo mode
   - Respects configurable cleanup intervals
   - Uses KV storage for state management

6. **Environment Configuration** (`src/env.ts`)
   - Type-safe environment variable handling
   - Default value management

### Data Model

```typescript
interface Paste {
  paste: string;      // Markdown content (compressed in storage)
  editCode?: string;  // Optional protection code
}
```

### Storage Strategy
- **Compression**: All paste content is compressed using lz-string before storage
- **Key Format**: Simple string IDs (auto-generated or custom)
- **Metadata**: Edit codes stored alongside content
- **Cleanup**: Special `__last_cleanup__` key tracks cleanup timestamps

## Features Deep Dive

### 1. Markdown Processing
- **Parser**: Uses `marked.js` library
- **Extensions**: Custom renderer for heading anchors
- **TOC Generation**: Automatic table of contents with `[[[TOC]]]` placeholder
- **XSS Protection**: Content sanitization using `xss` library

### 2. URL Management
- **Custom URLs**: Users can specify memorable URLs (3-40 characters)
- **Auto-generation**: Fallback to 6-character random IDs
- **Reserved URLs**: System routes like `/guide` are protected
- **Validation**: URL uniqueness checking

### 3. Edit Protection
- **Optional Codes**: Users can set edit codes for pastes
- **Access Control**: Edit/delete operations require correct codes
- **Public Mode**: Pastes without codes are publicly editable

### 4. User Interface
- **Editor**: CodeMirror with Markdown support
- **Themes**: Sublime theme integration
- **Preview**: Real-time Markdown rendering
- **Responsive**: Mobile-friendly design
- **Dark Mode**: Toggle with persistent preference

### 5. Demo Mode
- **Purpose**: Testing and demonstration
- **Auto-cleanup**: Configurable interval-based deletion
- **Warning UI**: Clear indication of temporary nature
- **Cron Jobs**: Cloudflare scheduled workers

## Configuration

### Environment Variables
```toml
[vars]
MODE = "prod" | "demo"           # Operating mode
DEMO_CLEAR_INTERVAL = "5"        # Cleanup interval in minutes (demo mode)

[[kv_namespaces]]
binding = "KV"                   # KV namespace binding
id = "your-kv-namespace-id"      # Production KV namespace
preview_id = "preview-kv-id"     # Development KV namespace
```

### Scheduled Events
```toml
[triggers]
crons = ["* * * * *"]            # Every minute (allows flexible cleanup intervals)
```

### Static Assets
```toml
[assets]
directory = "./static"           # Static file serving
```

## API Endpoints

### Public Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Home page with editor |
| GET | `/guide` | Markdown guide |
| GET | `/:id` | View paste |
| GET | `/:id/raw` | Raw paste content |
| GET | `/:id/edit` | Edit paste form |
| GET | `/:id/delete` | Delete confirmation |
| POST | `/save` | Create new paste |
| POST | `/:id/save` | Update existing paste |
| POST | `/:id/delete` | Delete paste |

### Development Routes
| Method | Path | Description |
|--------|------|-------------|
| GET | `/__scheduled` | Trigger cron (dev mode) |

## File Structure

```
ShareBin/
├── src/
│   ├── index.ts        # Main worker handler
│   ├── router.ts       # HTTP routing
│   ├── storage.ts      # KV storage abstraction
│   ├── templates.ts    # HTML templates
│   ├── cron.ts         # Scheduled cleanup
│   └── env.ts          # Environment configuration
├── static/
│   ├── codemirror.min.js     # Code editor
│   ├── cm-markdown.min.js    # Markdown mode
│   ├── cm-sublime.min.js     # Editor theme
│   ├── marked.min.js         # Markdown parser
│   ├── editor.js             # Custom editor logic
│   ├── theme-switch.js       # Dark mode toggle
│   ├── main.css              # Styles
│   ├── favicon.ico           # Site icon
│   └── guide.md              # User guide
├── wrangler.toml       # Cloudflare configuration
├── package.json        # Node.js dependencies
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

## Development Workflow

### Local Development
```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Test scheduled events
curl "http://localhost:8787/__scheduled?cron=*+*+*+*+*"
```

### Deployment
```bash
# Deploy to Cloudflare Workers
pnpm run deploy

# Create KV namespaces
pnpm run kv:create
```

## Security Considerations

### Input Validation
- URL length limits (3-40 characters)
- Edit code requirements (3-40 characters)
- XSS protection on rendered content

### Access Control
- Edit codes for paste protection
- No authentication system (by design)
- Rate limiting relies on Cloudflare

### Data Protection
- Content compression reduces storage costs
- No personal data collection
- Automatic cleanup in demo mode

## Performance Optimizations

### Storage
- **Compression**: lz-string reduces KV storage usage
- **Caching**: Cloudflare edge caching for static assets
- **Minimal State**: Stateless design for horizontal scaling

### Frontend
- **CDN Delivery**: Static assets from Cloudflare edge
- **Minified Libraries**: Compressed JavaScript libraries
- **Progressive Enhancement**: Works without JavaScript

## Troubleshooting Common Issues

### 1. Cron Jobs Not Running
- Verify `triggers.crons` in wrangler.toml
- Check `MODE` environment variable
- Use `/__scheduled` endpoint for testing

### 2. KV Storage Issues
- Confirm namespace IDs in wrangler.toml
- Check Cloudflare dashboard for KV namespace existence
- Verify permissions and quotas

### 3. Static Assets Not Loading
- Ensure `[assets]` configuration is correct
- Check file paths in static directory
- Verify Cloudflare Workers assets feature is enabled


## Future Development
 check README.md for todo list