import Api from '../interfaces/api-interface'
import Scm from '../interfaces/scm-interface'
import Story from '../entities/Story'
import BranchParser from '../util/branch-parser'
import UseCase from './base/use-case'

export default class BuildLocal extends UseCase {
  private parser: BranchParser

  constructor(api: Api, scm: Scm) {
    super(api, scm)
    this.parser = new BranchParser()
  }

  private getStoryAndShaFromBranch(branch: string): Promise<any> {
    let num = this.parser.findItemNumberFromName(branch)
    return Promise.all([
      this.issueTracker.getStory(num),
      this.scm.getLatestCommitSha(),
      (new Promise((resolve) => { resolve(branch) }))
    ])
  }

  private updateStoryProperties(props: Array<any>): Story {
    let story: Story = props[0]
    let sha: string = props[1]
    let branch: string = props[2]
    if (story.lastCommit === sha) {
      throw 'Local Build: Current commit matches existing commit, no update will be performed'
    } else {
      story.lastCommit = sha
    }
    // false since this is a local build
    story.isMerged = false
    story.branch = branch
    story.environment = 'local'
    return story
  }

  run(): Promise<any> {
    return this.scm.getCurrentBranch()
      .then((branch: string) => { return this.getStoryAndShaFromBranch(branch) })
      .then((responses: Array<any>) => { return this.updateStoryProperties(responses) })
      .then((story: Story) => { return this.issueTracker.updateStory(story) })
  }
}
