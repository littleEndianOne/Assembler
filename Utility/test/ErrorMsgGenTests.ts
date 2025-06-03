import { expect } from "chai";
import { ErrorMsgGenerator, IError } from "../";

enum testErrors {
    noTagError,
    oneTagError, 
    twoTagError,
    threeTagError,
}

let testErrorMsgTemplates: IError = {
    [testErrors.noTagError]: "Error with no tag in msg",
    [testErrors.oneTagError]: "Error with one name tag {name} in msg",
    [testErrors.twoTagError]: "Error with name tag {name} and {expression} in msg",
    [testErrors.threeTagError]: "Error with name tags {name1}, {name2} and {expression} in msg",
    };

    let errorMsgGen: ErrorMsgGenerator<testErrors>;

describe('Test Error Msg Generator', function () {

    //instatiate the msg generator
    before(function() {
        errorMsgGen = new ErrorMsgGenerator(testErrorMsgTemplates);
    });

    it('Should return msg template for testError.oneTagError with testName inserted', function () {      

        let msg = errorMsgGen.getMsg(testErrors.oneTagError, "testName");
        expect(msg).to.equal("Error with one name tag {testName} in msg");
    });

    it('Should return msg template for testError.oneTagError with testName2 inserted', function () {

        let msg = errorMsgGen.getMsg(testErrors.oneTagError, "testName2");
        expect(msg).to.equal("Error with one name tag {testName2} in msg");
    });

    it('Should return return message for testErrors.twoTagError with two replaced tags', function () {

        let msg = errorMsgGen.getMsg(testErrors.twoTagError, "testNameFilled", "testFunc()+10");
        expect(msg).to.equal("Error with name tag {testNameFilled} and {testFunc()+10} in msg");
    });

    it('Should return return message for testErrors.threeTagError with three replaced tags', function () {

        let msg = errorMsgGen.getMsg(testErrors.threeTagError, "testNameFilled1", "testNameFilled2", "testFunc()+10");
        expect(msg).to.equal("Error with name tags {testNameFilled1}, {testNameFilled2} and {testFunc()+10} in msg");
    });

    it('Should leave tags unfilled if a replacement isnt provided (insufficient fillers passed)', function () {

        let msg = errorMsgGen.getMsg(testErrors.twoTagError, "testName");
        expect(msg).to.equal("Error with name tag {testName} and {expression} in msg");
    });

    it('Should return template msg when tags are passed that are not required', function () {

        let msg = errorMsgGen.getMsg(testErrors.noTagError, "testTag1", "TestTag2", "TestTag3");
        expect(msg).to.equal("Error with no tag in msg");
    });

    it('Should return \"Unknown Error\" string for unknown error name', function () {
        let msg = errorMsgGen.getMsg(64, "null");
        expect(msg).to.equal("Unknown Error");
    });

    it('should return a string of the enum name for testErrors[testErrors.noTagError] reference', function () {
        let name = testErrors[testErrors.noTagError];
        expect(name).to.equal("noTagError");
    });

});


