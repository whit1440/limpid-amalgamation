import Story from '../entities/Story';
import Sprint from '../entities/Sprint';
export default interface Api {
    getStory(storyNumber: string): Promise<Story | void>;
    getSprint(schedule: string, title?: string): Promise<Sprint | void | null>;
    updateStory(story: Story): void;
    updateStories(stories: Array<Story>): Promise<any>;
    getStoriesInSprint(sprint: Sprint): Promise<Array<Story>>;
}
