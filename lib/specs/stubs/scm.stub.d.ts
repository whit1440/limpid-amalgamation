import Scm from '../../src/interfaces/scm-interface';
export default class ScmStub implements Scm {
    branch: string;
    sha: string;
    commitMessages: Array<string>;
    getCurrentBranch(): Promise<string | void>;
    getLatestCommitSha(): Promise<string | void>;
    getLatestCommitMessage(): Promise<string | void>;
    getCommitLogsSinceDate(date: Date): Promise<Array<string>>;
}
