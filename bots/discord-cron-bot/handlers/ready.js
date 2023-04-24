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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_json_1 = __importDefault(require("../config.json"));
var listEvents_1 = __importDefault(require("../../../utils/listEvents"));
var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};
var CronBot = /** @class */ (function () {
    function CronBot(client) {
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
    CronBot.prototype.sendMessages = function () {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var channelIds, messages, reactions;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.getListEvents()
                        /*
                        if (
                          !isEmpty(this.event.messages) &&
                          !isEmpty(this.event.messages[0].embeds) &&
                          !isEmpty(this.event.messages[0].embeds[0].fields)
                        ) {
                          console.log("SEND MESSAGE");
                        }
                        */
                    ];
                    case 1:
                        _g.sent();
                        channelIds = this._applyPolicyToList((_a = this.event) === null || _a === void 0 ? void 0 : _a.channelPolicy, (_b = this.event) === null || _b === void 0 ? void 0 : _b.channelIds);
                        messages = this._applyPolicyToList((_c = this.event) === null || _c === void 0 ? void 0 : _c.messagePolicy, (_d = this.event) === null || _d === void 0 ? void 0 : _d.messages);
                        reactions = this._applyPolicyToList((_e = this.event) === null || _e === void 0 ? void 0 : _e.reactionPolicy, (_f = this.event) === null || _f === void 0 ? void 0 : _f.reactions);
                        channelIds.forEach(function (channelId) { return __awaiter(_this, void 0, void 0, function () {
                            var webhook;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this._getWebhook(channelId)];
                                    case 1:
                                        webhook = _a.sent();
                                        messages.forEach(function (message) { return __awaiter(_this, void 0, void 0, function () {
                                            var newMessage;
                                            var _this = this;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, webhook.send(message)];
                                                    case 1:
                                                        newMessage = (_a.sent());
                                                        reactions.forEach(function (reaction) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0: return [4 /*yield*/, newMessage.react(reaction)];
                                                                case 1: return [2 /*return*/, _a.sent()];
                                                            }
                                                        }); }); });
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    CronBot.prototype.getListEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bot, listEvents, weekEventList, fields, role;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bot = new listEvents_1.default();
                        return [4 /*yield*/, bot.getEventListByGuildId(process.env.GUILD_ID)];
                    case 1:
                        listEvents = _a.sent();
                        weekEventList = bot.getWeeklyEvent(listEvents);
                        fields = weekEventList.map(function (event) {
                            var startDate = new Date(event.scheduled_start_time);
                            var startDateUnixTimestamp = Math.floor(startDate.getTime() / 1000);
                            var endDate = new Date(event.scheduled_end_time);
                            var endDateUnixTimestamp = Math.floor(endDate.getTime() / 1000);
                            var defaultValue = '                                             ';
                            var name = event.name.length > 30
                                ? "".concat(event.name.substring(0, 40), "...")
                                : event.name;
                            var start = defaultValue.substring(0, Number(name.length - 1));
                            var eventName = defaultValue.replace(start, name);
                            // format(new Date(), "dd/MM/yyyy HH:mm:ss")
                            var formatDistance = require('date-fns').formatDistance;
                            var birthday = new Date('1956, 01, 28');
                            var presentDay = new Date();
                            console.log("Age: ".concat(formatDistance(presentDay, birthday)));
                            return {
                                name: startDate.toLocaleDateString('fr-FR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                }),
                                value: "[`".concat(eventName, "`](https://discord.com/events/").concat(process.env.GUILD_ID, "/").concat(event.id, " \"Event\") <t:").concat(startDateUnixTimestamp, ":t> - <t:").concat(endDateUnixTimestamp, ":t>"),
                                inline: false,
                            };
                        });
                        role = "<@&".concat(process.env.ROLE_ID, ">");
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
                                    content: role,
                                    embeds: [
                                        {
                                            title: 'Event',
                                            description: '**Événements pour les 14 prochains jours**',
                                            color: 500,
                                            fields: fields,
                                        },
                                    ],
                                    components: [],
                                },
                            ],
                            reactions: [],
                        };
                        return [2 /*return*/, this.event];
                }
            });
        });
    };
    CronBot.prototype._applyPolicyToList = function (policy, list) {
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
    };
    CronBot.prototype._getWebhook = function (channelId) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var channel, webhooks;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, ((_a = this.client) === null || _a === void 0 ? void 0 : _a.channels.fetch(channelId))];
                    case 1:
                        channel = (_d.sent());
                        return [4 /*yield*/, channel.fetchWebhooks()];
                    case 2:
                        webhooks = _d.sent();
                        return [2 /*return*/, !webhooks.size
                                ? channel.createWebhook(((_c = (_b = this.client) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.username) || '📢')
                                : webhooks.first()];
                }
            });
        });
    };
    return CronBot;
}());
module.exports = function (client) { return __awaiter(void 0, void 0, void 0, function () {
    var bot;
    return __generator(this, function (_a) {
        console.log(__dirname.split('\\').slice(-2)[0]);
        bot = new CronBot(client);
        bot.sendMessages();
        return [2 /*return*/];
    });
}); };
