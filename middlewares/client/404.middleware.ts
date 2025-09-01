import { Request, Response, NextFunction } from "express";

const notFoundPageMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("client/pages/errors/404", {
    pageTitle: "404 Not Found",
  });
};
export default notFoundPageMiddleware;
