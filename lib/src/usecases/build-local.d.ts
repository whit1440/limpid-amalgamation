import Api from '../interfaces/api-interface';
import Scm from '../interfaces/scm-interface';
import UseCase from './base/use-case';
export default class BuildLocal extends UseCase {
    private parser;
    constructor(api: Api, scm: Scm);
    private getStoryAndShaFromBranch(branch);
    private updateStoryProperties(props);
    run(): Promise<any>;
}
