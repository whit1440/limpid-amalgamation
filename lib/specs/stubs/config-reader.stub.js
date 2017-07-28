"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const default_config_1 = require("../../src/app/default-config");
class ConfigReaderStub {
    constructor() {
        this.defaultConfig = default_config_1.default.config;
        this.inputConfig = {
            "api": {
                "host": "www12.v1host.com",
                "path": "/CapellaUniversity01",
                "authToken": "1.qA53RToDvLixBb7GLbhXQjJlfC4=",
                "schedule": "something"
            },
            "scm": {
                "path": "..",
                "story": "[a-zA-Z][- ][0-9]{5}",
                "merge": "Merge branch 'feature/([a-zA-Z][- ][0-9]{5}).*' into '([a-zA-Z]*)'",
                "feature": "feature/[a-zA-Z][- ][0-9]{5}",
                "release": "release/[a-zA-Z][- ][0-9]{5}"
            },
            "logger": {
                "level": 0
            },
            "deploy": {
                "tiers": ["local", "merged", "Dev", "QA", "Stage", "Prod"],
                "sprintSchedule": "PWT Sprint Schedule"
            }
        };
    }
    read() {
        return new Promise((resolve) => {
            let config = {
                "api": Object.assign({}, this.defaultConfig.api, this.inputConfig.api),
                "scm": Object.assign({}, this.defaultConfig.scm, this.inputConfig.scm),
                "logger": Object.assign({}, this.defaultConfig.logger, this.inputConfig.logger),
                "deploy": Object.assign({}, this.defaultConfig.deploy, this.inputConfig.deploy),
            };
            resolve(config);
        });
    }
}
exports.default = ConfigReaderStub;
