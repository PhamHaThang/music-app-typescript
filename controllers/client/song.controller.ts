import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
// [GET] /songs/:slugTopics
export const topics = async (req: Request, res: Response) => {
  const topic = await Topic.findOne({
    deleted: false,
    slug: req.params.slugTopics,
    status: "active",
  });
  const songs = await Song.find({
    deleted: false,
    status: "active",
    topicId: topic.id,
  }).select("avatar title slug singerId like");
  for (const song of songs) {
    const singer = await Singer.findOne({
      deleted: false,
      _id: song.singerId,
      status: "active",
    });
    song["infoSinger"] = singer;
  }
  res.render("client/pages/songs/list.pug", {
    pageTitle: "Danh sách bài hát",
    songs: songs,
  });
};
// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  const slugSong: string = req.params.slugSong;
  const song = await Song.findOne({
    deleted: false,
    status: "active",
    slug: slugSong,
  });
  const singer = await Singer.findOne({
    deleted: false,
    _id: song.singerId,
    status: "active",
  }).select("fullName");
  const topic = await Topic.findOne({
    deleted: false,
    _id: song.topicId,
    status: "active",
  }).select("title");
  res.render("client/pages/songs/detail.pug", {
    pageTitle: "Chi tiết bài hát",
    song: song,
    singer: singer,
    topic: topic,
  });
};
