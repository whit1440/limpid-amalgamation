"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DateUtil {
    static calenderDateToISO(ymd) {
        let timezone = DateUtil.getLocalTimezone();
        return new Date(`${ymd}T00:00:00.000-${timezone}`);
    }
    static getLocalTimezone() {
        let hours = (((new Date()).getTimezoneOffset() / 60) * 100);
        return (hours < 1000) ? '0' + hours : hours.toString();
    }
    static getRelativePreviousDate(daysBack = 1) {
        let daysBackInMs = 24 * 60 * 60 * 1000 * daysBack;
        let now = (new Date()).getTime();
        return new Date(now - daysBackInMs);
    }
}
exports.default = DateUtil;
