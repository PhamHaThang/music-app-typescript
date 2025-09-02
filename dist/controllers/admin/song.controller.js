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
exports.editPut = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const systems_1 = require("../../config/systems");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield song_model_1.default.find({
        deleted: false,
        status: "active",
    });
    res.render("admin/pages/songs/index.pug", {
        pageTitle: "Quản lý bài hát",
        songs: songs,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({ deleted: false, status: "active" }).select("title");
    const singers = yield singer_model_1.default.find({
        deleted: false,
        status: "active",
    }).select("fullName");
    res.render("admin/pages/songs/create.pug", {
        pageTitle: "Thêm mới bài hát",
        topics: topics,
        singers: singers,
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "";
    let audio = "";
    if (req.body.avatar) {
        avatar = req.body.avatar;
    }
    if (req.body.audio) {
        audio = req.body.audio;
    }
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        lyrics: req.body.lyrics,
        avatar: avatar,
        audio: audio,
    };
    const song = new song_model_1.default(dataSong);
    yield song.save();
    res.redirect(`${systems_1.systemConfig.prefixAdmin}/songs`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        deleted: false,
        status: "active",
    });
    const topics = yield topic_model_1.default.find({ deleted: false, status: "active" }).select("title");
    const singers = yield singer_model_1.default.find({
        deleted: false,
        status: "active",
    }).select("fullName");
    res.render("admin/pages/songs/edit.pug", {
        pageTitle: "Chỉnh sửa bài hát",
        song: song,
        topics: topics,
        singers: singers,
    });
});
exports.edit = edit;
const editPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        lyrics: req.body.lyrics,
    };
    if (req.body.avatar) {
        dataSong["avatar"] = req.body.avatar;
    }
    if (req.body.audio) {
        dataSong["audio"] = req.body.audio;
    }
    yield song_model_1.default.updateOne({
        _id: idSong,
    }, dataSong);
    res.redirect(`${systems_1.systemConfig.prefixAdmin}/songs`);
});
exports.editPut = editPut;
