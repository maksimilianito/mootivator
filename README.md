# 🐮 Mootivator

A Cloudflare Worker that delivers random programming wisdom, jokes, and mantras in the style of the classic Unix `cowsay` command—but with a cow that truly *gets* programmers.

## What is this?

Mootivator is a fun HTTP service that returns ASCII art of a cow sharing tech humor, coding wisdom, or developer-friendly sayings. Perfect for:

- Adding to your `.zshrc` or `.bashrc` for daily terminal inspiration
- Setting as your browser homepage for motivation every time you open a new tab
- Spicing up your CI/CD pipelines
- Procrastinating productively
- Reminding yourself that all bugs are temporary

## Usage

### 1. Quick Test

Simply make a request to the deployed worker:

```bash
curl https://mootivator.tzador.workers.dev
```

You'll get something like:

```
 ------------------------------------------------------------------
( Why do programmers prefer dark mode? Because light attracts bugs )
 ------------------------------------------------------------------
        \   \__/
         \  (oO)\_______
          \ (__)\\       )\\
           \_ U ||----W | *
               _||    _||
```

### 2. Add to Your Shell

Get a fresh dose of motivation every time you open your terminal!

**For Zsh users** (add to `~/.zshrc`):
```bash
curl -s https://mootivator.tzador.workers.dev
```

**For Bash users** (add to `~/.bashrc`):
```bash
curl -s https://mootivator.tzador.workers.dev
```

Then reload your shell:
```bash
source ~/.zshrc  # or source ~/.bashrc
```

### 3. Set as Browser Homepage

Make Mootivator your new tab page in Chrome:

1. Install the [New Tab Redirect](https://chromewebstore.google.com/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna?pli=1) extension
2. Configure the redirect URL to: `https://mootivator.tzador.workers.dev/`
3. Open a new tab and get inspired! 🐮

## Categories

The mootivator draws from **42 categories** of programming culture, including:

- 🤓 Programming jokes and puns
- 💪 Motivational hacker wisdom
- 🧘 Zen of programming
- ☕ Coffee & code
- 🐛 Debugging mantras
- 🔧 DevOps quips
- 🎯 Language-specific humor (JavaScript, Python, C++, Java)
- 🔐 Security sayings
- 🌩️ Cloud comedy
- 🗄️ Database jokes
- 🔀 Git wit
- 📝 Documentation digs
- 🧪 Testing truths
- 📚 And many more!

## Local Development

```bash
# Install dependencies
pnpm install

# Run locally
pnpm dev

# Deploy to Cloudflare Workers
pnpm run deploy
```

## How it Works

1. The worker loads phrases from 42+ pre-generated text files in `/data`
2. On each request, it randomly selects one phrase
3. It wraps the phrase in ASCII art featuring our beloved cow
4. Returns it as plain text (perfect for `curl` or browser viewing)

## Data Generation

The project includes a data generation script that uses AI to create new categories:

```bash
pnpm run data
```

Categories are defined in `categories.json` with prompts for generating themed content.

## Tech Stack

- **Cloudflare Workers** - Serverless edge computing
- **TypeScript** - Type-safe development
- **Wrangler** - Cloudflare Workers CLI

## License

See [LICENSE](LICENSE) file for details.

---

*Remember: There are no bugs, only undocumented features. Now go forth and code!* 🐮
