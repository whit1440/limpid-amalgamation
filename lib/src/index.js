"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
/*
// TODO - make configurable by user
let httpConfig: HttpConfig = {
  protocol: 'https',
  host: 'www12.v1host.com',
  basePath: '/CapellaUniversity01',
  authToken: '1.qA53RToDvLixBb7GLbhXQjJlfC4=',
  headers: {}
}

var a: VersionOneApi = new VersionOneApi(new Http(httpConfig))

var g: GitScm = new GitScm('.')
let d: Date = new Date(2017, 6, 16, 0, 0, 0)
g.getCommitLogsSinceDate(new Date((new Date()).getTime() - (24 * 60 * 60 * 1000)))
.then((logs) => {
  console.log(logs)
}).catch((e) => {
  console.error(e)
})
let localUseCase: BuildLocal = new BuildLocal(a, g)

//localUseCase.run().catch((e) => {console.error(e)})
//g.getCommitLogsSinceDate(d)
//g.getLatestCommit()
//g.getCurrentBranch()
/*
.then((logs: string[]) => {
  console.log(logs)
})
/*
.then((branchName: string|void) => {
  console.log(branchName)
})
*/
/*
.catch((e) => {
  console.error(e)
})

a.getSprint()
.then((sprint: Sprint) => {
  return a.getStoriesInSprint(sprint)
})
.then((stories): Array<Story> => {
  return stories.slice(0,2)
}).then((stories): Array<Story> => {
  stories[0].environment = 'dev-test'
  stories[1].environment = 'dev-test'
  return stories
}).then((stories) => {
  console.log(stories)
  a.updateStories(stories)
}).catch((e) => {
  console.error(e)
})
*/
