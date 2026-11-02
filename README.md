# Deno Discord bot

A minimal bot scaffold wired for Yumekiseki. It answers `/ping`, stores a
per-guild counter, and is shaped so every `ymk` command works on it as-is.

## Quick start

```sh
ymk init            # or: gh repo create my-bot --template Yumekiseki/discord-bot-template-deno
ymk env pull        # writes .env.local
ymk dev             # runs locally against the real Discord, or the simulator
```

## What works out of the box

| Command | Notes |
|---|---|
| `ymk init` | Recognises `yumekiseki.json` and does not overwrite it |
| `ymk dev` | Derives every Deno `--allow-*` flag from `yumekiseki.json` |
| `ymk env pull` | Writes the declared names into `.env.local` |
| `ymk env diff` | Compares local names against the declared set |
| `ymk doctor` | Reports missing/mismatched keys by name |
| `ymk bot deploy` | Bundle + `--frozen` + `--cached-only` (D-223) |
| `ymk bot logs` | Streams journald lines as SSE |
| `ymk capture` | Records Discord fixtures for offline tests |

## Rules this scaffold follows

- `yumekiseki.json` is the single source of truth for declared env **names**
  and permission intent. Never add a permission the CLI cannot derive.
- Secrets are injected by the platform. Nothing here reads a value from disk
  except `.env.local`, which is gitignored.
- The entrypoint is `./src/main.ts` and everything it imports statically is
  part of the deployed bundle.
