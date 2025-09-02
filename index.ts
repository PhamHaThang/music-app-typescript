import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import clientRoutes from "./routes/client/index.route";
import path from "path";
import moment = require("moment");

dotenv.config();
const app: Express = express();
const port: number | string = process.env.PORT || 3000;

//Config view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//Config static file
app.use(express.static(path.join(__dirname, "public")));
//Client Routes
clientRoutes(app);
app.locals.moment = moment;
(async () => {
  await database.connect();
  app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
  });
})();
