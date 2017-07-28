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
const deploy_1 = require("../../src/usecases/deploy");
const mocha_typescript_1 = require("mocha-typescript");
const chai_1 = require("chai");
const sinon_1 = require("sinon");
let DeployUseCaseTest = class DeployUseCaseTest {
    before() {
        this.scmStub = new scm_stub_1.default();
        this.apiStub = new api_stub_1.default();
        sinon_1.spy(this.apiStub, 'updateStories');
        this.config = {
            targetTier: 'QA',
            previousTier: 'Dev',
            sprintSchedule: 'Test',
            sprintName: 'Test',
        };
    }
    after() {
        let spy = this.apiStub.updateStories;
        spy.restore();
    }
    testIsDefined() {
        chai_1.expect(deploy_1.default).not.to.be.undefined;
    }
    testCanInstantiate() {
        let deploy = new deploy_1.default(this.apiStub, this.scmStub, this.config);
        chai_1.expect(deploy).not.to.be.undefined;
    }
    testCanRun() {
        let deploy = new deploy_1.default(this.apiStub, this.scmStub, this.config);
        return deploy.run().then((result) => {
            let spy = this.apiStub.updateStories;
            chai_1.expect(spy.calledOnce).to.be.true;
        });
    }
    testUpdatesCorrectStories() {
        // should only update first story based on this
        this.apiStub.story.environment = 'Dev';
        this.apiStub.story2.environment = 'local';
        this.apiStub.story.isMerged = true;
        this.apiStub.story2.isMerged = false;
        // default config already wants to move stories from Dev to QA
        let deploy = new deploy_1.default(this.apiStub, this.scmStub, this.config);
        return deploy.run().then((result) => {
            let spy = this.apiStub.updateStories;
            // get first call, first param
            let storyArray = spy.args[0][0];
            chai_1.expect(storyArray.length).to.equal(1);
            let story = storyArray.shift();
            chai_1.expect(story.environment).to.equal('QA');
        });
    }
    testWontModifyUpdatedStories() {
        // both stories will be in target environment
        this.apiStub.story.environment = 'QA';
        this.apiStub.story2.environment = 'QA';
        this.apiStub.story.isMerged = true;
        this.apiStub.story2.isMerged = true;
        // default config already wants to move stories from Dev to QA
        let deploy = new deploy_1.default(this.apiStub, this.scmStub, this.config);
        return deploy.run().then((result) => {
            let spy = this.apiStub.updateStories;
            // get first call, first param
            let storyArray = spy.args[0][0];
            chai_1.expect(storyArray.length).to.equal(0);
        });
    }
};
__decorate([
    mocha_typescript_1.test('should be defined'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DeployUseCaseTest.prototype, "testIsDefined", null);
__decorate([
    mocha_typescript_1.test('can be instantiated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DeployUseCaseTest.prototype, "testCanInstantiate", null);
__decorate([
    mocha_typescript_1.test('can be run'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DeployUseCaseTest.prototype, "testCanRun", null);
__decorate([
    mocha_typescript_1.test('Will update stories based on current environment and merge state'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DeployUseCaseTest.prototype, "testUpdatesCorrectStories", null);
__decorate([
    mocha_typescript_1.test('Will not update stories in target environment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DeployUseCaseTest.prototype, "testWontModifyUpdatedStories", null);
DeployUseCaseTest = __decorate([
    mocha_typescript_1.suite
], DeployUseCaseTest);
