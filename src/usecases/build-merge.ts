import Api from '../interfaces/api-interface'
import Scm from '../interfaces/scm-interface'
import Story from '../entities/Story'
import BranchParser from '../util/branch-parser'
import DateUtil from '../util/date-util'
import UseCase from './base/use-case'

export default class BuildMerge extends UseCase {
  private parser: BranchParser

  constructor(api: Api, scm: Scm) {
    super(api, scm)
    this.parser = new BranchParser()
  }

  private getStoryAndCommitAndBranch(storyNumber: string) {
    return Promise.all([
      this.issueTracker.getStory(storyNumber),
      this.scm.getLatestCommitSha(),
      this.scm.getCurrentBranch()
    ])
  }

  private updateStoryProperties(responses: Array<any>) {
    let story: Story = responses[0] as Story
    let sha: string = responses[1] as string
    let branch: string = responses[2] as string
    story.isMerged = true // true since this is the merge use case
    story.branch = branch
    story.lastCommit = sha
    story.environment = 'merged'
    return story
  }

  run(): Promise<any> {
    return this.scm.getLatestCommitMessage()
      .then((message: string) => { return this.parser.findItemNumberFromMessage(message) })
      .then((storyNumber: string) => { return this.getStoryAndCommitAndBranch(storyNumber) })
      .then((responses: Array<any>) => { return this.updateStoryProperties(responses) })
      .then((story: Story) => { return this.issueTracker.updateStory(story) })
  }
}
