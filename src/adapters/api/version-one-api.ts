import Api from '../../interfaces/api-interface'
import Story from '../../entities/Story'
import Sprint from '../../entities/Sprint'
import Http from '../../util/http'
import DateUtil from '../../util/date-util'
import Logger from '../../util/Logger'
import SprintConverter from './version-one-sprint-converter'
import StoryConverter from './version-one-story-converter'

export default class VersionOneApi implements Api {
  private restPath: string = `/rest-1.v1/Data`
  private storyEndpoint: string = `${this.restPath}/Story`;
  private sprintEndpoint: string = `${this.restPath}/Timebox`;
  private http: Http

  constructor(http: Http) {
    this.http = http
  }

  private getStoryEndpoint(storyNumber: string): string {
    return this.storyEndpoint + `?where=Number=%27${storyNumber}%27&sel=Name,Number,Custom_Branch,Custom_Environment,Custom_Merged,Custom_LastCommit`
  }
  private getSprintEndpoint(scheduleName: string, sprintName?: string): string {
    return this.sprintEndpoint + `?sel=Name,BeginDate,EndDate&page1,0&sort=-BeginDate&where=Schedule.Name='${scheduleName}'` + (sprintName ? `;Name='${sprintName}'` : '')
  }
  private getStoryBySprintEndpoint(sprintName: string): string {
    return this.storyEndpoint + `?where=Timebox.Name=%27${sprintName}%27&sort=-Timebox.EndDate&sel=Name,Number,Custom_Branch,Custom_Environment,Custom_Merged,Custom_LastCommit`
  }
  private convertSprintResponseToArray(json: any): Array<Sprint> {
    let sprints: Array<Sprint> = new Array<Sprint>()
    for (var i in json.Assets) {
      sprints.push(SprintConverter.jsonToSprint(json.Assets[i]))
    }
    return sprints
  }
  private findCurrentSprint(sprints: Array<Sprint>): Sprint|null {
    let today = new Date()
    var output: Sprint|null = null
    for (let sprint of sprints) {
      let sprintStartsOnOrBeforeToday = sprint.startDate.getTime() <= today.getTime()
      let sprintEndsOnOrAfterToday = sprint.endDate.getTime() >= today.getTime()
      if (sprintStartsOnOrBeforeToday && sprintEndsOnOrAfterToday) {
        output = sprint
        break;
      }
    }
    return output
  }
  private findSprintByName(name: string, sprints: Array<Sprint>): Sprint|null {
    var output: Sprint|null = null
    for (let sprint of sprints) {
      if (sprint.title === name) {
        output = sprint
        break;
      }
    }
    return output
  }
  private popStory(stories: Array<Story>): Story|void {
    return stories[0]
  }

  getStory(storyNumber: string): Promise<Story | void> {
    return this.http.createRequest('GET', this.getStoryEndpoint(storyNumber), null)
      .then(StoryConverter.jsonToStories)
      .then(this.popStory)
  }
  getSprint(schedule: string, title?: string): Promise<Sprint | void | null> {
    return this.http.createRequest('GET', this.getSprintEndpoint(schedule, title), null)
    .then(this.convertSprintResponseToArray)
    .then((stories: Array<Sprint>) => {
      if (title) {
        return this.findSprintByName(title, stories)
      } else {
        return this.findCurrentSprint(stories)
      }
    })
  }
  getStoriesInSprint(sprint: Sprint): Promise<Array<Story>> {
    return this.http.createRequest('GET', this.getStoryBySprintEndpoint(sprint.title), null)
    .then(StoryConverter.jsonToStories)
  }
  updateStory(story: Story) {
    return this.http.createRequest('POST', this.storyEndpoint + `/${story.id}`, StoryConverter.storyToJson(story))
  }
  updateStories(stories: Array<Story>): Promise<any> {
    let requests: Array<Promise<any>> = new Array<Promise<any>>()
    stories.forEach((story: Story) => {
      requests.push(this.updateStory(story))
    })
    return Promise.all(requests)
  }
}
