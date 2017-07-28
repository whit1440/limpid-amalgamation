import Story from '../../entities/Story';
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
    static jsonToStories(json: any): Array<Story>;
    /**
     * [storyToJson -> convert a Story object into json for posting back to VersionOne API]
     * @param  {Story} story [The updated story]
     * @return {any}         [a json object following VersionOne API conventions]
     */
    static storyToJson(story: Story): any;
    static storiesToJson(stories: Array<Story>): any;
}
