import { Request, Response } from "express";
import Song from "../../models/song.model";
import * as timeHelper from "../../helpers/time";
import Singer from "../../models/singer.model";
import searchHelper from "../../helpers/search";
import { convertToSlug } from "../../helpers/convertToSlug";
// [GET] /search/result
export const result = async (req: Request, res: Response) => {
  const keyword = req.query.keyword.toString();
  const keywordRegex = searchHelper(keyword).regex;
  const stringSlugRegex = searchHelper(convertToSlug(keyword)).regex;
  const songs = await Song.find({
    deleted: false,
    status: "active",
    $or: [{ title: keywordRegex }, { slug: stringSlugRegex }],
  }).select("avatar title slug singerId topicId createdAt like");
  for (const song of songs) {
    song["time"] = timeHelper.timeSince(song.createdAt);
    const singer = await Singer.findOne({
      deleted: false,
      _id: song.singerId,
      status: "active",
    });
    song["infoSinger"] = singer;
  }
  res.render("client/pages/search/result.pug", {
    pageTitle: `Kết quả: ${keyword}`,
    songs: songs,
    keyword: keyword,
  });
};
