"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Uses scm dependancy to fetch the branch and latest commit message.
 * Uses the DetectorMatchers to determine the most appropriate use case
 * for the current code state.
 * @param  {Scm}                           scm    [description]
 * @param  {Array<UseCaseDetectorMatcher>} config [description]
 * @return {[type]}                               [description]
 */
class UseCaseDetector {
    constructor(scm, config) {
        this.defaultType = 'build-feature'; // still unsupported
        this.scm = scm;
        this.configs = config;
    }
    findBuildType() {
        return Promise.all([
            this.scm.getCurrentBranch(),
            this.scm.getLatestCommitMessage()
        ]).then((responses) => {
            let sources = {
                'branch': responses[0],
                'commit': responses[1]
            };
            for (var i = 0; i < this.configs.length; i++) {
                let config = this.configs[i];
                let source = sources[config.source];
                if (source.match(config.matcher)) {
                    return config.value;
                }
            }
            throw 'No matching configuration found for the given project';
        });
    }
}
exports.default = UseCaseDetector;
/**
 * Matcher is Regex or a string that will be matched against the string from the
 *  given source (i.e. the branch name or last commit message).
 * Value is what you'll get back if you find a match, so this should represent the
 *  use case which is most appropriate for this match.
 * Source is a string that will be used as a key into the configured SourceTypes
 *  object (which for now is just hard coded to just use branch name and last commit message
 *  with the keys 'branch' and 'commit').
 */
class UseCaseDetectorMatcher {
}
exports.UseCaseDetectorMatcher = UseCaseDetectorMatcher;
