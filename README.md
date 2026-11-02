# Deno Discord bot

A minimal bot scaffold for Yumekiseki. It answers `/ping` and stores a
per-guild counter. Every `ymk` command works on it unmodified.

## Quick start

```sh
ymk init                    # or: gh repo create my-bot --template Yumekiseki/discord-bot-template-deno
# set "project" in yumekiseki.json to your project id
ymk dev                     # fetches env, injects it, runs the bot
```

## `yumekiseki.json`

Two fields. That is the whole file.

```json
{ "project": "proj_abc", "entrypoint": "./src/main.ts" }
```

- `project` — which project this bot belongs to. `ymk init` leaves a placeholder.
- `entrypoint` — the file `ymk dev` and the hosted runtime execute.

**Permissions do not live here.** `ymk dev` and the hosted runtime apply the
same platform-owned policy, so editing a file in this repo cannot give the bot
more filesystem, network, or environment access than the platform grants it.

## Where secrets come from

`ymk dev` fetches them from the API on every run and injects them into the bot
process. Nothing is written to disk, so a rotated token is never stale.

Need the values in an editor? `ymk env pull` writes `.env.local` for that
purpose. `ymk dev` does not read it.

## What works out of the box

| Command | Notes |
|---|---|
| `ymk init` | Copies the scaffold; leaves `project` for you to set |
| `ymk dev` | Fetches env, applies platform permissions, runs the bot |
| `ymk bot test` | Hosted run against the simulator — the only simulated path |
| `ymk env pull` | Writes `.env.local` for editors |
| `ymk env diff` | Compares local file against the platform's set |
| `ymk doctor` | Reports missing/mismatched keys by name |
| `ymk bot deploy` | Bundles with `--frozen --cached-only` (D-223) |
| `ymk bot logs` | Streams journald lines as SSE |
| `ymk capture` | Records Discord fixtures from real traffic |

**There is no local simulator.** `ymk dev` runs your bot against real Discord
for the self-host loop; anything simulated runs on our servers via
`ymk bot test`.

## Deploy

Push-to-deploy is not wired yet. For now, run `ymk bot deploy` from your own CI
— that is the supported path and will keep working after the webhook ships.
