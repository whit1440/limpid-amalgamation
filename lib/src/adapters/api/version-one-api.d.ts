import Api from '../../interfaces/api-interface';
import Story from '../../entities/Story';
import Sprint from '../../entities/Sprint';
import Http from '../../util/http';
export default class VersionOneApi implements Api {
    private restPath;
    private storyEndpoint;
    private sprintEndpoint;
    private http;
    constructor(http: Http);
    private getStoryEndpoint(storyNumber);
    private getSprintEndpoint(scheduleName, sprintName?);
    private getStoryBySprintEndpoint(sprintName);
    private convertSprintResponseToArray(json);
    private findCurrentSprint(sprints);
    private findSprintByName(name, sprints);
    private popStory(stories);
    getStory(storyNumber: string): Promise<Story | void>;
    getSprint(schedule: string, title?: string): Promise<Sprint | void | null>;
    getStoriesInSprint(sprint: Sprint): Promise<Array<Story>>;
    updateStory(story: Story): Promise<void>;
    updateStories(stories: Array<Story>): Promise<any>;
}
