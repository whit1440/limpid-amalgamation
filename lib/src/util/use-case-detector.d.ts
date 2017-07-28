import Scm from '../interfaces/scm-interface';
import UseCase from '../usecases/base/use-case';
/**
 * Uses scm dependancy to fetch the branch and latest commit message.
 * Uses the DetectorMatchers to determine the most appropriate use case
 * for the current code state.
 * @param  {Scm}                           scm    [description]
 * @param  {Array<UseCaseDetectorMatcher>} config [description]
 * @return {[type]}                               [description]
 */
export default class UseCaseDetector {
    private scm;
    private configs;
    private defaultType;
    constructor(scm: Scm, config: Array<UseCaseDetectorMatcher>);
    findBuildType(): Promise<UseCase>;
}
/**
 * Matcher is Regex or a string that will be matched against the string from the
 *  given source (i.e. the branch name or last commit message).
 * Value is what you'll get back if you find a match, so this should represent the
 *  use case which is most appropriate for this match.
 * Source is a string that will be used as a key into the configured SourceTypes
 *  object (which for now is just hard coded to just use branch name and last commit message
 *  with the keys 'branch' and 'commit').
 */
export declare class UseCaseDetectorMatcher {
    matcher: RegExp | string;
    value: UseCase;
    source: string;
}
