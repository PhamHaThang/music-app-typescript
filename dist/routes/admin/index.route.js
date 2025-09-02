"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_route_1 = require("./dashboard.route");
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const upload_route_1 = require("./upload.route");
const adminRoutes = (app) => {
    app.use("/admin/dashboard", dashboard_route_1.dashboardRoutes);
    app.use("/admin/topics", topic_route_1.topicRoutes);
    app.use("/admin/songs", song_route_1.songRoutes);
    app.use("/admin/upload", upload_route_1.uploadRoutes);
};
exports.default = adminRoutes;
