// store last commit into version one and find the story based on Go CD pipeline label?
// That might avoid have to pass extra data around the pipelines.
import UseCase from './base/use-case'
import Api from '../interfaces/api-interface'
import Scm from '../interfaces/scm-interface'
import {DeployConfig} from '../interfaces/app-config'
import Story from '../entities/Story'
import Sprint from '../entities/Sprint'

export default class DeployUseCase extends UseCase {
  private targetTier: string
  private previousTier: string
  private config: DeployConfig

  constructor(api: Api, scm: Scm, config: DeployConfig) {
    super(api, scm)
    this.config = config
  }

  private findStoriesFromPreviousEnvironment(stories: Array<Story>): Array<Story> {
    let storiesToUpdate: Array<Story> = new Array<Story>()
    stories.forEach((story: Story) => {
      // we only want to update stories that are merged and currently living
      // one tier down. Otherwise if stuff was in QA and we ran the Dev deploy again
      // the stories would revert to Dev.
      if (story.isMerged && story.environment === this.config.previousTier) {
        story.environment = this.config.targetTier as string
        storiesToUpdate.push(story)
      }
    })
    return storiesToUpdate
  }

  public run(): Promise<any> {
    return this.issueTracker.getSprint(this.config.sprintSchedule as string, this.config.sprintName)
      .then((sprint: Sprint) => { return this.issueTracker.getStoriesInSprint(sprint) })
      .then((stories: Array<Story>) => { return this.findStoriesFromPreviousEnvironment(stories) })
      .then((stories: Array<Story>) => { return this.issueTracker.updateStories(stories) })
  }
}
