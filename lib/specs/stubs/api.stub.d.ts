import Api from '../../src/interfaces/api-interface';
import Sprint from '../../src/entities/Sprint';
import Story from '../../src/entities/Story';
export default class ApiStub implements Api {
    today: Date;
    thirteenDaysAgo: Date;
    tomorrow: Date;
    story: Story;
    story2: Story;
    sprint: Sprint;
    getStory(storyNumber: string): Promise<Story | void>;
    getSprint(schedule: string, title?: string): Promise<Sprint | void | null>;
    updateStory(story: Story): void;
    updateStories(stories: Array<Story>): Promise<any>;
    getStoriesInSprint(sprint: Sprint): Promise<Array<Story>>;
}
