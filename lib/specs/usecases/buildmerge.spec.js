"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const scm_stub_1 = require("../stubs/scm.stub");
const api_stub_1 = require("../stubs/api.stub");
const build_merge_1 = require("../../src/usecases/build-merge");
const mocha_typescript_1 = require("mocha-typescript");
const chai_1 = require("chai");
const sinon_1 = require("sinon");
let BuildMergeUseCaseTest = class BuildMergeUseCaseTest {
    before() {
        this.scmStub = new scm_stub_1.default();
        this.apiStub = new api_stub_1.default();
        sinon_1.spy(this.apiStub, 'updateStory');
    }
    after() {
        let spy = this.apiStub.updateStory;
        spy.restore();
    }
    testIsDefined() {
        chai_1.expect(build_merge_1.default).not.to.be.undefined;
    }
    testCanInstantiate() {
        let merge = new build_merge_1.default(this.apiStub, this.scmStub);
        chai_1.expect(merge).not.to.be.undefined;
    }
    testCanRun() {
        let merge = new build_merge_1.default(this.apiStub, this.scmStub);
        return merge.run().then((result) => {
            let spy = this.apiStub.updateStory;
            chai_1.expect(spy.calledOnce).to.be.true;
        });
    }
    testUpdateStoryByBranch() {
        // assume branch name is dev, since this would be a post merge build
        this.scmStub.branch = 'dev';
        this.scmStub.sha = 'test-sha';
        let merge = new build_merge_1.default(this.apiStub, this.scmStub);
        return merge.run().then((result) => {
            let spy = this.apiStub.updateStory;
            let story = spy.args[0][0];
            chai_1.expect(story.environment).to.equal('merged');
            chai_1.expect(story.branch).to.equal('dev');
            chai_1.expect(story.lastCommit).to.equal('test-sha');
            chai_1.expect(story.isMerged).to.equal(true);
        });
    }
};
__decorate([
    mocha_typescript_1.test('should be defined'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BuildMergeUseCaseTest.prototype, "testIsDefined", null);
__decorate([
    mocha_typescript_1.test('can be instantiated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BuildMergeUseCaseTest.prototype, "testCanInstantiate", null);
__decorate([
    mocha_typescript_1.test('can be run'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BuildMergeUseCaseTest.prototype, "testCanRun", null);
__decorate([
    mocha_typescript_1.test('Will update story based on branch name'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BuildMergeUseCaseTest.prototype, "testUpdateStoryByBranch", null);
BuildMergeUseCaseTest = __decorate([
    mocha_typescript_1.suite
], BuildMergeUseCaseTest);
