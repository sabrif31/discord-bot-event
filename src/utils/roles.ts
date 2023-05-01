import fetch from 'node-fetch'
import { EventDiscordType, HeadersType } from '../bots/discord-cron-bot/types'

export type roleCreateType = {
  name?: string
  permissions?: string
  color?: number
  hoist?: boolean
  mentionable?: boolean
}

export type roleUpdateType = {
  id?: string
  name?: string
  color?: number
  hoist?: boolean
  position?: number
  permissions?: string
  managed?: boolean
  mentionable?: boolean
}

export type roleType = {
  id: string
  name: string
  color: number
  hoist: boolean
  position: number
  permissions: string
  managed: boolean
  mentionable: boolean
}

class DiscordRoles {
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

  async getGuildRoles(guildId: string): Promise<roleType[]> {
    const event_retrieve_url = `${this.base_api_url}/guilds/${guildId}/roles${this.query_params}`
    try {
      const response = await fetch(event_retrieve_url, {
        headers: this.auth_headers,
      })
      const response_list = await response.json()
      if (!response.ok) {
        throw new Error(
          `Failed with status ${response.status}: ${JSON.stringify(
            response_list
          )}`
        )
      }
      console.log('response_list', response_list)
      return response_list
    } catch (e) {
      console.log(`EXCEPTION: ${e}`)
      return []
    }
  }

  async addGuildRole(
    guildId: string,
    options: roleCreateType
  ): Promise<roleType | null> {
    const event_retrieve_url = `${this.base_api_url}/guilds/${guildId}/roles`
    try {
      const response = await fetch(event_retrieve_url, {
        method: 'POST',
        headers: this.auth_headers,
        body: JSON.stringify(options),
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(
          `Failed with status ${response.status}: ${JSON.stringify(response)}`
        )
      }
      console.log('addGuildRole', result)
      return result
    } catch (e) {
      console.log(`EXCEPTION: ${e}`)
      return null
    }
  }

  async updateGuildRole(
    guildId: string,
    options: roleUpdateType,
    roleId: string
  ): Promise<roleType | null> {
    const event_retrieve_url = `${this.base_api_url}/guilds/${guildId}/roles/${roleId}`
    try {
      const response = await fetch(event_retrieve_url, {
        method: 'PATCH',
        headers: this.auth_headers,
        body: JSON.stringify(options),
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(
          `Failed with status ${response.status}: ${JSON.stringify(result)}`
        )
      }
      console.log('updateGuildRole', result)
      return result
    } catch (e) {
      console.log(`EXCEPTION: ${e}`)
      return null
    }
  }

  async deleteGuildRole(guildId: string, roleId: string): Promise<string> {
    const event_retrieve_url = `${this.base_api_url}/guilds/${guildId}/roles/${roleId}`
    try {
      const response = await fetch(event_retrieve_url, {
        method: 'DELETE',
        headers: this.auth_headers,
      })
      if (!response.ok) {
        throw new Error(
          `Failed with status ${response.status}: ${JSON.stringify(response)}`
        )
      }
      console.log('deleteGuildRole', response)
      return 'Success'
    } catch (e) {
      console.log(`EXCEPTION: ${e}`)
      return `EXCEPTION: ${e}`
    }
  }

  async addWebhook(channelId: string): Promise<roleType | null> {
    const event_retrieve_url = `${this.base_api_url}/channels/${channelId}/webhooks`
    try {
      const response = await fetch(event_retrieve_url, {
        method: 'POST',
        headers: this.auth_headers,
        body: JSON.stringify({ name: 'WebhookTest' }),
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
      return null
    }
  }
}

export default DiscordRoles
