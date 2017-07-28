export default interface Scm {
  getCurrentBranch(): Promise<string|void>;
  getLatestCommitSha(): Promise<string|void>;
  getLatestCommitMessage(): Promise<string|void>;
  getCommitLogsSinceDate(date: Date): Promise<Array<string>>;
}
