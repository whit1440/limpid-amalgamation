import Scm from '../../interfaces/scm-interface';
export default class GitScm implements Scm {
    private repo;
    private path;
    private getBranchRefFromRepo(repository);
    private getBranchNameFromRef(ref);
    private getHeadFromRepo(repository);
    private getShaFromCommit(commit);
    private getMessageFromCommit(commit);
    private getAllCommitsSinceDate(head, date);
    private checkCommitDateAndAddToArray(c, d, a);
    constructor(path: string);
    getCurrentBranch(): Promise<string | void>;
    getLatestCommitSha(): Promise<string | void>;
    getLatestCommitMessage(): Promise<string | void>;
    getCommitLogsSinceDate(date: Date): Promise<Array<string>>;
}
