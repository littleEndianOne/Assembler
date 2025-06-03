"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const asmCodeGenListener_1 = require("../vsmAssembler/asmCodeGenListener");
const asmSymbolTable_1 = require("../vsmAssembler/asmSymbolTable");
describe('asmCodeGenListener Tests', function () {
    let errorLog;
    let byteCode;
    let codeGen;
    let symbolTable;
    this.beforeEach(function () {
        errorLog = [];
        byteCode = new Uint8Array(8);
        symbolTable = new asmSymbolTable_1.asmSymbolTable();
        codeGen = new asmCodeGenListener_1.asmCodeGenListener(byteCode, errorLog, symbolTable);
    });
    describe('writeReferenceAddress() Tests', function () {
        it('should write 0 and add forward reference for udefined name', function () {
            codeGen._byteCode[0] = 255;
            codeGen.writeReference("undefined");
            chai_1.expect(codeGen._pc, "PC not incremented").to.equal(2);
            chai_1.expect(codeGen._byteCode[0], "byte code not generated corectly").to.equal(0);
            chai_1.expect(codeGen._symbolTable._forwardReferences[0].name, "Froward ref name not set ").to.equal("undefined");
            chai_1.expect(codeGen._symbolTable._forwardReferences[0].refFromAddress, "Forward ref address not set").to.equal(0);
            chai_1.expect(errorLog.length, "Unexpected error logged").to.equal(0);
        });
        it('should write address of defined name', function () {
            codeGen._symbolTable._lables["defined"] = 32;
            codeGen.writeReference("defined");
            chai_1.expect(codeGen._pc, "PC not incremented").to.equal(2);
            chai_1.expect(codeGen._byteCode[0], "byte code not generated corectly").to.equal(32);
            chai_1.expect(codeGen._symbolTable._lableCount, "Forward reference should not have been added").to.equal(0);
            chai_1.expect(errorLog.length, "Unexpected error logged").to.equal(0);
        });
    });
});
//# sourceMappingURL=asmCodeGenListenerTests.js.map