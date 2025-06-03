"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const __1 = require("../");
var testErrors;
(function (testErrors) {
    testErrors[testErrors["noTagError"] = 0] = "noTagError";
    testErrors[testErrors["oneTagError"] = 1] = "oneTagError";
    testErrors[testErrors["twoTagError"] = 2] = "twoTagError";
    testErrors[testErrors["threeTagError"] = 3] = "threeTagError";
})(testErrors || (testErrors = {}));
let testErrorMsgTemplates = {
    [testErrors.noTagError]: "Error with no tag in msg",
    [testErrors.oneTagError]: "Error with one name tag {name} in msg",
    [testErrors.twoTagError]: "Error with name tag {name} and {expression} in msg",
    [testErrors.threeTagError]: "Error with name tags {name1}, {name2} and {expression} in msg",
};
let errorMsgGen;
describe('Test Error Msg Generator', function () {
    before(function () {
        errorMsgGen = new __1.ErrorMsgGenerator(testErrorMsgTemplates);
    });
    it('Should return msg template for testError.oneTagError with testName inserted', function () {
        let msg = errorMsgGen.getMsg(testErrors.oneTagError, "testName");
        chai_1.expect(msg).to.equal("Error with one name tag {testName} in msg");
    });
    it('Should return msg template for testError.oneTagError with testName2 inserted', function () {
        let msg = errorMsgGen.getMsg(testErrors.oneTagError, "testName2");
        chai_1.expect(msg).to.equal("Error with one name tag {testName2} in msg");
    });
    it('Should return return message for testErrors.twoTagError with two replaced tags', function () {
        let msg = errorMsgGen.getMsg(testErrors.twoTagError, "testNameFilled", "testFunc()+10");
        chai_1.expect(msg).to.equal("Error with name tag {testNameFilled} and {testFunc()+10} in msg");
    });
    it('Should return return message for testErrors.threeTagError with three replaced tags', function () {
        let msg = errorMsgGen.getMsg(testErrors.threeTagError, "testNameFilled1", "testNameFilled2", "testFunc()+10");
        chai_1.expect(msg).to.equal("Error with name tags {testNameFilled1}, {testNameFilled2} and {testFunc()+10} in msg");
    });
    it('Should leave tags unfilled if a replacement isnt provided (insufficient fillers passed)', function () {
        let msg = errorMsgGen.getMsg(testErrors.twoTagError, "testName");
        chai_1.expect(msg).to.equal("Error with name tag {testName} and {expression} in msg");
    });
    it('Should return template msg when tags are passed that are not required', function () {
        let msg = errorMsgGen.getMsg(testErrors.noTagError, "testTag1", "TestTag2", "TestTag3");
        chai_1.expect(msg).to.equal("Error with no tag in msg");
    });
    it('Should return \"Unknown Error\" string for unknown error name', function () {
        let msg = errorMsgGen.getMsg(64, "null");
        chai_1.expect(msg).to.equal("Unknown Error");
    });
    it('should return a string of the enum name for testErrors[testErrors.noTagError] reference', function () {
        let name = testErrors[testErrors.noTagError];
        chai_1.expect(name).to.equal("noTagError");
    });
});
//# sourceMappingURL=ErrorMsgGenTests.js.map