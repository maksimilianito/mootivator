# 🐮 Mootivator

A shell script that delivers random programming wisdom, jokes, and mantras in the style of the classic Unix `cowsay` command—but with a cow that truly *gets* programmers.

## What is this?

Mootivator is a fun CLI standalone sh script that returns ASCII art of a cow sharing tech humor, coding wisdom, or developer-friendly sayings. Perfect for:

- Adding to your `.zshrc` or `.bashrc` for daily terminal inspiration
- Spicing up your CI/CD pipelines
- Procrastinating productively
- Reminding yourself that all bugs are temporary

## Installation

1. Download the sh script source to your home folder:

```sh
curl -fsSL https://raw.githubusercontent.com/tzador/mootivator/refs/heads/main/mootivator.sh -o ~/.mootivator.sh
```

2. Add the following to your `~/.bashrc` or `~/.zshrc` (or any other)
to run on every terminal startup:

```sh
# Mootivator
sh ~/.mootivator.sh
```

You might also want to create a `moo` alias to trigger on demand,
just add the following to the same rc file.

```sh
alias moo="sh ~/.mootivator.sh"
```

3. Restart your terminal or bring a new one.

You'll should see something like something like:

```
 ------------------------------ 
( The future of software isn’t )
( no-code, it’s new-code.      )
 ------------------------------
       \
        \    \__/
         \   (oO)_________
          \ (_.._)        )\
           \_ U  ||---w-||  *
                _||    _||
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```


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

All the prases have been generated using ChatGPT 5, around 100 per category, 4200 in total.

## License

See [LICENSE](LICENSE) file for details.

---

*Remember: There are no bugs, only undocumented features. Now go forth and code!* 🐮
