import UseCaseDetector from '../../src/util/use-case-detector'
import ScmStub from '../stubs/scm.stub'

import {suite, test} from 'mocha-typescript'
import {expect} from 'chai'
import {spy, SinonSpy} from 'sinon'

@suite
class UseCaseDetectorTest {
  scmStub: ScmStub
  detector: UseCaseDetector
  before() {
    this.scmStub = new ScmStub()
    this.detector = new UseCaseDetector(this.scmStub, [{
      matcher: /release\/[a-zA-Z-]*/g,
      value: 'build-release',
      source: 'branch'
    }, {
      matcher: /Merge\ branch\ 'feature\/([a-zA-Z][\-\ ][0-9]{5}).*'\ into '([a-zA-Z]*)'/,
      value: 'build-merge',
      source: 'commit'
    }, {
      matcher: /feature\/[a-zA-Z][\-\ ][0-9]{5}/g,
      value: 'build-local',
      source: 'branch'
    }])
  }
  @test('should match build-local based on "feature branch" type matcher config')
  public testLocalBranchConfig() {
    this.scmStub.branch = 'feature/B-12345-something'
    this.scmStub.commitMessages.unshift('My Amazing Commit')
    return this.detector.findBuildType().then((type) => {
      expect(type).to.equal('build-local')
    })
  }

  @test('should match build-merge based on "merge commit message" type matcher config')
  public testMergeMessageConfig() {
    this.scmStub.branch = 'dev'
    this.scmStub.commitMessages.unshift(`Merge branch 'feature/B-12334-something' into 'dev'`)
    return this.detector.findBuildType().then((type) => {
      expect(type).to.equal('build-merge')
    })
  }

  @test('should match build-release based on "release branch" type matcher config')
  public testReleaseBranchConfig() {
    this.scmStub.branch = 'release/hoobastank'
    this.scmStub.commitMessages.unshift('Release for July 28th, 2017')
    return this.detector.findBuildType().then((type) => {
      expect(type).to.equal('build-release')
    })
  }

  @test('should return first matching config based on input order')
  public testConfigOrder() {
    let assertFirstConfig = () => {
      // setup a config that will match all cases
      this.scmStub.branch = 'release/hoobastank-feature/B-54321'
      this.scmStub.commitMessages.unshift(`Merge branch 'feature/B-12334-something' into 'dev'`)
      return this.detector.findBuildType().then((type) => {
        // should return first match
        expect(type).to.equal('build-release')
      })
    }
    let assertSecondConfig = () => {
      // setup a config that will match last two configs
      this.scmStub.branch = 'feature/B-54321'
      this.scmStub.commitMessages.unshift(`Merge branch 'feature/B-12334-something' into 'dev'`)
      return this.detector.findBuildType().then((type) => {
        // should return first match
        expect(type).to.equal('build-merge')
      })
    }
    let assertLastConfig = () => {
      // setup a config that will match only the last config
      this.scmStub.branch = 'feature/B-54321'
      this.scmStub.commitMessages.unshift('Sweet Commit')
      return this.detector.findBuildType().then((type) => {
        // should return first match
        expect(type).to.equal('build-local')
      })
    }
    return Promise.all([
      assertFirstConfig(),
      assertSecondConfig(),
      assertLastConfig()
    ])
  }
}
