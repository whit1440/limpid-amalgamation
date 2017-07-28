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
const use_case_detector_1 = require("../../src/util/use-case-detector");
const scm_stub_1 = require("../stubs/scm.stub");
const api_stub_1 = require("../stubs/api.stub");
const use_case_stub_1 = require("../stubs/use-case.stub");
const mocha_typescript_1 = require("mocha-typescript");
const chai_1 = require("chai");
let UseCaseDetectorTest = class UseCaseDetectorTest {
    before() {
        this.apiStub = new api_stub_1.default();
        this.scmStub = new scm_stub_1.default();
        this.releaseUseCase = new use_case_stub_1.default(this.apiStub, this.scmStub);
        this.releaseUseCase.type = 'build-release';
        this.mergeUseCase = new use_case_stub_1.default(this.apiStub, this.scmStub);
        this.mergeUseCase.type = 'build-merge';
        this.localUseCase = new use_case_stub_1.default(this.apiStub, this.scmStub);
        this.localUseCase.type = 'build-local';
        this.detector = new use_case_detector_1.default(this.scmStub, [{
                matcher: /release\/[a-zA-Z-]*/g,
                value: this.releaseUseCase,
                source: 'branch'
            }, {
                matcher: /Merge\ branch\ 'feature\/([a-zA-Z][\-\ ][0-9]{5}).*'\ into '([a-zA-Z]*)'/,
                value: this.mergeUseCase,
                source: 'commit'
            }, {
                matcher: /feature\/[a-zA-Z][\-\ ][0-9]{5}/g,
                value: this.localUseCase,
                source: 'branch'
            }]);
    }
    testLocalBranchConfig() {
        this.scmStub.branch = 'feature/B-12345-something';
        this.scmStub.commitMessages.unshift('My Amazing Commit');
        return this.detector.findBuildType().then((useCase) => {
            chai_1.expect(useCase.type).to.equal('build-local');
        });
    }
    testMergeMessageConfig() {
        this.scmStub.branch = 'dev';
        this.scmStub.commitMessages.unshift(`Merge branch 'feature/B-12334-something' into 'dev'`);
        return this.detector.findBuildType().then((useCase) => {
            chai_1.expect(useCase.type).to.equal('build-merge');
        });
    }
    testReleaseBranchConfig() {
        this.scmStub.branch = 'release/hoobastank';
        this.scmStub.commitMessages.unshift('Release for July 28th, 2017');
        return this.detector.findBuildType().then((useCase) => {
            chai_1.expect(useCase.type).to.equal('build-release');
        });
    }
    testConfigOrder() {
        let assertFirstConfig = () => {
            // setup a config that will match all cases
            this.scmStub.branch = 'release/hoobastank-feature/B-54321';
            this.scmStub.commitMessages.unshift(`Merge branch 'feature/B-12334-something' into 'dev'`);
            return this.detector.findBuildType().then((useCase) => {
                // should return first match
                chai_1.expect(useCase.type).to.equal('build-release');
            });
        };
        let assertSecondConfig = () => {
            // setup a config that will match last two configs
            this.scmStub.branch = 'feature/B-54321';
            this.scmStub.commitMessages.unshift(`Merge branch 'feature/B-12334-something' into 'dev'`);
            return this.detector.findBuildType().then((useCase) => {
                // should return first match
                chai_1.expect(useCase.type).to.equal('build-merge');
            });
        };
        let assertLastConfig = () => {
            // setup a config that will match only the last config
            this.scmStub.branch = 'feature/B-54321';
            this.scmStub.commitMessages.unshift('Sweet Commit');
            return this.detector.findBuildType().then((useCase) => {
                // should return first match
                chai_1.expect(useCase.type).to.equal('build-local');
            });
        };
        return Promise.all([
            assertFirstConfig(),
            assertSecondConfig(),
            assertLastConfig()
        ]);
    }
};
__decorate([
    mocha_typescript_1.test('should match build-local based on "feature branch" type matcher config'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UseCaseDetectorTest.prototype, "testLocalBranchConfig", null);
__decorate([
    mocha_typescript_1.test('should match build-merge based on "merge commit message" type matcher config'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UseCaseDetectorTest.prototype, "testMergeMessageConfig", null);
__decorate([
    mocha_typescript_1.test('should match build-release based on "release branch" type matcher config'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UseCaseDetectorTest.prototype, "testReleaseBranchConfig", null);
__decorate([
    mocha_typescript_1.test('should return first matching config based on input order'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UseCaseDetectorTest.prototype, "testConfigOrder", null);
UseCaseDetectorTest = __decorate([
    mocha_typescript_1.suite
], UseCaseDetectorTest);
