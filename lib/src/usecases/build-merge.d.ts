import Api from '../interfaces/api-interface';
import Scm from '../interfaces/scm-interface';
import UseCase from './base/use-case';
export default class BuildMerge extends UseCase {
    private parser;
    constructor(api: Api, scm: Scm);
    private getStoryAndCommitAndBranch(storyNumber);
    private updateStoryProperties(responses);
    run(): Promise<any>;
}
