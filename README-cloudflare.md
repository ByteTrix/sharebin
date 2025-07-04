# flrbin - Cloudflare Workers Edition

A simple markdown pastebin service running on Cloudflare Workers with KV storage.

## Features

- Markdown rendering with syntax highlighting
- Custom URLs for pastes
- Edit and delete functionality with optional edit codes
- Table of contents generation
- Dark mode toggle
- Demo mode with automatic cleanup

## Setup

### Prerequisites

- Node.js 18+ 
- pnpm
- Cloudflare account
- Wrangler CLI

### Installation

1. Install dependencies:
```powershell
pnpm install
```

2. Install Wrangler globally (if not already installed):
```powershell
pnpm add -g wrangler
```

3. Login to Cloudflare:
```powershell
wrangler auth login
```

4. Create a KV namespace:
```powershell
wrangler kv:namespace create "KV"
wrangler kv:namespace create "KV" --preview
```

5. Update `wrangler.toml` with your KV namespace IDs from the previous step.

6. Deploy static assets:
```powershell
# Upload static files to KV or use Cloudflare Pages for static hosting
# For now, you can serve static files from a separate domain or CDN
```

### Development

Run the development server:
```powershell
pnpm dev
```

### Deployment

Deploy to Cloudflare Workers:
```powershell
pnpm deploy
```

## Configuration

### Environment Variables

Set these in `wrangler.toml` under `[vars]`:

- `MODE`: Set to "demo" for automatic cleanup, "prod" for production
- `DEMO_CLEAR_INTERVAL`: Cleanup interval in minutes (only used in demo mode)

### Scheduled Workers

The cron job runs every 5 minutes in demo mode to clear the KV store. You can modify the schedule in `wrangler.toml` under `[triggers]`.

## Static Files

Static files (CSS, JS) need to be served separately since Cloudflare Workers don't serve static files directly. Options:

1. Use Cloudflare Pages to serve static files
2. Upload static files to R2 or another CDN
3. Serve from a separate subdomain

Update the template files to point to your static file URLs.

## Differences from Deno Version

- Uses Cloudflare KV instead of Deno KV
- Static file serving handled separately
- Uses Cloudflare Workers APIs instead of Deno APIs
- Scheduled cleanup uses Cloudflare Cron Triggers instead of Deno.cron
- Package management via pnpm instead of Deno imports

## License

MIT License
