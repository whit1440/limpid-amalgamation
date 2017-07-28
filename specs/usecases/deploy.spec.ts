import ScmStub from '../stubs/scm.stub'
import ApiStub from '../stubs/api.stub'
import DeployUseCase from '../../src/usecases/deploy'
import DeployConfig from '../../src/interfaces/deploy-config'
import Story from '../../src/entities/Story'

import {suite, test} from 'mocha-typescript'
import {expect} from 'chai'
import {spy, SinonSpy} from 'sinon'

@suite
class DeployUseCaseTest {
  scmStub: ScmStub
  apiStub: ApiStub
  updateStoriesSpy: SinonSpy
  config: DeployConfig
  before() {
    this.scmStub = new ScmStub()
    this.apiStub = new ApiStub()
    spy(this.apiStub, 'updateStories')
    this.config = {
        targetTier: 'QA',
        previousTier: 'Dev',
        sprintSchedule: 'Test',
        sprintName: 'Test',
    }
  }

  after() {
    let spy = <SinonSpy><any>this.apiStub.updateStories
    spy.restore()
  }

  @test('should be defined')
  public testIsDefined() {
    expect(DeployUseCase).not.to.be.undefined
  }

  @test('can be instantiated')
  public testCanInstantiate() {
    let deploy: DeployUseCase = new DeployUseCase(this.apiStub, this.scmStub, this.config)
    expect(deploy).not.to.be.undefined
  }

  @test('can be run')
  public testCanRun() {
    let deploy: DeployUseCase = new DeployUseCase(this.apiStub, this.scmStub, this.config)
    return deploy.run().then((result) => {
      let spy = <SinonSpy><any>this.apiStub.updateStories
      expect(spy.calledOnce).to.be.true
    })
  }

  @test('Will update stories based on current environment and merge state')
  public testUpdatesCorrectStories() {
    // should only update first story based on this
    this.apiStub.story.environment = 'Dev'
    this.apiStub.story2.environment = 'local'
    this.apiStub.story.isMerged = true
    this.apiStub.story2.isMerged = false
    // default config already wants to move stories from Dev to QA
    let deploy: DeployUseCase = new DeployUseCase(this.apiStub, this.scmStub, this.config)

    return deploy.run().then((result) => {
      let spy = <SinonSpy><any>this.apiStub.updateStories
      // get first call, first param
      let storyArray = spy.args[0][0] as Array<Story>
      expect(storyArray.length).to.equal(1)
      let story = storyArray.shift() as Story
      expect(story.environment).to.equal('QA')
    })
  }

  @test('Will not update stories in target environment')
  public testWontModifyUpdatedStories() {
    // both stories will be in target environment
    this.apiStub.story.environment = 'QA'
    this.apiStub.story2.environment = 'QA'
    this.apiStub.story.isMerged = true
    this.apiStub.story2.isMerged = true
    // default config already wants to move stories from Dev to QA
    let deploy: DeployUseCase = new DeployUseCase(this.apiStub, this.scmStub, this.config)

    return deploy.run().then((result) => {
      let spy = <SinonSpy><any>this.apiStub.updateStories
      // get first call, first param
      let storyArray = spy.args[0][0] as Array<Story>
      expect(storyArray.length).to.equal(0)
    })
  }
}
