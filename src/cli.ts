import * as yargs from 'yargs'
import App, {AppConfigReader} from './app/main'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function CreateApp(argv: any): App {
  let configPath = process.cwd() + '/' + argv.config
  let configReader = new AppConfigReader(configPath)
  let app = new App(configReader)
  return app
}

export default class Hander {
  static CreateApp(argv: any): App {
    let configPath = process.cwd() + '/' + argv.config
    let configReader = new AppConfigReader(configPath)
    let app = new App(configReader)
    return app
  }
  static RunLocal(argv: any) {
    let app = CreateApp(argv)
    return app.setup()
      .then(() => {
        return app.runLocal()
      })
      .catch((e) => {
        console.log(e)
      })
  }
  static RunDetect(argv: any) {
    let app = CreateApp(argv)
    return app.setup()
      .then(() => {
        return app.runDetect()
      })
      .catch((e) => {
        console.log(e)
      })
  }
  static RunDeploy(argv: any) {
    let app = CreateApp(argv)
    return app.setup()
      .then(() => {
        return app.runDeploy()
      })
      .catch((e) => {
        console.log(e)
      })
  }
}

let args = yargs
  .command({
    command: 'build-local',
    describe: 'Update story to reflect local build information if latest commit differs',
    builder: {
      'deploy.sprintName': {
        alias: 'config',
        describe: 'Path to the laconfig.json file',
        default: 'laconfig.json'
      },
      sprint: {
        describe: 'The sprint in which to update all merged stories'
      }
    },
    handler: Hander.RunLocal
  })
  .command({
    command: 'build-ci',
    describe: 'Update story based on detected branch and commit message',
    builder: {
      'deploy.sprintName': {
        alias: 'config',
        describe: 'Path to the laconfig.json file',
        default: 'laconfig.json'
      },
      sprint: {
        describe: 'The sprint in which to update all merged stories'
      }
    },
    handler: Hander.RunDetect
  })
  .command({
    command: 'deploy',
    builder: {
      'deploy.targetTier': {
        alias: 'env',
        describe: 'The environment being deployed to',
        required: true,
        choices: ['Dev', 'QA', 'Stage', 'Prod']
      },
      'deploy.sprintName': {
        alias: 'config',
        describe: 'Path to the laconfig.json file',
        default: 'laconfig.json'
      },
      sprint: {
        describe: 'The sprint in which to update all merged stories'
      }
    },
    describe: 'Update all merged stories to the target environment',
    handler: Hander.RunDeploy
  })
  .help()
  .argv
