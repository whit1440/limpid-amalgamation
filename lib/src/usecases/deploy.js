"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// store last commit into version one and find the story based on Go CD pipeline label?
// That might avoid have to pass extra data around the pipelines.
const use_case_1 = require("./base/use-case");
class DeployUseCase extends use_case_1.default {
    constructor(api, scm, config) {
        super(api, scm);
        this.config = config;
    }
    findStoriesFromPreviousEnvironment(stories) {
        let storiesToUpdate = new Array();
        stories.forEach((story) => {
            // we only want to update stories that are merged and currently living
            // one tier down. Otherwise if stuff was in QA and we ran the Dev deploy again
            // the stories would revert to Dev.
            if (story.isMerged && story.environment === this.config.previousTier) {
                story.environment = this.config.targetTier;
                storiesToUpdate.push(story);
            }
        });
        return storiesToUpdate;
    }
    run() {
        return this.issueTracker.getSprint(this.config.sprintSchedule, this.config.sprintName)
            .then((sprint) => { return this.issueTracker.getStoriesInSprint(sprint); })
            .then((stories) => { return this.findStoriesFromPreviousEnvironment(stories); })
            .then((stories) => { return this.issueTracker.updateStories(stories); });
    }
}
exports.default = DeployUseCase;
