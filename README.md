# ShareBin 🔥

**A secure, self-hostable pastebin for Markdown content with enterprise-grade encryption.**

## The Story 📖

So there I was, needing to give my friend a proper telling-off. But WhatsApp? Instagram? Too mainstream. I wanted something with *class*. Something that says "I'm so mad at you that I encrypted my anger with military-grade security."

I found [mdbin](https://github.com/kevinfiol/mdbin) - a nice open-source pastebin - but it wasn't fancy enough for my revenge plot. So I:

1. **Stole it** (legally, it's open source)
2. **Improved it** with my own evil genius
3. **Moved it to Cloudflare Workers** (because I'm already there for my other schemes)
4. **Added encryption** so secure that even the Intelligence Bureau (IB) would be impressed
5. **Finally delivered the roast** with password-protected, PBKDF2-secured curse words

Mission accomplished. Friend properly scolded. Relief achieved. 🎯

---

## Features ✨

- **AES-256-GCM encryption** – Your secrets are safer than your browser history.
- **PBKDF2 password protection** – Because brute force is for gym, not for pastes.
- **Zero-knowledge architecture** – Not even the server knows your drama.
- **Custom URLs** – Make your roast memorable: `/why-you-suck`.
- **GitHub Flavored Markdown** – Tables, code, lists, and more.
- **Live preview & syntax highlighting** – See your masterpiece as you type.
- **Revision history** – Undo your regrets, one version at a time.
- **Edit protection** – Only those with the code can edit.
- **Attachment support** – Share files, because sometimes words aren’t enough.
- **One-time view option** – For messages that self-destruct like your patience.
- **Dark/Light themes** – For every mood swing.
- **Responsive design** – Looks good on any device, even your smart fridge.
- **Keyboard shortcuts** – Because efficiency is next to roastiness.

---

## Quick Start 🚀

1. **Clone the repo:**
   ```bash
   git clone https://github.com/kvnlab/ShareBin.git
   cd ShareBin
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Cloudflare:**
   ```bash
   cp wrangler.example.toml wrangler.toml
   # Edit wrangler.toml with your Cloudflare details
   ```

4. **Create a KV namespace:**
   ```bash
   pnpm wrangler kv:namespace create PASTE_BIN
   ```

5. **Deploy:**
   ```bash
   pnpm run deploy
   ```

6. **Paste, encrypt, and roast away!**

---

## Usage Examples 💡

- **Basic Paste:** Write Markdown, hit save, share the link.
- **Encrypted Paste:** Check "Encrypt", set a password, send the link. Watch them struggle.
- **One-Time View:** Enable self-destruct for maximum drama.
- **Attachments:** Add files to your paste—because screenshots speak louder than words.

---

## Tech Stack 🛠️

- **Frontend:** Vanilla JS, custom CSS
- **Backend:** Cloudflare Workers
- **Storage:** Cloudflare KV
- **Encryption:** Web Crypto API (AES-256-GCM)
- **Markdown:** Unified/Remark ecosystem

---

## Contributing 🤝

Found a bug? Want to add more ways to roast people? PRs welcome! Just remember: this started as a way to properly scold someone. Keep that energy.

---

## License 📄

MIT – free and open source.

---

## Inspired By 💡

- [mdbin](https://github.com/kevinfiol/mdbin)
- My friend's poor life choices
- Military-grade encryption
- Pure spite

---

*"Sometimes the best way to tell someone they messed up is with properly formatted Markdown and enterprise-level security."* – Ancient Wisdom (probably)

---

## See Also 📚

- [`ROADMAP.md`](./ROADMAP.md)
- API docs: (coming soon, or ask nicely)
- Deployment guide: (coming soon, or bribe with snacks)
