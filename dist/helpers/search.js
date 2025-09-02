"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const searchHelper = (keyword) => {
    let objectSearch = {
        keyword: "",
    };
    if (keyword) {
        objectSearch.keyword = keyword;
        const regex = new RegExp(objectSearch.keyword, "i");
        objectSearch.regex = regex;
    }
    return objectSearch;
};
exports.default = searchHelper;
