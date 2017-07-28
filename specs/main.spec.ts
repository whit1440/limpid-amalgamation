
import {suite, test} from 'mocha-typescript'
import App, {AppConfigReader} from '../src/app/main'
import ConfigReaderStub from './stubs/config-reader.stub'
import AppConfig from '../src/interfaces/app-config'
import Provider from '../src/app/provider'
import {expect} from 'chai'

@suite
class MainTest {
  @test('should be defined')
  public test() {
    expect(App).not.to.be.undefined
  }

  @test('can be instantiated')
  public testCanInstantiate() {
    let reader = new AppConfigReader(`${__dirname}/test-config.json`)
    let app = new App(reader)
    return app.setup().then((config: AppConfig) => {
      expect(config).not.to.be.undefined
    })
  }

  @test('configures correctly')
  public testCanConfigure() {
    let reader = new AppConfigReader(`${__dirname}/test-config.json`)
    let app = new App(reader)
    return app.setup().then((config: AppConfig) => {
      expect(config.api.path).to.equal('/CapellaUniversity01')
      expect(config.api.host).to.equal('www12.v1host.com')
    })
  }

  @test('fails for missing config')
  public testFailedConfig() {
    let reader = new ConfigReaderStub()
    reader.inputConfig.api.host = <string><any>undefined
    let app = new App(reader)
    return app.setup().then((config: AppConfig) => {
      expect(config.api.path).to.equal('/CapellaUniversity01')
      expect(config.api.host).to.equal('www12.v1host.com')
    })
  }
}
