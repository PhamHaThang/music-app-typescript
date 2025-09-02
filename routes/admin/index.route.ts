import { Express } from "express";

import { dashboardRoutes } from "./dashboard.route";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";

const adminRoutes = (app: Express): void => {
  app.use("/admin/dashboard", dashboardRoutes);
  app.use("/admin/topics", topicRoutes);
  app.use("/admin/songs", songRoutes);
};
export default adminRoutes;
