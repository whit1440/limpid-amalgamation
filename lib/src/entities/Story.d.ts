export default class Story {
    constructor(id: number, title: string, path: string, number: string);
    id: number;
    title: string;
    path: string;
    number: string;
    branch: string;
    environment: string;
    isMerged: boolean;
    lastCommit: string;
}
