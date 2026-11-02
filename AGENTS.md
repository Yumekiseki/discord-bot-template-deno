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
ymk dev             # fetches env, starts against real Discord, answers /ping
ymk bot test        # hosted run against the simulator
ymk env pull        # writes .env.local (editors only)
ymk env diff        # no drift
ymk bot deploy      # builds and starts (stage 8+)
ymk bot logs        # streams
```

There is no local simulator and no mock mode in `ymk dev` — simulated runs are
hosted only (D-297, D-298). Do not add a `--simulate` flag or a local mock
dependency to this scaffold.

Add a rung to this list only when the CLI ships the command.

## `yumekiseki.json` — two fields, no exceptions

```json
{ "project": "proj_abc", "entrypoint": "./src/main.ts" }
```

- **Never add a permissions block.** The platform owns the permission policy,
  and the CLI applies it identically for `ymk dev` and hosted runs (D-292).
  A permissions list in this file would be a security hole: a customer could
  edit their own sandbox.
- **Never add env names.** The platform assigns them; the CLI fetches names and
  values together (D-293).
- Unknown keys are rejected by the CLI, so adding one does not help anyway.

## Constraints

- **No network at import time.** Nothing may fetch during module load; the
  runtime uses `--cached-only` (D-223).
- **Static entrypoint.** `./src/main.ts` and its static imports are the bundle.
- **No secrets in the repo.** `.env.local` only, gitignored.
- **Apache-2.0**, no AGPL anywhere (D-032).

## When you change the scaffold

Bump the scaffold's own version and note the `ymk` version it was tested
against. A scaffold that only works with an unpublished CLI is a bug.
