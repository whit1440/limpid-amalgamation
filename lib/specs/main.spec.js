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
const mocha_typescript_1 = require("mocha-typescript");
const main_1 = require("../src/app/main");
const config_reader_stub_1 = require("./stubs/config-reader.stub");
const chai_1 = require("chai");
let MainTest = class MainTest {
    test() {
        chai_1.expect(main_1.default).not.to.be.undefined;
    }
    testCanInstantiate() {
        let reader = new main_1.AppConfigReader(`${__dirname}/test-config.json`);
        let app = new main_1.default(reader);
        return app.setup().then((config) => {
            chai_1.expect(config).not.to.be.undefined;
        });
    }
    testCanConfigure() {
        let reader = new main_1.AppConfigReader(`${__dirname}/test-config.json`);
        let app = new main_1.default(reader);
        return app.setup().then((config) => {
            chai_1.expect(config.api.path).to.equal('/CapellaUniversity01');
            chai_1.expect(config.api.host).to.equal('www12.v1host.com');
        });
    }
    testFailedConfig() {
        let reader = new config_reader_stub_1.default();
        reader.inputConfig.api.host = undefined;
        let app = new main_1.default(reader);
        return app.setup().then((config) => {
            chai_1.expect(config.api.path).to.equal('/CapellaUniversity01');
            chai_1.expect(config.api.host).to.equal('www12.v1host.com');
        });
    }
};
__decorate([
    mocha_typescript_1.test('should be defined'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MainTest.prototype, "test", null);
__decorate([
    mocha_typescript_1.test('can be instantiated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MainTest.prototype, "testCanInstantiate", null);
__decorate([
    mocha_typescript_1.test('configures correctly'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MainTest.prototype, "testCanConfigure", null);
__decorate([
    mocha_typescript_1.test('fails for missing config'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MainTest.prototype, "testFailedConfig", null);
MainTest = __decorate([
    mocha_typescript_1.suite
], MainTest);
