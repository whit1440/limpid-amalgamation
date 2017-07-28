"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodegit_1 = require("nodegit");
class GitScm {
    getBranchRefFromRepo(repository) {
        return repository.getCurrentBranch();
    }
    getBranchNameFromRef(ref) {
        return ref.name();
    }
    getHeadFromRepo(repository) {
        return repository.getHeadCommit();
    }
    getShaFromCommit(commit) {
        return commit.sha();
    }
    getMessageFromCommit(commit) {
        return commit.message();
    }
    getAllCommitsSinceDate(head, date) {
        let commitMessages = new Array();
        return this.checkCommitDateAndAddToArray(head, date, commitMessages);
    }
    checkCommitDateAndAddToArray(c, d, a) {
        if (c.date().getTime() > d.getTime()) {
            console.log("pushing", c.message());
            a.push(c.message());
            if (c.parentcount() > 0) {
                return c.parent(0).then((p) => {
                    return this.checkCommitDateAndAddToArray(p, d, a);
                });
            }
        }
        return new Promise((resolve, reject) => {
            resolve(a);
        });
    }
    constructor(path) {
        this.path = path || '.';
    }
    getCurrentBranch() {
        return nodegit_1.Repository.open('.')
            .then(this.getBranchRefFromRepo)
            .then(this.getBranchNameFromRef);
    }
    getLatestCommitSha() {
        return nodegit_1.Repository.open('.')
            .then(this.getHeadFromRepo)
            .then(this.getShaFromCommit);
    }
    getLatestCommitMessage() {
        return nodegit_1.Repository.open('.')
            .then(this.getHeadFromRepo)
            .then(this.getMessageFromCommit);
    }
    getCommitLogsSinceDate(date) {
        return nodegit_1.Repository.open('.')
            .then((repo) => {
            return repo.getHeadCommit();
        })
            .then((commit) => {
            return this.getAllCommitsSinceDate(commit, date);
        });
    }
}
exports.default = GitScm;
