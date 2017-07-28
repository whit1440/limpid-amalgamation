import Story from '../../entities/Story'
/**
 * StoryConverter class
 * Exposes static methods for converting VersionOne API response into Story entity
 * and vice versa.
 */
export default class StoryConverter {
  /**
   * [jsonToStory -> convert api response json into a Story entity]
   * @param  {any}   json [json object in the form of VersionOne API response]
   * @return {Story}      [Story object instance containing relevent data from input json]
   */
  static jsonToStories(json: any): Array<Story> {
    let assets: Array<any> = json.Assets
    let output: Array<Story> = new Array<Story>()
    assets.forEach((asset) => {
      let attrs = asset.Attributes
      let story = new Story(parseInt(asset.id.split(':')[1]), attrs.Name.value, asset.href, attrs.Number.value)
      story.environment = attrs['Custom_Environment'].value
      story.isMerged = attrs['Custom_Merged'].value === 'True' ? true : false
      story.branch = attrs['Custom_Branch'].value
      story.lastCommit = attrs['Custom_LastCommit'].value
      output.push(story)
    })
    return output
  }
  /**
   * [storyToJson -> convert a Story object into json for posting back to VersionOne API]
   * @param  {Story} story [The updated story]
   * @return {any}         [a json object following VersionOne API conventions]
   */
  static storyToJson(story: Story): any {
    return {
      _type: 'Asset',
      id: `Story:${story.id}`,
      Attributes: {
        'Custom_Branch': {
          act: 'set',
          name: 'Custom_Branch',
          value: story.branch
        },
        'Custom_Environment': {
          act: 'set',
          name: 'Custom_Environment',
          value: story.environment
        },
        'Custom_Merged': {
          act: 'set',
          name: 'Custom_Merged',
          value: story.isMerged
        },
        'Custom_LastCommit': {
          act: 'set',
          name: 'Custom_LastCommit',
          value: story.lastCommit
        }
      }
    }
  }
  static storiesToJson(stories: Array<Story>): any {
    let assets: Array<any> = new Array<any>()
    stories.forEach((story: Story) => {
      assets.push(StoryConverter.storyToJson(story))
    })
    return {
      _type: 'Assets',
      total: assets.length,
      Assets: assets
    }
  }
}
