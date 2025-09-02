import { Express } from "express";
import { topicRoutes } from "./topic.route";
import { homeRoutes } from "./home.route";
import { songRoutes } from "./song.route";
import notFoundPageMiddleware from "../../middlewares/client/404.middleware";
import { favoriteSongRoutes } from "./favorite-song.route";
import { searchRoutes } from "./search.route";

const clientRoutes = (app: Express): void => {
  app.use("/", homeRoutes);
  app.use("/topics", topicRoutes);
  app.use("/songs", songRoutes);
  app.use("/favorite-songs", favoriteSongRoutes);
  app.use("/search", searchRoutes);
  app.use(notFoundPageMiddleware);
};
export default clientRoutes;
