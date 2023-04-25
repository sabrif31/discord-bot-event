import fetch from 'node-fetch'
import { isBefore, addDays } from 'date-fns'
import { filter, orderBy } from 'lodash'
import {
  EventCreateType,
  EventDiscordType,
  HeadersType,
} from '../bots/discord-cron-bot/types'

class DiscordEvents {
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
    this.query_params = '?with_user_count=true'
  }

  getWeeklyEvent(listEvents: EventDiscordType[]): EventDiscordType[] {
    const date = new Date()
    const dateReference = addDays(date, 7)
    const eventWeek = filter(listEvents, (event) =>
      isBefore(new Date(event.scheduled_start_time), dateReference)
    )
    const weekEventSort = orderBy(eventWeek, ['scheduled_start_time'], ['asc'])
    return weekEventSort
  }

  async getEventListByGuildId(guildId: string): Promise<EventDiscordType[]> {
    const event_retrieve_url = `${this.base_api_url}/guilds/${guildId}/scheduled-events${this.query_params}`
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
      return response_list
    } catch (e) {
      console.log(`EXCEPTION: ${e}`)
      return []
    }
  }

  async createEventByGuildId({
    event_name,
    event_description,
    event_start_time,
    event_end_time,
    event_metadata,
    event_privacy_level = 2,
    channel_id = null,
  }: EventCreateType): Promise<void> {
    const event_create_url = `${this.base_api_url}/guilds/${process.env.GUILD_ID}/scheduled-events`
    const event_data = JSON.stringify({
      name: event_name,
      privacy_level: event_privacy_level,
      scheduled_start_time: event_start_time,
      scheduled_end_time: event_end_time,
      description: event_description,
      channel_id: channel_id,
      entity_metadata: event_metadata,
      entity_type: 3,
    })

    try {
      const response = await fetch(event_create_url, {
        method: 'POST',
        headers: this.auth_headers,
        body: event_data,
      })
      if (!response.ok) {
        const response_text = await response.text()
        throw new Error(
          `Failed with status ${response.status}: ${response_text}`
        )
      }
    } catch (e) {
      console.log(`EXCEPTION: ${e}`)
    }
  }
}
export default DiscordEvents
