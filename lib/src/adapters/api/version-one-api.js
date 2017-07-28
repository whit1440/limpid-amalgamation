"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const version_one_sprint_converter_1 = require("./version-one-sprint-converter");
const version_one_story_converter_1 = require("./version-one-story-converter");
class VersionOneApi {
    constructor(http) {
        this.restPath = `/rest-1.v1/Data`;
        this.storyEndpoint = `${this.restPath}/Story`;
        this.sprintEndpoint = `${this.restPath}/Timebox`;
        this.http = http;
    }
    getStoryEndpoint(storyNumber) {
        return this.storyEndpoint + `?where=Number=%27${storyNumber}%27&sel=Name,Number,Custom_Branch,Custom_Environment,Custom_Merged,Custom_LastCommit`;
    }
    getSprintEndpoint(scheduleName, sprintName) {
        return this.sprintEndpoint + `?sel=Name,BeginDate,EndDate&page1,0&sort=-BeginDate&where=Schedule.Name='${scheduleName}'` + (sprintName ? `;Name='${sprintName}'` : '');
    }
    getStoryBySprintEndpoint(sprintName) {
        return this.storyEndpoint + `?where=Timebox.Name=%27${sprintName}%27&sort=-Timebox.EndDate&sel=Name,Number,Custom_Branch,Custom_Environment,Custom_Merged,Custom_LastCommit`;
    }
    convertSprintResponseToArray(json) {
        let sprints = new Array();
        for (var i in json.Assets) {
            sprints.push(version_one_sprint_converter_1.default.jsonToSprint(json.Assets[i]));
        }
        return sprints;
    }
    findCurrentSprint(sprints) {
        let today = new Date();
        var output = null;
        for (let sprint of sprints) {
            let sprintStartsOnOrBeforeToday = sprint.startDate.getTime() <= today.getTime();
            let sprintEndsOnOrAfterToday = sprint.endDate.getTime() >= today.getTime();
            if (sprintStartsOnOrBeforeToday && sprintEndsOnOrAfterToday) {
                output = sprint;
                break;
            }
        }
        return output;
    }
    findSprintByName(name, sprints) {
        var output = null;
        for (let sprint of sprints) {
            if (sprint.title === name) {
                output = sprint;
                break;
            }
        }
        return output;
    }
    popStory(stories) {
        return stories[0];
    }
    getStory(storyNumber) {
        return this.http.createRequest('GET', this.getStoryEndpoint(storyNumber), null)
            .then(version_one_story_converter_1.default.jsonToStories)
            .then(this.popStory);
    }
    getSprint(schedule, title) {
        return this.http.createRequest('GET', this.getSprintEndpoint(schedule, title), null)
            .then(this.convertSprintResponseToArray)
            .then((stories) => {
            if (title) {
                return this.findSprintByName(title, stories);
            }
            else {
                return this.findCurrentSprint(stories);
            }
        });
    }
    getStoriesInSprint(sprint) {
        return this.http.createRequest('GET', this.getStoryBySprintEndpoint(sprint.title), null)
            .then(version_one_story_converter_1.default.jsonToStories);
    }
    updateStory(story) {
        return this.http.createRequest('POST', this.storyEndpoint + `/${story.id}`, version_one_story_converter_1.default.storyToJson(story));
    }
    updateStories(stories) {
        let requests = new Array();
        stories.forEach((story) => {
            requests.push(this.updateStory(story));
        });
        return Promise.all(requests);
    }
}
exports.default = VersionOneApi;
