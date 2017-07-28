"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sprint_1 = require("../../src/entities/Sprint");
const Story_1 = require("../../src/entities/Story");
class ApiStub {
    constructor() {
        this.today = new Date();
        this.thirteenDaysAgo = new Date(this.today.getTime() - 13 * 24 * 60 * 60 * 1000);
        this.tomorrow = new Date(this.today.getTime() + 24 * 60 * 60 * 1000);
        this.story = new Story_1.default(1234, "Some Story", "/this/that/1234", "B-12345");
        this.story2 = new Story_1.default(1235, "Some Story Again", "/this/that/1235", "B-12346");
        this.sprint = new Sprint_1.default(12345, "Sprint 1", "/foo/bar/sprint", this.thirteenDaysAgo, this.tomorrow);
    }
    getStory(storyNumber) {
        return new Promise((resolve) => {
            resolve(this.story);
        });
    }
    getSprint(schedule, title) {
        return new Promise((resolve) => {
            resolve(this.sprint);
        });
    }
    updateStory(story) {
    }
    updateStories(stories) {
        return new Promise((resolve) => {
            resolve();
        });
    }
    getStoriesInSprint(sprint) {
        return new Promise((resolve) => {
            resolve([
                this.story,
                this.story2
            ]);
        });
    }
}
exports.default = ApiStub;
