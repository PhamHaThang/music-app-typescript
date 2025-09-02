"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeSince = void 0;
const timeSince = (postTime) => {
    const now = new Date();
    const posted = new Date(postTime);
    const seconds = Math.floor((now.getTime() - posted.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " năm trước";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " tháng trước";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " ngày trước";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " giờ trước";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " phút trước";
    }
    return "vài giây trước";
};
exports.timeSince = timeSince;
