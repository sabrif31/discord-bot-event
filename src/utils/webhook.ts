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
      console.log('addWebhook', result)
      return result
    } catch (e) {
      console.log(`EXCEPTION: ${e}`)
      return `EXCEPTION: ${e}`
    }
  }
}

export default DiscordWebhook
