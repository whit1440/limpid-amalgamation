import Api from '../../src/interfaces/api-interface'
import Sprint from '../../src/entities/Sprint'
import Story from '../../src/entities/Story'

export default class ApiStub implements Api {
  today: Date = new Date()
  thirteenDaysAgo = new Date(this.today.getTime() - 13 * 24 * 60 * 60 * 1000)
  tomorrow = new Date(this.today.getTime() + 24 * 60 * 60 * 1000)
  story: Story = new Story(1234, "Some Story", "/this/that/1234", "B-12345")
  story2: Story = new Story(1235, "Some Story Again", "/this/that/1235", "B-12346")
  sprint: Sprint = new Sprint(12345, "Sprint 1", "/foo/bar/sprint", this.thirteenDaysAgo, this.tomorrow)

  getStory(storyNumber: string) : Promise<Story|void> {
    return new Promise((resolve) => {
      resolve(this.story)
    })
  }
  getSprint(schedule: string, title?: string) : Promise<Sprint|void|null> {
    return new Promise((resolve) => {
      resolve(this.sprint)
    })
  }
  updateStory(story: Story) : void {

  }
  updateStories(stories: Array<Story>): Promise<any> {
    return new Promise((resolve) => {
      resolve()
    })
  }
  getStoriesInSprint(sprint: Sprint): Promise<Array<Story>> {
    return new Promise((resolve) => {
      resolve([
        this.story,
        this.story2
      ])
    })
  }
}
