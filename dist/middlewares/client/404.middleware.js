"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundPageMiddleware = (req, res, next) => {
    res.render("client/pages/errors/404", {
        pageTitle: "404 Not Found",
    });
};
exports.default = notFoundPageMiddleware;
