import { Yumekiseki } from "@yumekiseki/sdk";

export interface BotOptions {
  token: string;
}

export async function createBot({ token }: BotOptions): Promise<void> {
  const yume = new Yumekiseki();
  const db = yume.db("settings");

  // `/ping` — proves the bot is wired end to end (demo ladder D0).
  // Register this command in your Discord application before `ymk dev`.
  const ping = async (guildId: string): Promise<string> => {
    const key = { guild: guildId };
    const doc = await db.findOne({ filter: key });
    const count = (doc?.pings ?? 0) + 1;

    await db.updateOne({
      filter: key,
      update: { $set: { pings: count }, $setOnInsert: { guild: guildId } },
      upsert: true,
    });

    return `pong — ${count} ping${count === 1 ? "" : "s"} from this guild`;
  };

  if (!token) throw new Error("missing token");

  return void ping;
}
