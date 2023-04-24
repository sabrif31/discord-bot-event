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
const config_json_1 = __importDefault(require("../config.json"));
const listEvents_1 = __importDefault(require("../../../utils/listEvents"));
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};
class CronBot {
    constructor(client) {
        // , rule?: Rule
        this.client = client;
        // this.rule = rule;
        this.event = {
            cronExpression: config_json_1.default.cronExpression,
            channelPolicy: 'single',
            messagePolicy: 'single',
            reactionPolicy: 'single',
            channelIds: [],
            messages: [],
            reactions: [],
        };
    }
    sendMessages() {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getListEvents();
            /*
            if (
              !isEmpty(this.event.messages) &&
              !isEmpty(this.event.messages[0].embeds) &&
              !isEmpty(this.event.messages[0].embeds[0].fields)
            ) {
              console.log("SEND MESSAGE");
            }
            */
            const channelIds = this._applyPolicyToList((_a = this.event) === null || _a === void 0 ? void 0 : _a.channelPolicy, (_b = this.event) === null || _b === void 0 ? void 0 : _b.channelIds);
            const messages = this._applyPolicyToList((_c = this.event) === null || _c === void 0 ? void 0 : _c.messagePolicy, (_d = this.event) === null || _d === void 0 ? void 0 : _d.messages);
            const reactions = this._applyPolicyToList((_e = this.event) === null || _e === void 0 ? void 0 : _e.reactionPolicy, (_f = this.event) === null || _f === void 0 ? void 0 : _f.reactions);
            channelIds.forEach((channelId) => __awaiter(this, void 0, void 0, function* () {
                const webhook = yield this._getWebhook(channelId);
                messages.forEach((message) => __awaiter(this, void 0, void 0, function* () {
                    const newMessage = (yield webhook.send(message));
                    reactions.forEach((reaction) => __awaiter(this, void 0, void 0, function* () { return yield newMessage.react(reaction); }));
                }));
            }));
        });
    }
    getListEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            const bot = new listEvents_1.default();
            const listEvents = yield bot.getEventListByGuildId(process.env.GUILD_ID);
            const weekEventList = bot.getWeeklyEvent(listEvents);
            const fields = weekEventList.map((event) => {
                const startDate = new Date(event.scheduled_start_time);
                const startDateUnixTimestamp = Math.floor(startDate.getTime() / 1000);
                const endDate = new Date(event.scheduled_end_time);
                const endDateUnixTimestamp = Math.floor(endDate.getTime() / 1000);
                const defaultValue = '                                             ';
                const name = event.name.length > 30
                    ? `${event.name.substring(0, 40)}...`
                    : event.name;
                const start = defaultValue.substring(0, Number(name.length - 1));
                const eventName = defaultValue.replace(start, name);
                return {
                    name: startDate.toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }),
                    value: `[\`${eventName}\`](https://discord.com/events/${process.env.GUILD_ID}/${event.id} "Event") <t:${startDateUnixTimestamp}:t> - <t:${endDateUnixTimestamp}:t>`,
                    inline: false,
                };
            });
            this.event = {
                cronExpression: config_json_1.default.cronExpression,
                channelPolicy: 'single',
                messagePolicy: 'single',
                reactionPolicy: 'single',
                channelIds: [process.env.CHANNEL_ID],
                messages: [
                    {
                        username: 'EVENTS',
                        avatarURL: 'https://cdn.discordapp.com/avatars/903380664336928798/2d11307165b711d93b3c80114585bf4c.webp',
                        content: `<@&$${process.env.ROLE_ID}>`,
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
            };
            return this.event;
        });
    }
    _applyPolicyToList(policy, list) {
        if (!policy || !list || list.length === 0) {
            return [];
        }
        switch (policy) {
            case 'all':
                return list;
            case 'random':
                return [list[getRandomInt(0, list.length)]];
            case 'single':
            default:
                return [list[0]];
        }
    }
    _getWebhook(channelId) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const channel = (yield ((_a = this.client) === null || _a === void 0 ? void 0 : _a.channels.fetch(channelId)));
            const webhooks = yield channel.fetchWebhooks();
            return !webhooks.size
                ? channel.createWebhook(((_c = (_b = this.client) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.username) || '📢')
                : webhooks.first();
        });
    }
}
module.exports = (client) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(__dirname.split('\\').slice(-2)[0]);
    const bot = new CronBot(client);
    bot.sendMessages();
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
});
