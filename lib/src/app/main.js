"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const version_one_api_1 = require("../adapters/api/version-one-api");
const git_scm_1 = require("../adapters/scm/git-scm");
const http_1 = require("../util/http");
const logger_1 = require("../util/logger");
const provider_1 = require("./provider");
const use_case_detector_1 = require("../util/use-case-detector");
const build_local_1 = require("../usecases/build-local");
const build_merge_1 = require("../usecases/build-merge");
const build_release_1 = require("../usecases/build-release");
const deploy_1 = require("../usecases/deploy");
const default_config_1 = require("./default-config");
const fs = require("fs");
class App {
    constructor(reader) {
        this.provider = new provider_1.default();
        this.reader = reader;
    }
    findPreviousTier(target, tiers) {
        let index = tiers.indexOf(target);
        if (index <= -1) {
            throw `Unable to determine previous tier: target '${target}' not found in configured tiers '${tiers}'`;
        }
        else {
            return tiers[index - 1];
        }
    }
    getProvider() {
        return this.provider;
    }
    setup() {
        return this.reader
            .read()
            .then((config) => {
            if (config.deploy.targetTier) {
                config.deploy.previousTier = this.findPreviousTier(config.deploy.targetTier, config.deploy.tiers);
            }
            let http = new http_1.default(config.api);
            let v1 = new version_one_api_1.default(http);
            let git = new git_scm_1.default(config.scm.path);
            let logger = new logger_1.default(config.logger.level);
            this.provider.set(http);
            this.provider.set(v1);
            this.provider.set(git);
            this.provider.set(logger);
            let local = new build_local_1.default(v1, git);
            let merge = new build_merge_1.default(v1, git);
            let release = new build_release_1.default(v1, git, '', '');
            let deploy = new deploy_1.default(v1, git, config.deploy);
            // Important Note: these cases will be evaluated IN ORDER
            // and the first match will be used.
            let detector = new use_case_detector_1.default(git, [
                {
                    matcher: config.scm.release,
                    value: release,
                    source: 'branch'
                },
                {
                    matcher: config.scm.merge,
                    value: merge,
                    source: 'commit'
                },
                {
                    matcher: config.scm.feature,
                    value: local,
                    source: 'branch'
                }
            ]);
            this.provider.set(local);
            this.provider.set(merge);
            this.provider.set(release);
            this.provider.set(deploy);
            this.provider.set(detector);
            return config;
        });
    }
    runLocal() {
        return this.provider.get(build_local_1.default)
            .run()
            .then(() => {
            console.log('Story Tracking successfully updated for local build');
        })
            .catch((e) => {
            console.error('Story Tracking update for local build failed', e.message || e);
        });
    }
    runDeploy() {
        return this.provider.get(deploy_1.default)
            .run()
            .then(() => {
            console.log('Story Tracking successfully updated for local build');
        })
            .catch((e) => {
            console.error('Story Tracking update for local build failed:', e);
        });
    }
    runDetect() {
        return this.provider.get(use_case_detector_1.default)
            .findBuildType().then((useCase) => {
            return useCase.run();
        })
            .then(() => {
            console.log('Story Tracking successfully updated for detected CI build');
        })
            .catch((e) => {
            console.error('Story Tracking update by detection failed:', e);
        });
    }
}
exports.default = App;
class AppConfigReader {
    constructor(path) {
        this.defaultConfig = default_config_1.default.config;
        this.path = path || process.cwd() + '/laconfig.json';
        console.log(this.path);
    }
    safeConfig(input) {
        let config = input || {};
        config.api = config.api || {};
        config.scm = config.scm || {};
        config.logger = config.logger || {};
        config.deploy = config.deploy || {};
        return config;
    }
    read(additionalConfig) {
        additionalConfig = this.safeConfig(additionalConfig);
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, (e, data) => {
                if (!e) {
                    resolve(data.toString());
                }
                else {
                    reject(e);
                }
            });
        }).then((strConfig) => {
            let rawConf = this.safeConfig(JSON.parse(strConfig));
            let config = {
                "api": Object.assign({}, this.defaultConfig.api, rawConf.api, additionalConfig.api),
                "scm": Object.assign({}, this.defaultConfig.scm, rawConf.scm, additionalConfig.scm),
                "logger": Object.assign({}, this.defaultConfig.logger, rawConf.logger, additionalConfig.logger),
                "deploy": Object.assign({}, this.defaultConfig.deploy, rawConf.deploy, additionalConfig.deploy),
            };
            return config;
        });
    }
}
exports.AppConfigReader = AppConfigReader;
