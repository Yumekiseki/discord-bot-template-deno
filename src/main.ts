import { createBot } from "./bot.ts";

const token = Deno.env.get("DISCORD_TOKEN");
if (!token) {
  console.error(
    "DISCORD_TOKEN is not set. Set it on the project, then run: ymk dev",
  );
  Deno.exit(1);
}

await createBot({ token });
