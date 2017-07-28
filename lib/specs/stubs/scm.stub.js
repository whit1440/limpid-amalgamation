"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ScmStub {
    constructor() {
        this.branch = 'feature/B-12345-stub';
        this.sha = '1234abcd';
        this.commitMessages = [
            `Merge branch 'feature/B-12345-stub' into 'dev'`,
            'Initial Commit'
        ];
    }
    getCurrentBranch() {
        return new Promise((resolve) => {
            resolve(this.branch);
        });
    }
    getLatestCommitSha() {
        return new Promise((resolve) => {
            resolve(this.sha);
        });
    }
    getLatestCommitMessage() {
        return new Promise((resolve) => {
            resolve(this.commitMessages.shift());
        });
    }
    getCommitLogsSinceDate(date) {
        return new Promise((resolve) => {
            resolve(this.commitMessages);
        });
    }
}
exports.default = ScmStub;
