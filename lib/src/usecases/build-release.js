"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// store last commit into version one and find the story based on Go CD pipeline label?
// That might avoid have to pass extra data around the pipelines.
const use_case_1 = require("./base/use-case");
class BuildReleaseUseCase extends use_case_1.default {
    constructor(api, scm, deploymentTier, previousTier) {
        super(api, scm);
        this.targetTier = deploymentTier;
        this.previousTier = previousTier;
    }
    findStoriesFromPreviousEnvironment(stories) {
        let storiesToUpdate = new Array();
        stories.forEach((story) => {
            // we only want to update stories that are merged and currently living
            // one tier down. Otherwise if stuff was in QA and we ran the Dev deploy again
            // the stories would revert to Dev.
            if (story.isMerged && story.environment === this.previousTier) {
                story.environment = this.targetTier;
                storiesToUpdate.push(story);
            }
        });
        return storiesToUpdate;
    }
    updateBranchInStories(responses) {
        let stories = responses[0];
        let branch = responses[1];
        stories.forEach((story) => {
            story.branch = branch;
        });
        return stories;
    }
    run() {
        return this.issueTracker.getSprint('PWT Sprint Schedule')
            .then((sprint) => { return this.issueTracker.getStoriesInSprint(sprint); })
            .then((stories) => {
            return Promise.all([
                this.findStoriesFromPreviousEnvironment(stories),
                this.scm.getCurrentBranch()
            ]);
        })
            .then(this.updateBranchInStories)
            .then((stories) => { return this.issueTracker.updateStories(stories); });
    }
}
exports.default = BuildReleaseUseCase;
