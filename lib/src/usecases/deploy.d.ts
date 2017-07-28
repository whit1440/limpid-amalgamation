import UseCase from './base/use-case';
import Api from '../interfaces/api-interface';
import Scm from '../interfaces/scm-interface';
import { DeployConfig } from '../interfaces/app-config';
export default class DeployUseCase extends UseCase {
    private targetTier;
    private previousTier;
    private config;
    constructor(api: Api, scm: Scm, config: DeployConfig);
    private findStoriesFromPreviousEnvironment(stories);
    run(): Promise<any>;
}
