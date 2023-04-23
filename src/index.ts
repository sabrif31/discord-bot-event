import "dotenv/config";
import path from "path";
import { Intents } from "discord.js";
import { CoreClient } from "discord-bot-core-client";

const DISCORD_BOT_TOKEN =
  "MTA5OTQ5NTQzMTg2MTQ0ODc3Ng.GfikA1.AcyqE33nFv4DjZIVYxT5hZqqHF5B7Lq8Unc-3I";

const client = new CoreClient({
  token: DISCORD_BOT_TOKEN as string, // process.env.
  clientOptions: {
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_INTEGRATIONS,
      Intents.FLAGS.GUILD_WEBHOOKS,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_PRESENCES,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
  },
});

client.registerBotsIn(path.resolve(__dirname, "bots")).start();
