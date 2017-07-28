"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const branch_parser_1 = require("../util/branch-parser");
const use_case_1 = require("./base/use-case");
class BuildMerge extends use_case_1.default {
    constructor(api, scm) {
        super(api, scm);
        this.parser = new branch_parser_1.default();
    }
    getStoryAndCommitAndBranch(storyNumber) {
        return Promise.all([
            this.issueTracker.getStory(storyNumber),
            this.scm.getLatestCommitSha(),
            this.scm.getCurrentBranch()
        ]);
    }
    updateStoryProperties(responses) {
        let story = responses[0];
        let sha = responses[1];
        let branch = responses[2];
        story.isMerged = true; // true since this is the merge use case
        story.branch = branch;
        story.lastCommit = sha;
        story.environment = 'merged';
        return story;
    }
    run() {
        return this.scm.getLatestCommitMessage()
            .then((message) => { return this.parser.findItemNumberFromMessage(message); })
            .then((storyNumber) => { return this.getStoryAndCommitAndBranch(storyNumber); })
            .then((responses) => { return this.updateStoryProperties(responses); })
            .then((story) => { return this.issueTracker.updateStory(story); });
    }
}
exports.default = BuildMerge;
