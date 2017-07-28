class Sprint {
  constructor(id: number, title: string, path: string, startDate: Date, endDate: Date) {
    this.id = id;
    this.title = title;
    this.path = path;
    this.startDate = startDate;
    this.endDate = endDate;
  }
  id: number;
  title: string;
  path: string;
  startDate: Date;
  endDate: Date;
}

export default Sprint
