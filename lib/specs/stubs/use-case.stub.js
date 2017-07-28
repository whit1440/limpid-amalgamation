"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const use_case_1 = require("../../src/usecases/base/use-case");
class UseCaseStub extends use_case_1.default {
    run() {
        return new Promise((resolve) => {
            resolve();
        });
    }
}
exports.default = UseCaseStub;
