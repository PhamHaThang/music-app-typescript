import { Router } from "express";
import * as controller from "../../controllers/client/song.controller";
const route: Router = Router();

route.get("/:slugTopics", controller.topics);
route.get("/detail/:slugSong", controller.detail);
route.put("/like/:typeLike/:idSong", controller.like);
route.put("/favorite/:typeFavorite/:idSong", controller.favorite);
route.put("/favorite/:typeFavorite/:idSong", controller.favorite);

export const songRoutes: Router = route;
