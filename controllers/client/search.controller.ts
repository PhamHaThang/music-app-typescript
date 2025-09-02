import { Request, Response } from "express";
import Song from "../../models/song.model";
import * as timeHelper from "../../helpers/time";
import Singer from "../../models/singer.model";
import searchHelper from "../../helpers/search";
import { convertToSlug } from "../../helpers/convertToSlug";
// [GET] /search/:type
export const result = async (req: Request, res: Response) => {
  const type = req.params.type;
  const keyword = req.query.keyword.toString();
  const keywordRegex = searchHelper(keyword).regex;
  const stringSlugRegex = searchHelper(convertToSlug(keyword)).regex;
  const songs = await Song.find({
    deleted: false,
    status: "active",
    $or: [{ title: keywordRegex }, { slug: stringSlugRegex }],
  }).select("avatar title slug singerId topicId createdAt like");
  let newSongs = [];
  for (const song of songs) {
    song["time"] = timeHelper.timeSince(song.createdAt);
    const singer = await Singer.findOne({
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
};
