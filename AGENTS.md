# Yumekiseki scaffold rules — `discord-bot-template-deno`

Read `../AGENTS.md` first. This file covers only what is specific to a scaffold.

## What this repo is

A starting point, not a product. It must run on a clean machine with **only
Deno and `ymk` installed** — no Docker, no Node, no Postgres.

## Compatibility with the CLI is the acceptance test

Every scaffold must survive this sequence, non-interactively, from a clean
clone. If a step fails, the fix is in the scaffold, not in the reader's patience.

```
ymk doctor          # clean
ymk env pull        # succeeds with a token set
ymk dev             # bot starts and answers /ping
ymk env diff        # no drift
ymk bot deploy      # builds and starts (stage 8+)
ymk bot logs        # streams
```

Add a rung to this list only when the CLI ships the command.

## Constraints

- **`yumekiseki.json` is authoritative.** Declared env names and permission
  intent live there; `ymk dev` derives `--allow-*` from it. Never hardcode a
  flag in a task script that the CLI would derive differently.
- **No network at import time.** Nothing may fetch during module load; the
  runtime uses `--cached-only` (D-223).
- **Static entrypoint.** `./src/main.ts` and its static imports are the bundle.
- **No secrets in the repo.** `.env.local` only, gitignored.
- **Apache-2.0**, no AGPL anywhere (D-032).

## When you change the scaffold

Bump the scaffold's own version and note the CLI version it was tested against.
A scaffold that only works with an unpublished CLI is a bug.
