"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.result = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const timeHelper = __importStar(require("../../helpers/time"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const search_1 = __importDefault(require("../../helpers/search"));
const convertToSlug_1 = require("../../helpers/convertToSlug");
const result = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.params.type;
    const keyword = req.query.keyword.toString();
    const keywordRegex = (0, search_1.default)(keyword).regex;
    const stringSlugRegex = (0, search_1.default)((0, convertToSlug_1.convertToSlug)(keyword)).regex;
    const songs = yield song_model_1.default.find({
        deleted: false,
        status: "active",
        $or: [{ title: keywordRegex }, { slug: stringSlugRegex }],
    }).select("avatar title slug singerId topicId createdAt like");
    let newSongs = [];
    for (const song of songs) {
        song["time"] = timeHelper.timeSince(song.createdAt);
        const singer = yield singer_model_1.default.findOne({
            deleted: false,
            _id: song.singerId,
            status: "active",
        });
        newSongs.push({
            id: song.id,
            title: song.title,
            avatar: song.avatar,
            like: song.like,
            slug: song.slug,
            time: timeHelper.timeSince(song.createdAt),
            infoSinger: { fullName: singer.fullName },
        });
    }
    switch (type) {
        case "result":
            res.render("client/pages/search/result.pug", {
                pageTitle: `Kết quả: ${keyword}`,
                songs: newSongs,
                keyword: keyword,
            });
            break;
        case "suggest":
            res.json({
                code: 200,
                message: "Thành công",
                songs: newSongs,
            });
            break;
        default:
            res.status(400).json({
                code: 400,
                message: "Lỗi",
            });
            break;
    }
});
exports.result = result;
