export default class BranchParser {
    storyNamePattern: RegExp;
    mergeMessagePattern: RegExp;
    findItemNumberFromName(branchName: string): string;
    normalizeStoryNumber(storyNum: string): string;
    findItemNumberFromMessage(commitMessage: string): string;
}
