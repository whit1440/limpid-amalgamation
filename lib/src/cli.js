"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const main_1 = require("./app/main");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
function CreateApp(argv) {
    let configPath = process.cwd() + '/' + argv.config;
    let configReader = new main_1.AppConfigReader(configPath);
    let app = new main_1.default(configReader);
    return app;
}
class Hander {
    static CreateApp(argv) {
        let configPath = process.cwd() + '/' + argv.config;
        let configReader = new main_1.AppConfigReader(configPath);
        let app = new main_1.default(configReader);
        return app;
    }
    static RunLocal(argv) {
        let app = CreateApp(argv);
        app.setup()
            .then(() => {
            app.runLocal();
        })
            .catch((e) => {
            console.log(e);
        });
    }
    static RunDetect(argv) {
        let app = CreateApp(argv);
        app.setup()
            .then(() => {
            app.runDetect();
        })
            .catch((e) => {
            console.log(e);
        });
    }
    static RunDeploy(argv) {
        let app = CreateApp(argv);
        app.setup()
            .then(() => {
            app.runDeploy();
        })
            .catch((e) => {
            console.log(e);
        });
    }
}
exports.default = Hander;
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
    .argv;
