import * as yargs from 'yargs'
import App, {AppConfigReader} from './app/main'


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let args = yargs
  .command({
    command: 'build-local',
    describe: 'Update story to reflect local build information if latest commit differs',
    handler: (argv) => {
      console.log('building locally')
    }
  })
  .command({
    command: 'build-ci',
    describe: 'Update story based on detected branch and commit message',
    handler: (argv) => {
      console.log('building ci')
    }
  })
  .command({
    command: 'deploy',
    builder: {
      environment: {
        alias: 'env',
        describe: 'The environment being deployed to',
        required: true,
        choices: ['Dev', 'QA', 'Stage', 'Prod']
      },
      config: {
        alias: 'c',
        describe: 'Path to the laconfig.json file',
        default: 'laconfig.json'
      },
      sprint: {
        describe: 'The sprint in which to update all merged stories'
      }
    },
    describe: 'Update all merged stories to the target environment',
    handler: (argv) => {
      let configPath = process.cwd() + '/' + argv.config
      let configReader = new AppConfigReader(configPath)
      let app = new App(configReader)
      app.setup().then(() => {
        app.runDeploy()
      })
      .catch((e) => {
        console.log(e)
      })
    }
  })
  .help()
  .argv
//console.log(args)
