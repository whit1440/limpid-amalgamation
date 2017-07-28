"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultConfig {
}
DefaultConfig.config = {
    "api": {
        "protocol": "https",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Origin": "*"
        },
        "noPost": true,
        "crossOrigin": true
    },
    "scm": {
        "path": ".",
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
exports.default = DefaultConfig;
