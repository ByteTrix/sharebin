# flrbin 🔥

**A secure, self-hostable pastebin for Markdown content with enterprise-grade encryption.**

A modern pastebin built for developers and teams who need to share Markdown content securely. Features custom URLs, password protection with AES-256-GCM encryption, and seamless deployment on Cloudflare Workers.

## The Story 📖

So there I was, needing to give my friend a proper telling-off. But WhatsApp? Instagram? Too mainstream. I wanted something with *class*. Something that says "I'm so mad at you that I encrypted my anger with military-grade security."

I found [mdbin](https://github.com/kevinfiol/mdbin) - a nice open-source pastebin - but it wasn't fancy enough for my revenge plot. So I:

1. **Stole it** (legally, it's open source)
2. **Improved it** with my own evil genius
3. **Moved it to Cloudflare Workers** (because I'm already there for my other schemes)
4. **Added encryption** so secure that even the Intelligence Bureau (IB) would be impressed
5. **Finally delivered the roast** with password-protected, PBKDF2-secured curse words

Mission accomplished. Friend properly scolded. Relief achieved. 🎯

## What Makes This Special ✨

### 🔒 Military-Grade Roasting
- **AES-256-GCM encryption** - Your insults deserve enterprise security
- **PBKDF2 with 100,000 iterations** - Because your anger should be computationally expensive
- **Zero-knowledge architecture** - Even the server doesn't know how mean you are
- **Custom URLs** - `yoursite.com/why-you-suck` hits different than a random ID

### 📝 Advanced Markdown Support
- **GitHub Flavored Markdown** - Complete GFM compatibility
- **Live preview** - Real-time rendering as you type
- **Syntax highlighting** - Code blocks with proper highlighting
- **Rich formatting** - Tables, task lists, footnotes, and more

### ⚡ Modern Infrastructure
- **Cloudflare Workers** - Global edge deployment for maximum performance
- **KV storage** - Distributed, persistent storage across the globe
- **Edit protection** - Secure edit codes to prevent unauthorized changes
- **Revision history** - Track and restore previous versions

### 🎨 Professional Interface
- **Dark/Light themes** - Adaptive design for any environment
- **Responsive design** - Works perfectly on desktop and mobile
- **Keyboard shortcuts** - Efficient workflow for power users
- **Clean typography** - Optimized for readability and focus

## Quick Start 🚀

1. **Clone this masterpiece:**
   ```bash
   git clone https://github.com/kvnlab/flrbin.git
   cd flrbin
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up Cloudflare:**
   ```bash
   # Copy the config
   cp wrangler.example.toml wrangler.toml
   # Edit with your details
   ```

4. **Create a KV namespace:**
   ```bash
   pnpm wrangler kv:namespace create PASTE_BIN
   ```

5. **Deploy your revenge platform:**
   ```bash
   pnpm run deploy
   ```

6. **Start roasting with style! 🔥**

## Usage Examples 💡

### Basic Angry Message
```markdown
# Dear [Friend's Name]

You really messed up this time. Let me count the ways:

1. That thing you did yesterday
2. The way you ate my sandwich
3. Your terrible taste in movies

Sincerely,
Your very disappointed friend
```

### Advanced Encrypted Roast
1. Check "Encrypt this paste"
2. Set password: `you-know-what-you-did`
3. Write your encrypted fury
4. Send them the link
5. Watch them struggle with the password 😏

### Professional Complaint
```markdown
## Performance Review: Your Life Choices

### Areas for Improvement
- [ ] Stop being wrong about everything
- [ ] Learn to admit when you're wrong
- [ ] Actually listen when people talk

### Recommendations
Please see attached 47-page analysis of your poor decisions.
```

## Tech Stack 🛠️

- **Frontend**: Vanilla JS (because sometimes simple is better)
- **Backend**: Cloudflare Workers (serverless scolding)
- **Storage**: Cloudflare KV (persistent grudges)
- **Encryption**: Web Crypto API with AES-256-GCM
- **Markdown**: Unified/Remark ecosystem
- **Styling**: Custom CSS (rage-themed)

## Contributing 🤝

Found a bug? Want to add more ways to roast people? PRs welcome!

Just remember: this started as a way to properly scold someone. Keep that energy.

## License 📄

MIT - Because anger should be free and open source.

## Inspired By 💡

- [mdbin](https://github.com/kevinfiol/mdbin) - The original genius
- My friend's poor life choices - The motivation
- Military-grade encryption - The overkill solution
- Pure spite - The driving force

---

*"Sometimes the best way to tell someone they messed up is with properly formatted Markdown and enterprise-level security."* - Ancient Wisdom (probably)

## See Also 📚

- [ROADMAP.md](./ROADMAP.md) - Future plans for even fancier roasting
- [API Documentation](./docs/API.md) - For programmatic complaints
- [Deployment Guide](./docs/DEPLOYMENT.md) - Host your own judgment platform
