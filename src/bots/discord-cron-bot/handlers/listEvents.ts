// import { CronJob } from "cron";
/*
import {
  Client,
  EmojiResolvable,
  Message,
  Snowflake,
  TextChannel,
  Webhook,
  WebhookMessageOptions,
} from "discord.js";
*/
import fetch from "node-fetch";

type HeadersType = {
  Authorization: string;
  "User-Agent": string;
  "Content-Type": string;
};

type EventMetadataType = {
  location: string;
};
type EventCreateType = {
  event_name: string;
  event_description: string;
  event_start_time: string;
  event_end_time: string;
  event_metadata: EventMetadataType;
  location: string;
  event_privacy_level: number;
  channel_id: null;
};

class DiscordEvents {
  base_api_url: string;
  auth_headers: HeadersType;
  query_params: string;

  constructor() {
    this.base_api_url = "https://discord.com/api/v9";
    this.auth_headers = {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      "User-Agent":
        "DiscordBot (https://discord.com/developers/applications/1099495431861448776) Node.js fetch",
      "Content-Type": "application/json",
    };
    this.query_params = "?with_user_count=true";
  }

  async list_guild_events(): Promise<any> {
    console.log("TEST");
    const event_retrieve_url = `${this.base_api_url}/guilds/${process.env.GUILD_ID}/scheduled-events${this.query_params}`;
    try {
      const response = await fetch(event_retrieve_url, {
        headers: this.auth_headers,
      });
      const response_list = await response.json();
      if (!response.ok) {
        throw new Error(
          `Failed with status ${response.status}: ${JSON.stringify(
            response_list
          )}`
        );
      }
      return response_list;
    } catch (e) {
      console.log(`EXCEPTION: ${e}`);
      return [];
    }
  }

  async create_guild_event({
    event_name,
    event_description,
    event_start_time,
    event_end_time,
    event_metadata,
    event_privacy_level = 2,
    channel_id = null,
  }: EventCreateType): Promise<any> {
    const event_create_url = `${this.base_api_url}/guilds/${process.env.GUILD_ID}/scheduled-events`;
    const event_data = JSON.stringify({
      name: event_name,
      privacy_level: event_privacy_level,
      scheduled_start_time: event_start_time,
      scheduled_end_time: event_end_time,
      description: event_description,
      channel_id: channel_id,
      entity_metadata: event_metadata,
      entity_type: 3,
    });

    try {
      const response = await fetch(event_create_url, {
        method: "POST",
        headers: this.auth_headers,
        body: event_data,
      });
      if (!response.ok) {
        const response_text = await response.text();
        throw new Error(
          `Failed with status ${response.status}: ${response_text}`
        );
      }
    } catch (e) {
      console.log(`EXCEPTION: ${e}`);
    }
  }
}
export default DiscordEvents;

// module.exports = DiscordEvents;
/*
module.exports = async (): Promise<void> => {
  console.log(__dirname.split("\\").slice(-2)[0]);

  const bot = new DiscordEvents();
  bot.list_guild_events().then((events) => {
    console.log(events);
  });
};
*/

/*
const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

class CronBot {
  client: Client;
  rule: Rule;

  constructor(client: Client, rule: Rule) {
    this.client = client;
    this.rule = rule;
  }

  sendMessages(): void {
    const channelIds = this._applyPolicyToList(
      this.rule.channelPolicy,
      this.rule.channelIds
    ) as Snowflake[];
    const messages = this._applyPolicyToList(
      this.rule.messagePolicy,
      this.rule.messages
    ) as WebhookMessageOptions[];
    const reactions = this._applyPolicyToList(
      this.rule.reactionPolicy,
      this.rule.reactions
    ) as EmojiResolvable[];

    channelIds.forEach(async (channelId) => {
      const webhook = await this._getWebhook(channelId);

      messages.forEach(async (message) => {
        const newMessage = (await webhook.send(message)) as Message;

        reactions.forEach(async (reaction) => await newMessage.react(reaction));
      });
    });
  }

  private _applyPolicyToList(
    policy?: Policy,
    list?: CronRuleItem[]
  ): CronRuleItem[] {
    if (!policy || !list || list.length === 0) {
      return [];
    }

    switch (policy) {
      case "all":
        return list;
      case "random":
        return [list[getRandomInt(0, list.length)]];
      case "single":
      default:
        return [list[0]];
    }
  }

  private async _getWebhook(channelId: Snowflake): Promise<Webhook> {
    const channel = (await this.client.channels.fetch(
      channelId
    )) as TextChannel;
    const webhooks = await channel.fetchWebhooks();

    return !webhooks.size
      ? channel.createWebhook(this.client.user?.username || "📢")
      : (webhooks.first() as Webhook);
  }
}
module.exports = async (client: Client): Promise<void> => {
  console.log(__dirname.split("\\").slice(-2)[0]);

  (config as Config).rules.forEach((rule) => {
    const bot = new CronBot(client, rule);
    new CronJob(
      rule.cronExpression,
      () => bot.sendMessages(),
      null,
      true,
      config.timezone
    );
  });
};
*/
