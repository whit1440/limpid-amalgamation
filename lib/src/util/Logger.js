"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor(level) {
        this.LEVEL = level;
    }
    INFO() {
        this.LEVEL > 0 && console.log.apply(console, arguments);
    }
    WARN() {
        this.LEVEL > 1 && console.log.apply(console, arguments);
    }
    DEBUG() {
        this.LEVEL > 2 && console.log.apply(console, arguments);
    }
}
exports.default = Logger;
