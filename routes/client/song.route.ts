import { Router } from "express";
import * as controller from "../../controllers/client/song.controller";
const route: Router = Router();

route.get("/:slugTopics", controller.topics);

export const songRoutes: Router = route;
