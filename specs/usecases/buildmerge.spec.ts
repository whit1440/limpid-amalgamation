import ScmStub from '../stubs/scm.stub'
import ApiStub from '../stubs/api.stub'
import BuildMerge from '../../src/usecases/build-merge'
import Story from '../../src/entities/Story'

import {suite, test} from 'mocha-typescript'
import {expect} from 'chai'
import {spy, SinonSpy} from 'sinon'

@suite
class BuildMergeUseCaseTest {
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
    expect(BuildMerge).not.to.be.undefined
  }

  @test('can be instantiated')
  public testCanInstantiate() {
    let merge: BuildMerge = new BuildMerge(this.apiStub, this.scmStub)
    expect(merge).not.to.be.undefined
  }

  @test('can be run')
  public testCanRun() {
    let merge: BuildMerge = new BuildMerge(this.apiStub, this.scmStub)
    return merge.run().then((result) => {
      let spy = <SinonSpy><any>this.apiStub.updateStory
      expect(spy.calledOnce).to.be.true
    })
  }

  @test('Will update story based on branch name')
  public testUpdateStoryByBranch() {
    // assume branch name is dev, since this would be a post merge build
    this.scmStub.branch = 'dev'
    this.scmStub.sha = 'test-sha'
    let merge: BuildMerge = new BuildMerge(this.apiStub, this.scmStub)
    return merge.run().then((result) => {
      let spy = <SinonSpy><any>this.apiStub.updateStory
      let story = spy.args[0][0] as Story
      expect(story.environment).to.equal('merged')
      expect(story.branch).to.equal('dev')
      expect(story.lastCommit).to.equal('test-sha')
      expect(story.isMerged).to.equal(true)
    })
  }
}
