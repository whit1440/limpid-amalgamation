"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BranchParser {
    constructor() {
        // TODO - make patterns injectable
        this.storyNamePattern = /[a-zA-Z][\-\ ][0-9]{5}/g;
        this.mergeMessagePattern = /Merge\ branch\ 'feature\/([a-zA-Z][\-\ ][0-9]{5}).*'\ into '([a-zA-Z]*)'/;
    }
    findItemNumberFromName(branchName) {
        let match = branchName.match(this.storyNamePattern);
        if (match && match.length) {
            return this.normalizeStoryNumber(match[0]);
        }
        else {
            throw `No valid story number pattern found in branch name '${branchName}'`;
        }
    }
    normalizeStoryNumber(storyNum) {
        return storyNum.trim().replace(' ', '-').toUpperCase();
    }
    findItemNumberFromMessage(commitMessage) {
        let matches = commitMessage.match(this.mergeMessagePattern);
        if (matches && matches.length > 1) {
            return matches[1];
        }
        else {
            throw `No valid story number pattern found in commit message '${commitMessage}'`;
        }
    }
}
exports.default = BranchParser;
