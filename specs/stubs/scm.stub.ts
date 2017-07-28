import Scm from '../../src/interfaces/scm-interface'
import Sprint from '../../src/entities/Sprint'
import Story from '../../src/entities/Story'

export default class ScmStub implements Scm {
  branch: string = 'feature/B-12345-stub'
  sha: string = '1234abcd'
  commitMessages: Array<string> = [
    `Merge branch 'feature/B-12345-stub' into 'dev'`,
    'Initial Commit'
  ]
  getCurrentBranch(): Promise<string|void> {
    return new Promise((resolve) => {
      resolve(this.branch)
    })
  }
  getLatestCommitSha(): Promise<string|void> {
    return new Promise((resolve) => {
      resolve(this.sha)
    })
  }
  getLatestCommitMessage(): Promise<string|void> {
    return new Promise((resolve) => {
      resolve(this.commitMessages.shift())
    })
  }
  getCommitLogsSinceDate(date: Date): Promise<Array<string>> {
    return new Promise((resolve) => {
      resolve(this.commitMessages)
    })
  }
}
