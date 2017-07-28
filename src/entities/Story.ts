export default class Story {
  constructor(id: number, title: string, path: string, number: string) {
    this.id = id;
    this.title = title;
    this.path = path;
    this.number = number;
  }
  id: number;
  title: string;
  path: string;
  number: string;
  branch: string;
  environment: string;
  isMerged: boolean = false;
  lastCommit: string;
}
