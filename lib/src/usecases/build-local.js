"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const branch_parser_1 = require("../util/branch-parser");
const use_case_1 = require("./base/use-case");
class BuildLocal extends use_case_1.default {
    constructor(api, scm) {
        super(api, scm);
        this.parser = new branch_parser_1.default();
    }
    getStoryAndShaFromBranch(branch) {
        let num = this.parser.findItemNumberFromName(branch);
        return Promise.all([
            this.issueTracker.getStory(num),
            this.scm.getLatestCommitSha(),
            (new Promise((resolve) => { resolve(branch); }))
        ]);
    }
    updateStoryProperties(props) {
        let story = props[0];
        let sha = props[1];
        let branch = props[2];
        if (story.lastCommit === sha) {
            throw 'Local Build: Current commit matches existing commit, no update will be performed';
        }
        else {
            story.lastCommit = sha;
        }
        // false since this is a local build
        story.isMerged = false;
        story.branch = branch;
        story.environment = 'local';
        return story;
    }
    run() {
        return this.scm.getCurrentBranch()
            .then((branch) => { return this.getStoryAndShaFromBranch(branch); })
            .then((responses) => { return this.updateStoryProperties(responses); })
            .then((story) => { return this.issueTracker.updateStory(story); });
    }
}
exports.default = BuildLocal;
