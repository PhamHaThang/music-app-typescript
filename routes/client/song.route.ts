import { Router } from "express";
import * as controller from "../../controllers/client/song.controller";
const route: Router = Router();

route.get("/:slugTopics", controller.topics);
route.get("/detail/:slugSong", controller.detail);

export const songRoutes: Router = route;
