import ConfigReader from '../../src/interfaces/config-reader'
import AppConfig from '../../src/interfaces/app-config'
import DefaultConfig from '../../src/app/default-config'

export default class ConfigReaderStub implements ConfigReader {
  defaultConfig = DefaultConfig.config
  inputConfig = {
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
  }

  read(): Promise<AppConfig> {
    return new Promise((resolve) => {
      let config: AppConfig = {
        "api": {...this.defaultConfig.api, ...this.inputConfig.api},
        "scm": {...this.defaultConfig.scm, ...this.inputConfig.scm},
        "logger": {...this.defaultConfig.logger, ...this.inputConfig.logger},
        "deploy": {...this.defaultConfig.deploy, ...this.inputConfig.deploy},
      }
      resolve(config)
    })
  }
}
