import AppConfig from '../interfaces/app-config'
import ConfigReader from '../interfaces/config-reader'
import UseCase from '../usecases/base/use-case'
import VersionOneApi from '../adapters/api/version-one-api'
import GitScm from '../adapters/scm/git-scm'
import Http from '../util/http'
import Logger from '../util/logger'
import Provider from './provider'
import UseCaseDetector from '../util/use-case-detector'
import BuildLocalUseCase from '../usecases/build-local'
import BuildMergeUseCase from '../usecases/build-merge'
import BuildReleaseUseCase from '../usecases/build-release'
import DeployUseCase from '../usecases/deploy'
import DefaultConfig from './default-config'
import * as fs from 'fs'

export default class App {
  private provider: Provider = new Provider()
  private reader: ConfigReader
  constructor(reader: ConfigReader) {
    this.reader = reader
  }

  private findPreviousTier(target: string, tiers: Array<string>): string {
    let index = tiers.indexOf(target)
    if (index <= -1) {
      throw `Unable to determine previous tier: target '${target}' not found in configured tiers '${tiers}'`
    } else {
      return tiers[index - 1]
    }
  }

  getProvider(): Provider {
    return this.provider
  }
  setup() {
    return this.reader
    .read()
    .then((config: AppConfig) => {

      if (config.deploy.targetTier) {
        config.deploy.previousTier = this.findPreviousTier(config.deploy.targetTier, config.deploy.tiers as string[])
      }

      let http: Http = new Http(config.api)
      let v1 = new VersionOneApi(http)
      let git = new GitScm(config.scm.path)
      let logger = new Logger(config.logger.level)
      this.provider.set(http)
      this.provider.set(v1)
      this.provider.set(git)
      this.provider.set(logger)

      let local: BuildLocalUseCase = new BuildLocalUseCase(v1, git)
      let merge: BuildMergeUseCase = new BuildMergeUseCase(v1, git)
      let release: BuildReleaseUseCase = new BuildReleaseUseCase(v1, git, '', '')
      let deploy: DeployUseCase = new DeployUseCase(v1, git, config.deploy)
      // Important Note: these cases will be evaluated IN ORDER
      // and the first match will be used.
      let detector: UseCaseDetector = new UseCaseDetector(git, [
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
      ])

      this.provider.set(local)
      this.provider.set(merge)
      this.provider.set(release)
      this.provider.set(deploy)
      this.provider.set(detector)
      return config
    })
  }
  runLocal() {
    return (this.provider.get(BuildLocalUseCase) as BuildLocalUseCase)
    .run()
    .then(() => {
      console.log('Story Tracking successfully updated for local build')
    })
    .catch((e) => {
      console.error('Story Tracking update for local build failed', e.message || e)
    })
  }
  runDeploy() {
    return (this.provider.get(DeployUseCase) as DeployUseCase)
    .run()
    .then(() => {
      console.log('Story Tracking successfully updated for local build')
    })
    .catch((e) => {
      console.error('Story Tracking update for local build failed:', e)
    })
  }
  runDetect() {
    return (this.provider.get(UseCaseDetector) as UseCaseDetector)
    .findBuildType().then((useCase: UseCase) => {
      return useCase.run()
    })
    .then(() => {
      console.log('Story Tracking successfully updated for detected CI build')
    })
    .catch((e) => {
      console.error('Story Tracking update by detection failed:', e)
    })
  }
}

export class AppConfigReader implements ConfigReader{
  private path: string
  private defaultConfig = DefaultConfig.config
  constructor(path?: string) {
    this.path = path || process.cwd() + '/laconfig.json'
    console.log(this.path)
  }
  safeConfig(input: any): any {
    let config = input || {}
    config.api = config.api || {}
    config.scm = config.scm || {}
    config.logger = config.logger || {}
    config.deploy = config.deploy || {}
    return config
  }
  read(additionalConfig?: any) {
    additionalConfig = this.safeConfig(additionalConfig)
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, (e, data) => {
        if (!e) {
          resolve(data.toString())
        } else {
          reject(e)
        }
      })
    }).then((strConfig: string) => {
      let rawConf = this.safeConfig(JSON.parse(strConfig))
      let config: AppConfig = {
        "api": {...this.defaultConfig.api, ...rawConf.api, ...additionalConfig.api},
        "scm": {...this.defaultConfig.scm, ...rawConf.scm, ...additionalConfig.scm},
        "logger": {...this.defaultConfig.logger, ...rawConf.logger, ...additionalConfig.logger},
        "deploy": {...this.defaultConfig.deploy, ...rawConf.deploy, ...additionalConfig.deploy},
      }
      return config
    })
  }
}
