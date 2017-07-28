import ScmStub from '../stubs/scm.stub'
import ApiStub from '../stubs/api.stub'
import BuildLocal from '../../src/usecases/build-local'
import Story from '../../src/entities/Story'

import {suite, test} from 'mocha-typescript'
import {expect} from 'chai'
import {spy, SinonSpy} from 'sinon'

@suite
class BuildLocalUseCaseTest {
  scmStub: ScmStub
  apiStub: ApiStub
  updateStorySpy: SinonSpy
  before() {
    this.scmStub = new ScmStub()
    this.apiStub = new ApiStub()
    spy(this.apiStub, 'updateStory')
  }

  after() {
    let spy = <SinonSpy><any>this.apiStub.updateStory
    spy.restore()
  }

  @test('should be defined')
  public testIsDefined() {
    expect(BuildLocal).not.to.be.undefined
  }

  @test('can be instantiated')
  public testCanInstantiate() {
    let local: BuildLocal = new BuildLocal(this.apiStub, this.scmStub)
    expect(local).not.to.be.undefined
  }

  @test('can be run')
  public testCanRun() {
    let local: BuildLocal = new BuildLocal(this.apiStub, this.scmStub)
    return local.run().then((result) => {
      let spy = <SinonSpy><any>this.apiStub.updateStory
      expect(spy.calledOnce).to.be.true
    })
  }

  @test('Will update story based on branch name')
  public testUpdateStoryByBranch() {
    this.scmStub.branch = 'feature/B-12345-test-branch'
    this.scmStub.sha = 'test-sha'
    // should only update first story based on this
    let local: BuildLocal = new BuildLocal(this.apiStub, this.scmStub)
    return local.run().then((result) => {
      let spy = <SinonSpy><any>this.apiStub.updateStory
      let story = spy.args[0][0] as Story
      expect(story.environment).to.equal('local')
      expect(story.branch).to.equal('feature/B-12345-test-branch')
      expect(story.lastCommit).to.equal('test-sha')
      expect(story.isMerged).to.equal(false)
    })
  }

  @test('Will not update story if lastCommit and scm sha match')
  public testUpdateStoryWithMatchingSha() {
    this.scmStub.branch = 'feature/B-12345-test-branch'
    this.scmStub.sha = 'will-match'
    this.apiStub.story.lastCommit = 'will-match'
    // should only update first story based on this
    let local: BuildLocal = new BuildLocal(this.apiStub, this.scmStub)
    return local.run().catch((e) => {
      expect(e).to.equal('Local Build: Current commit matches existing commit, no update will be performed')
    })
  }
}
