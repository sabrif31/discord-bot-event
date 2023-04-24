"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const date_fns_1 = require("date-fns");
const lodash_1 = require("lodash");
class DiscordEvents {
    constructor() {
        this.base_api_url = "https://discord.com/api/v9";
        this.auth_headers = {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
            "User-Agent": "DiscordBot (https://discord.com/developers/applications/1099495431861448776) Node.js fetch",
            "Content-Type": "application/json",
        };
        this.query_params = "?with_user_count=true";
    }
    getWeeklyEvent(listEvents) {
        const date = new Date();
        const dateReference = (0, date_fns_1.addDays)(date, 14);
        const eventWeek = (0, lodash_1.filter)(listEvents, (event) => (0, date_fns_1.isBefore)(new Date(event.scheduled_start_time), dateReference));
        const weekEventSort = (0, lodash_1.orderBy)(eventWeek, ["scheduled_start_time"], ["asc"]);
        return weekEventSort;
    }
    getEventListByGuildId(guildId) {
        return __awaiter(this, void 0, void 0, function* () {
            const event_retrieve_url = `${this.base_api_url}/guilds/${guildId}/scheduled-events${this.query_params}`;
            try {
                const response = yield (0, node_fetch_1.default)(event_retrieve_url, {
                    headers: this.auth_headers,
                });
                const response_list = yield response.json();
                if (!response.ok) {
                    throw new Error(`Failed with status ${response.status}: ${JSON.stringify(response_list)}`);
                }
                return response_list;
            }
            catch (e) {
                console.log(`EXCEPTION: ${e}`);
                return [];
            }
        });
    }
    createEventByGuildId({ event_name, event_description, event_start_time, event_end_time, event_metadata, event_privacy_level = 2, channel_id = null, }) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const response = yield (0, node_fetch_1.default)(event_create_url, {
                    method: "POST",
                    headers: this.auth_headers,
                    body: event_data,
                });
                if (!response.ok) {
                    const response_text = yield response.text();
                    throw new Error(`Failed with status ${response.status}: ${response_text}`);
                }
            }
            catch (e) {
                console.log(`EXCEPTION: ${e}`);
            }
        });
    }
}
exports.default = DiscordEvents;
