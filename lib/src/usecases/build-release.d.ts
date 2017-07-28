import UseCase from './base/use-case';
import Api from '../interfaces/api-interface';
import Scm from '../interfaces/scm-interface';
export default class BuildReleaseUseCase extends UseCase {
    private targetTier;
    private previousTier;
    constructor(api: Api, scm: Scm, deploymentTier: string, previousTier: string);
    private findStoriesFromPreviousEnvironment(stories);
    private updateBranchInStories(responses);
    run(): Promise<any>;
}
