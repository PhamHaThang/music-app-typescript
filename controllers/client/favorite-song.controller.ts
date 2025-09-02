import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";
import * as timeHelper from "../../helpers/time";
// [GET] /favorite-songs
export const index = async (req: Request, res: Response) => {
  const favoriteSongs = await FavoriteSong.find({
    // userId:"",
    deleted: "false",
  });
  for (const favoriteSong of favoriteSongs) {
    const song = await Song.findOne({
      deleted: false,
      status: "active",
      _id: favoriteSong.songId,
    }).select("avatar title slug singerId topicId createdAt");
    song["time"] = timeHelper.timeSince(song.createdAt);
    const singer = await Singer.findOne({
      deleted: false,
      _id: song.singerId,
      status: "active",
    });
    favoriteSong["infoSinger"] = singer;
    favoriteSong["infoSong"] = song;
  }
  res.render("client/pages/favorite-songs/index.pug", {
    pageTitle: "Bài hát yêu thích",
    songs: favoriteSongs,
  });
};
