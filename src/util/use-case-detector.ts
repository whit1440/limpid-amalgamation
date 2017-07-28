// This module is for detecting what the most appropriate use case to run may be
// based on commit message and branch name or other configurations..
import Scm from '../interfaces/scm-interface'
import UseCase from '../usecases/base/use-case'

// defining private interface so we don't get yelled at by
// referencing object property via string, like in `sources[config.source]`
interface SourceTypes {
  [key: string]: string
}
/**
 * Uses scm dependancy to fetch the branch and latest commit message.
 * Uses the DetectorMatchers to determine the most appropriate use case
 * for the current code state.
 * @param  {Scm}                           scm    [description]
 * @param  {Array<UseCaseDetectorMatcher>} config [description]
 * @return {[type]}                               [description]
 */
export default class UseCaseDetector {
  private scm: Scm
  private configs: Array<UseCaseDetectorMatcher>
  private defaultType: string = 'build-feature'// still unsupported
  constructor(scm: Scm, config: Array<UseCaseDetectorMatcher>) {
    this.scm = scm
    this.configs = config
  }
  public findBuildType(): Promise<UseCase> {
    return Promise.all([
      this.scm.getCurrentBranch(),
      this.scm.getLatestCommitMessage()
    ]).then((responses: Array<string | void>) => {
      let sources: SourceTypes = {
        'branch': responses[0] as string,
        'commit': responses[1] as string
      }
      for (var i = 0; i < this.configs.length; i++) {
        let config = this.configs[i]
        let source: string = sources[config.source]
        if (source.match(config.matcher)) {
          return config.value
        }
      }
      throw 'No matching configuration found for the given project'
    })
  }
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
export class UseCaseDetectorMatcher {
  matcher: RegExp|string
  value: UseCase
  source: string
}
