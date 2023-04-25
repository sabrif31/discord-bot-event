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
var node_fetch_1 = __importDefault(require("node-fetch"));
var date_fns_1 = require("date-fns");
var lodash_1 = require("lodash");
var DiscordEvents = /** @class */ (function () {
    function DiscordEvents() {
        this.base_api_url = 'https://discord.com/api/v9';
        this.auth_headers = {
            Authorization: "Bot ".concat(process.env.DISCORD_BOT_TOKEN),
            'User-Agent': 'DiscordBot (https://discord.com/developers/applications/1099495431861448776) Node.js fetch',
            'Content-Type': 'application/json',
        };
        this.query_params = '?with_user_count=true';
    }
    DiscordEvents.prototype.getWeeklyEvent = function (listEvents) {
        var date = new Date();
        var dateReference = (0, date_fns_1.addDays)(date, 14);
        var eventWeek = (0, lodash_1.filter)(listEvents, function (event) {
            return (0, date_fns_1.isBefore)(new Date(event.scheduled_start_time), dateReference);
        });
        var weekEventSort = (0, lodash_1.orderBy)(eventWeek, ['scheduled_start_time'], ['asc']);
        return weekEventSort;
    };
    DiscordEvents.prototype.getEventListByGuildId = function (guildId) {
        return __awaiter(this, void 0, void 0, function () {
            var event_retrieve_url, response, response_list, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event_retrieve_url = "".concat(this.base_api_url, "/guilds/").concat(guildId, "/scheduled-events").concat(this.query_params);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, (0, node_fetch_1.default)(event_retrieve_url, {
                                headers: this.auth_headers,
                            })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        response_list = _a.sent();
                        if (!response.ok) {
                            throw new Error("Failed with status ".concat(response.status, ": ").concat(JSON.stringify(response_list)));
                        }
                        return [2 /*return*/, response_list];
                    case 4:
                        e_1 = _a.sent();
                        console.log("EXCEPTION: ".concat(e_1));
                        return [2 /*return*/, []];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DiscordEvents.prototype.createEventByGuildId = function (_a) {
        var event_name = _a.event_name, event_description = _a.event_description, event_start_time = _a.event_start_time, event_end_time = _a.event_end_time, event_metadata = _a.event_metadata, _b = _a.event_privacy_level, event_privacy_level = _b === void 0 ? 2 : _b, _c = _a.channel_id, channel_id = _c === void 0 ? null : _c;
        return __awaiter(this, void 0, void 0, function () {
            var event_create_url, event_data, response, response_text, e_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        event_create_url = "".concat(this.base_api_url, "/guilds/").concat(process.env.GUILD_ID, "/scheduled-events");
                        event_data = JSON.stringify({
                            name: event_name,
                            privacy_level: event_privacy_level,
                            scheduled_start_time: event_start_time,
                            scheduled_end_time: event_end_time,
                            description: event_description,
                            channel_id: channel_id,
                            entity_metadata: event_metadata,
                            entity_type: 3,
                        });
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, (0, node_fetch_1.default)(event_create_url, {
                                method: 'POST',
                                headers: this.auth_headers,
                                body: event_data,
                            })];
                    case 2:
                        response = _d.sent();
                        if (!!response.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.text()];
                    case 3:
                        response_text = _d.sent();
                        throw new Error("Failed with status ".concat(response.status, ": ").concat(response_text));
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_2 = _d.sent();
                        console.log("EXCEPTION: ".concat(e_2));
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return DiscordEvents;
}());
exports.default = DiscordEvents;
