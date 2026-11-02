import { createBot } from "./bot.ts";

const token = Deno.env.get("DISCORD_TOKEN");
if (!token) {
  console.error("DISCORD_TOKEN is not set. Run: ymk env pull");
  Deno.exit(1);
}

await createBot({ token });
