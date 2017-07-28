"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Story {
    constructor(id, title, path, number) {
        this.isMerged = false;
        this.id = id;
        this.title = title;
        this.path = path;
        this.number = number;
    }
}
exports.default = Story;
