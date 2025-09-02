import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/systems";
// [GET] /admin/songs
export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false,
    status: "active",
  });

  res.render("admin/pages/songs/index.pug", {
    pageTitle: "Quản lý bài hát",
    songs: songs,
  });
};
// [GET] /admin/songs/create
export const create = async (req: Request, res: Response) => {
  const topics = await Topic.find({ deleted: false, status: "active" }).select(
    "title"
  );
  const singers = await Singer.find({
    deleted: false,
    status: "active",
  }).select("fullName");
  res.render("admin/pages/songs/create.pug", {
    pageTitle: "Thêm mới bài hát",
    topics: topics,
    singers: singers,
  });
};
// [POST] /admin/songs/create
export const createPost = async (req: Request, res: Response) => {
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
    avatar: avatar,
    audio: audio,
  };
  const song = new Song(dataSong);
  await song.save();
  res.redirect(`${systemConfig.prefixAdmin}/songs`);
};
