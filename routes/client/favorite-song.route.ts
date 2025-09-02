import { Router } from "express";
import * as controller from "../../controllers/client/favorite-song.controller";
const route: Router = Router();

route.get("/", controller.index);

export const favoriteSongRoutes: Router = route;
