/* eslint-disable prettier/prettier */
import { CronJob } from 'cron'
import {
  Client,
  Snowflake,
  TextChannel,
  Webhook,
  WebhookMessageOptions,
  EmojiResolvable,
  Message,
} from 'discord.js'
import { CronRuleItem, EventDiscordType, Policy, Rule } from '../types' // Config,
import config from '../config.json'
import DiscordEvents from '../../../utils/listEvents'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import isEmpty from 'lodash/isEmpty'

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

class CronBot {
  client?: Client
  // rule?: Rule;
  event: Rule

  constructor(client?: Client) {
    // , rule?: Rule
    this.client = client
    // this.rule = rule;
    this.event = {
      cronExpression: config.cronExpression,
      channelPolicy: 'single',
      messagePolicy: 'single',
      reactionPolicy: 'single',
      channelIds: [],
      messages: [],
      reactions: [],
    }
  }

  async sendMessages(): Promise<void> {
    await this.getListEvents()
    /*
    if (
      !isEmpty(this.event.messages) &&
      !isEmpty(this.event.messages[0].embeds) &&
      !isEmpty(this.event.messages[0].embeds[0].fields)
    ) {
      console.log("SEND MESSAGE");
    }
    */
    const channelIds = this._applyPolicyToList(
      this.event?.channelPolicy,
      this.event?.channelIds
    ) as Snowflake[]
    const messages = this._applyPolicyToList(
      this.event?.messagePolicy,
      this.event?.messages
    ) as WebhookMessageOptions[]
    const reactions = this._applyPolicyToList(
      this.event?.reactionPolicy,
      this.event?.reactions
    ) as EmojiResolvable[]

    channelIds.forEach(async (channelId) => {
      const webhook = await this._getWebhook(channelId)
      messages.forEach(async (message) => {
        const newMessage = (await webhook.send(message)) as Message
        reactions.forEach(async (reaction) => await newMessage.react(reaction))
      })
    })
  }

  async getListEvents(): Promise<Rule> {
    const bot = new DiscordEvents()
    const listEvents = await bot.getEventListByGuildId(
      process.env.GUILD_ID as string
    )
    const weekEventList = bot.getWeeklyEvent(listEvents)

    const fields = weekEventList.map((event: EventDiscordType) => {
      const startDate = new Date(event.scheduled_start_time)
      const startDateUnixTimestamp = Math.floor(startDate.getTime() / 1000)
      const endDate = new Date(event.scheduled_end_time)
      const endDateUnixTimestamp = Math.floor(endDate.getTime() / 1000)

      const defaultValue = '                                             '
      const name =
        event.name.length > 30
          ? `${event.name.substring(0, 40)}...`
          : event.name
      const start = defaultValue.substring(0, Number(name.length - 1))
      const eventName = defaultValue.replace(start, name)
      return {
        name: format(startDate, 'EEEE dd MMMM yyyy', { locale: fr }), // "samedi 22 avril 2023",
        value: `[\`${eventName}\`](https://discord.com/events/${process.env.GUILD_ID}/${event.id} "Event") <t:${startDateUnixTimestamp}:t> - <t:${endDateUnixTimestamp}:t>`,
        inline: false,
      }
    })

    const role = `<@&${process.env.ROLE_ID}>`
    this.event = {
      cronExpression: config.cronExpression,
      channelPolicy: 'single',
      messagePolicy: 'single',
      reactionPolicy: 'single',
      channelIds: [process.env.CHANNEL_ID as string], // 1099755183883423744 1099756428450861207 - 1024013712656437399
      messages: [
        {
          username: 'EVENTS',
          avatarURL:
            'https://cdn.discordapp.com/avatars/903380664336928798/2d11307165b711d93b3c80114585bf4c.webp',
          content: role, // Role ID 1098285892503867448 1030970928538075146
          embeds: [
            {
              title: 'Event',
              description: '**Événements pour les 14 prochains jours**',
              color: 500,
              fields,
            },
          ],
          components: [],
        },
      ],
      reactions: [],
    }
    return this.event
  }

  private _applyPolicyToList(
    policy?: Policy,
    list?: CronRuleItem[]
  ): CronRuleItem[] {
    if (!policy || !list || list.length === 0) {
      return []
    }

    switch (policy) {
      case 'all':
        return list
      case 'random':
        return [list[getRandomInt(0, list.length)]]
      case 'single':
      default:
        return [list[0]]
    }
  }

  private async _getWebhook(channelId: Snowflake): Promise<Webhook> {
    const channel = (await this.client?.channels.fetch(
      channelId
    )) as TextChannel
    const webhooks = await channel.fetchWebhooks()

    return !webhooks.size
      ? channel.createWebhook(this.client?.user?.username || '📢')
      : (webhooks.first() as Webhook)
  }
}

module.exports = async (client: Client): Promise<void> => {
  console.log(__dirname.split('\\').slice(-2)[0])

  const bot = new CronBot(client)
  bot.sendMessages()
  /*
  new CronJob(
    config.cronExpression,
    () => bot.sendMessages(),
    null,
    true,
    config.timezone
  );
  */
  /*
  (message as Config).rules.forEach((rule) => {
    const bot = new CronBot(client, rule);
    new CronJob(
      rule.cronExpression,
      () => bot.sendMessages(),
      null,
      true,
      message.timezone
    );
  });
  */
  /*
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
  */
}
