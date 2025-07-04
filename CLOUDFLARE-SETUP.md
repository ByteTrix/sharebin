# Quick Setup Guide for Cloudflare Workers

## ✅ Conversion Complete!

Your Deno project has been successfully converted to Cloudflare Workers. Here's what was changed:

### 🔄 Key Changes Made

1. **Package Structure**: 
   - Created `src/` directory with converted TypeScript files
   - Added `package.json` with Cloudflare Workers dependencies
   - Added `wrangler.toml` configuration file
   - Added `tsconfig.json` for TypeScript compilation

2. **Storage**: 
   - Converted Deno KV to Cloudflare KV
   - Updated storage interface to work with Cloudflare KV API

3. **Routing**: 
   - Replaced URLPattern with custom router (Cloudflare Workers doesn't support URLPattern yet)
   - Maintained same route structure and functionality

4. **Environment**: 
   - Converted to Cloudflare Workers environment variables
   - Updated environment loading

5. **Cron Jobs**: 
   - Converted Deno.cron to Cloudflare Scheduled Workers
   - Configured in wrangler.toml

## 🚀 Next Steps

### 1. Install Dependencies
```powershell
pnpm install
```

### 2. Install Wrangler CLI (if not already installed)
```powershell
pnpm add -g wrangler
```

### 3. Login to Cloudflare
```powershell
wrangler auth login
```

### 4. Create KV Namespaces
```powershell
pnpm kv:create
```
This will output namespace IDs that you need to copy into `wrangler.toml`.

### 5. Update wrangler.toml
Replace `your-kv-namespace-id` and `your-preview-kv-namespace-id` with the actual IDs from step 4.

### 6. Handle Static Files
Static files need to be served separately. Options:
- Use Cloudflare Pages
- Upload to R2 storage
- Use external CDN

Update the template file URLs accordingly.

### 7. Deploy
```powershell
pnpm deploy
```

Or use the automated script:
```powershell
pnpm setup
```

## 📁 File Structure
```
├── src/               # Source code
│   ├── index.ts       # Main worker entry point
│   ├── router.ts      # Custom router
│   ├── storage.ts     # Cloudflare KV storage
│   ├── env.ts         # Environment configuration
│   ├── cron.ts        # Scheduled worker
│   └── templates.ts   # HTML templates
├── static/            # Static files (serve separately)
├── package.json       # Node.js dependencies
├── pnpm-lock.yaml     # pnpm lockfile
├── wrangler.toml      # Cloudflare Workers config
├── tsconfig.json      # TypeScript config
└── deploy.ps1         # Deployment script
```

## 🔧 Configuration

### Environment Variables
Set in `wrangler.toml` under `[vars]`:
- `MODE`: "prod" or "demo"
- `DEMO_CLEAR_INTERVAL`: Cleanup interval in minutes

### KV Storage
Configure your KV namespace binding in `wrangler.toml`.

### Scheduled Workers
Modify the cron schedule in `wrangler.toml` under `[triggers]`.

## 🆘 Troubleshooting

1. **Static files not loading**: Set up separate hosting for static files
2. **KV errors**: Ensure namespace IDs are correct in wrangler.toml
3. **Build errors**: Run `pnpm build` to check TypeScript compilation
4. **Deploy errors**: Check you're logged in with `wrangler auth whoami`

## 📚 Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Cloudflare KV Documentation](https://developers.cloudflare.com/workers/runtime-apis/kv/)

Your project **flrbin** is now ready for Cloudflare Workers! 🎉
