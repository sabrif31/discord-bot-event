import fetch from 'node-fetch'
import { HeadersType } from '../bots/discord-cron-bot/types'

export type WebhookType = {
  channelId: string
  name: string
}

class DiscordWebhook {
  base_api_url: string
  auth_headers: HeadersType
  query_params: string

  constructor() {
    this.base_api_url = process.env.DISCORD_API_BASE_URL as string
    this.auth_headers = {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      'User-Agent': `DiscordBot (https://discord.com/developers/applications/${process.env.DISCORD_APP_ID}) Node.js fetch`,
      'Content-Type': 'application/json',
    }
    this.query_params = '' // ?with_user_count=true
  }

  async addWebhook({
    channelId,
    name,
  }: WebhookType): Promise<WebhookType | string> {
    const event_retrieve_url = `${this.base_api_url}/channels/${channelId}/webhooks`
    try {
      const response = await fetch(event_retrieve_url, {
        method: 'POST',
        headers: this.auth_headers,
        body: JSON.stringify({ name }),
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(
          `Failed with status ${response.status}: ${JSON.stringify(response)}`
        )
      }
      // console.log('addWebhook', result)
      return result
    } catch (e) {
      console.log(`EXCEPTION: ${e}`)
      return `EXCEPTION: ${e}`
    }
  }

  // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
  json = {
    name: 'copyrole',
    type: 1,
    description: 'Duplicate a specific role',
    options: [
      {
        name: 'role_id',
        description: 'The role id at duplicate',
        type: 3,
        required: true,
      },
      // {
      //   name: 'permissions',
      //   description: 'The role permission at duplicate',
      //   type: 3,
      //   required: true,
      // },
      {
        name: 'role_name',
        description: 'New role name',
        type: 3,
        required: true,
      },
      {
        name: 'role_color',
        description: 'The role color at duplicate',
        type: 3,
        required: true,
        choices: [
          {
            name: 'Blue',
            value: '2123412',
          },
          {
            name: 'Red',
            value: '2123412',
          },
          {
            name: 'Purple',
            value: '2123412',
          },
        ],
      },
    ],
  }

  // This is an example CHAT_INPUT or Slash Command, with a type of 1
  async createCommands(): Promise<any | string> {
    const event_retrieve_url = `${this.base_api_url}/applications/${process.env.DISCORD_APP_ID}/commands`
    try {
      const response = await fetch(event_retrieve_url, {
        method: 'POST',
        headers: this.auth_headers,
        body: JSON.stringify(this.json),
      })
      const result = await response.json()
      if (!response.ok) {
        console.log('response', response)
        throw new Error(
          `Failed with status ${response.status}: ${JSON.stringify(response)}`
        )
      }
      // console.log('createCommands', result)
      return result
    } catch (e) {
      console.log(`EXCEPTION: ${e}`)
      return `EXCEPTION: ${e}`
    }
  }

  // This is an example USER command, with a type of 2
  makingGuildJson = {
    name: 'Manage Roles',
    type: 2,
  }
  async makingGuildCommands(): Promise<any | string> {
    const event_retrieve_url = `${this.base_api_url}/applications/${process.env.DISCORD_APP_ID}/guilds/${process.env.GUILD_ID}/commands`
    try {
      const response = await fetch(event_retrieve_url, {
        method: 'POST',
        headers: this.auth_headers,
        body: JSON.stringify(this.makingGuildJson),
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(
          `Failed with status ${response.status}: ${JSON.stringify(response)}`
        )
      }
      // console.log('makingGuildCommands', result)
      return result
    } catch (e) {
      console.log(`EXCEPTION: ${e}`)
      return `EXCEPTION: ${e}`
    }
  }
}

export default DiscordWebhook
