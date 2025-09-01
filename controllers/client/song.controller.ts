import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";
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
  const favoriteSong = await FavoriteSong.findOne({
    songId: song.id,
  });
  song["isFavoriteSong"] = favoriteSong ? true : false;
  console.log(favoriteSong);

  res.render("client/pages/songs/detail.pug", {
    pageTitle: "Chi tiết bài hát",
    song: song,
    singer: singer,
    topic: topic,
  });
};
// [PUT] /songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;
  const typeLike: string = req.params.typeLike;
  const song = await Song.findOne({
    _id: idSong,
    status: "active",
    deleted: false,
  });
  const newLike: number = typeLike == "like" ? song.like + 1 : song.like - 1;
  song.like = newLike;
  await song.save();
  res.json({
    code: 200,
    message: "Thành công",
    like: newLike,
  });
};
// [PUT] /songs/favorite/:typeFavorite/:idSong
export const favorite = async (req: Request, res: Response) => {
  try {
    const idSong: string = req.params.idSong;
    const typeFavorite: string = req.params.typeFavorite;
    switch (typeFavorite) {
      case "favorite":
        const existFavoriteSong = await FavoriteSong.findOne({
          songId: idSong,
        });
        if (!existFavoriteSong) {
          const favoriteSong = new FavoriteSong({
            userId: "",
            songId: idSong,
          });
          await favoriteSong.save();
          res.json({
            code: 200,
            message: "Thành công",
          });
          return;
        } else {
          res.json({
            code: 400,
            message: "Lỗi",
          });
          return;
        }
        return;
      case "unfavorite":
        await FavoriteSong.deleteOne({
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
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi",
    });
  }
};
