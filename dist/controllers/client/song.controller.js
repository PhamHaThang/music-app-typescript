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
exports.favorite = exports.listen = exports.like = exports.detail = exports.topics = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
const timeHelper = __importStar(require("../../helpers/time"));
const topics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield topic_model_1.default.findOne({
        deleted: false,
        slug: req.params.slugTopics,
        status: "active",
    });
    const songs = yield song_model_1.default.find({
        deleted: false,
        status: "active",
        topicId: topic.id,
    }).select("avatar title slug singerId like createdAt");
    for (const song of songs) {
        const singer = yield singer_model_1.default.findOne({
            deleted: false,
            _id: song.singerId,
            status: "active",
        });
        song["infoSinger"] = singer;
        song["time"] = timeHelper.timeSince(song.createdAt);
    }
    res.render("client/pages/songs/list.pug", {
        pageTitle: "Danh sách bài hát",
        songs: songs,
    });
});
exports.topics = topics;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugSong = req.params.slugSong;
    const song = yield song_model_1.default.findOne({
        deleted: false,
        status: "active",
        slug: slugSong,
    });
    const singer = yield singer_model_1.default.findOne({
        deleted: false,
        _id: song.singerId,
        status: "active",
    }).select("fullName");
    const topic = yield topic_model_1.default.findOne({
        deleted: false,
        _id: song.topicId,
        status: "active",
    }).select("title");
    const favoriteSong = yield favorite_song_model_1.default.findOne({
        songId: song.id,
    });
    song["isFavoriteSong"] = favoriteSong ? true : false;
    res.render("client/pages/songs/detail.pug", {
        pageTitle: "Chi tiết bài hát",
        song: song,
        singer: singer,
        topic: topic,
    });
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeLike = req.params.typeLike;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        status: "active",
        deleted: false,
    });
    const newLike = typeLike == "like" ? song.like + 1 : song.like - 1;
    song.like = newLike;
    yield song.save();
    res.json({
        code: 200,
        message: "Thành công",
        like: newLike,
    });
});
exports.like = like;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        status: "active",
        deleted: false,
    });
    song.listen = song.listen + 1;
    yield song.save();
    res.json({
        code: 200,
        message: "Thành công",
        listen: song.listen,
    });
});
exports.listen = listen;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSong = req.params.idSong;
        const typeFavorite = req.params.typeFavorite;
        switch (typeFavorite) {
            case "favorite":
                const existFavoriteSong = yield favorite_song_model_1.default.findOne({
                    songId: idSong,
                });
                if (!existFavoriteSong) {
                    const favoriteSong = new favorite_song_model_1.default({
                        userId: "",
                        songId: idSong,
                    });
                    yield favoriteSong.save();
                    res.json({
                        code: 200,
                        message: "Thành công",
                    });
                    return;
                }
                else {
                    res.json({
                        code: 400,
                        message: "Lỗi",
                    });
                    return;
                }
                return;
            case "unfavorite":
                yield favorite_song_model_1.default.deleteOne({
                    songId: idSong,
                });
                res.json({
                    code: 200,
                    message: "Thành công",
                });
                return;
            default:
                res.json({
                    code: 400,
                    message: "Lỗi",
                });
                return;
        }
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Lỗi",
        });
    }
});
exports.favorite = favorite;
