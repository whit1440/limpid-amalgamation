// store last commit into version one and find the story based on Go CD pipeline label?
// That might avoid have to pass extra data around the pipelines.
import UseCase from './base/use-case'
import Api from '../interfaces/api-interface'
import Scm from '../interfaces/scm-interface'
import Story from '../entities/Story'
import Sprint from '../entities/Sprint'

export default class DeployUseCase extends UseCase {
  private targetTier: string
  private previousTier: string

  constructor(api: Api, scm: Scm, deploymentTier: string, previousTier: string) {
    super(api, scm)
    this.targetTier = deploymentTier
    this.previousTier = previousTier
  }

  private findStoriesFromPreviousEnvironment(stories: Array<Story>): Array<Story> {
    let storiesToUpdate: Array<Story> = new Array<Story>()
    stories.forEach((story: Story) => {
      // we only want to update stories that are merged and currently living
      // one tier down. Otherwise if stuff was in QA and we ran the Dev deploy again
      // the stories would revert to Dev.
      if (story.isMerged && story.environment === this.previousTier) {
        story.environment = this.targetTier
        storiesToUpdate.push(story)
      }
    })
    return storiesToUpdate
  }

  private updateBranchInStories(responses: Array<Array<Story> | string | void>): Array<Story> {
    let stories: Array<Story> = responses[0] as Array<Story>
    let branch: string = responses[1] as string
    stories.forEach((story: Story) => {
      story.branch = branch
    })
    return stories
  }

  public run(): Promise<any> {
    return this.issueTracker.getSprint('PWT Sprint Schedule')
      .then((sprint: Sprint) => { return this.issueTracker.getStoriesInSprint(sprint) })
      .then((stories: Array<Story>) => {
        return Promise.all([
          this.findStoriesFromPreviousEnvironment(stories),
          this.scm.getCurrentBranch()
        ])
      })
      .then(this.updateBranchInStories)
      .then((stories: Array<Story>) => { return this.issueTracker.updateStories(stories) })
  }
}
