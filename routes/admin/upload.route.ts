import { Router } from "express";
import * as controller from "../../controllers/admin/upload.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";
import multer from "multer";
const route: Router = Router();
const upload = multer();
route.post(
  "/",
  upload.single("file"),
  uploadCloud.uploadSingle,
  controller.index
);

export const uploadRoutes: Router = route;
