import Scm from '../../interfaces/scm-interface'
import {Repository, Branch, Reference, Commit} from 'nodegit'

export default class GitScm implements Scm {

  private repo : Repository
  private path : string

  private getBranchRefFromRepo(repository: Repository): Promise<Reference> {
    return repository.getCurrentBranch()
  }
  private getBranchNameFromRef(ref: Reference): string {
    return ref.name()
  }
  private getHeadFromRepo(repository: Repository): Promise<Commit> {
    return repository.getHeadCommit()
  }
  private getShaFromCommit(commit: Commit): string {
    return commit.sha()
  }
  private getMessageFromCommit(commit: Commit): string {
    return commit.message()
  }
  private getAllCommitsSinceDate(head: Commit, date: Date) {
    let commitMessages: Array<string> = new Array<string>()
    return this.checkCommitDateAndAddToArray(head, date, commitMessages)
  }
  private checkCommitDateAndAddToArray(c: Commit, d: Date, a: Array<string>): Promise<Array<string>> {
    if (c.date().getTime() > d.getTime()) {
      console.log("pushing", c.message())
      a.push(c.message());
      if (c.parentcount() > 0) {
        return c.parent(0).then((p: Commit) => {
          return this.checkCommitDateAndAddToArray(p, d, a)
        })
      }
    }
    return new Promise<Array<string>>((resolve, reject) => {
      resolve(a)
    })
  }

  constructor(path: string) {
    this.path = path || '.'
  }

  getCurrentBranch(): Promise<string|void> {
    return Repository.open('.')
    .then(this.getBranchRefFromRepo)
    .then(this.getBranchNameFromRef)
  }

  getLatestCommitSha(): Promise<string|void> {
    return Repository.open('.')
    .then(this.getHeadFromRepo)
    .then(this.getShaFromCommit)
  }

  getLatestCommitMessage(): Promise<string|void> {
    return Repository.open('.')
    .then(this.getHeadFromRepo)
    .then(this.getMessageFromCommit)
  }

  getCommitLogsSinceDate(date: Date): Promise<Array<string>> {
    return Repository.open('.')
    .then((repo: Repository) => {
      return repo.getHeadCommit()
    })
    .then((commit: Commit) => {
      return this.getAllCommitsSinceDate(commit, date)
    })
  }
}
