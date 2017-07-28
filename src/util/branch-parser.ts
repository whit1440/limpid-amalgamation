export default class BranchParser {
  // TODO - make patterns injectable
  storyNamePattern: RegExp = /[a-zA-Z][\-\ ][0-9]{5}/g
  mergeMessagePattern: RegExp = /Merge\ branch\ 'feature\/([a-zA-Z][\-\ ][0-9]{5}).*'\ into '([a-zA-Z]*)'/
  findItemNumberFromName(branchName: string): string {
    let match = branchName.match(this.storyNamePattern)
    if (match && match.length) {
      return this.normalizeStoryNumber(match[0])
    } else {
      throw `No valid story number pattern found in branch name '${branchName}'`
    }
  }
  normalizeStoryNumber(storyNum: string): string {
    return storyNum.trim().replace(' ', '-').toUpperCase()
  }
  findItemNumberFromMessage(commitMessage: string) {
    let matches = commitMessage.match(this.mergeMessagePattern)
    if (matches && matches.length > 1) { // need at least two matches to know it's the item number
      return matches[1]
    } else {
      throw `No valid story number pattern found in commit message '${commitMessage}'`
    }
  }
}
