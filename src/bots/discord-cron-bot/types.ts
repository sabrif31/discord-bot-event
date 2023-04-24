import { EmojiResolvable, Snowflake, WebhookMessageOptions } from "discord.js";

export interface Config {
  timezone: string;
  rules: Rule[];
}

export interface Rule {
  cronExpression: string;
  channelPolicy: Policy;
  messagePolicy: Policy;
  reactionPolicy?: Policy;
  channelIds: Snowflake[];
  messages: WebhookMessageOptions[];
  reactions?: EmojiResolvable[];
}

export type Policy = "all" | "random" | "single";

export type CronRuleItem = Snowflake | WebhookMessageOptions | EmojiResolvable;

/**
 * Discord Event types
 */
export type EntityMetadata = {
  location: string;
};

export type Creator = {
  id: string;
  username: string;
  global_name: string | null;
  display_name: string | null;
  avatar: string;
  discriminator: string;
  public_flags: number;
  avatar_decoration: string | null;
};

export interface EventDiscordType {
  id: string;
  guild_id: string;
  channel_id: string | null;
  creator_id: string;
  name: string;
  description: string;
  image: string;
  scheduled_start_time: string;
  scheduled_end_time: string;
  privacy_level: number;
  status: number;
  entity_type: number;
  entity_id: string | null;
  entity_metadata: EntityMetadata;
  sku_ids: string[];
  creator: Creator;
  user_count: number;
}

/**
 * Header
 */
export type HeadersType = {
  Authorization: string;
  "User-Agent": string;
  "Content-Type": string;
};

/**
 * Create Discord Event types
 */
export type EventMetadataType = {
  location: string;
};

export type EventCreateType = {
  event_name: string;
  event_description: string;
  event_start_time: string;
  event_end_time: string;
  event_metadata: EventMetadataType;
  location: string;
  event_privacy_level: number;
  channel_id: null;
};
