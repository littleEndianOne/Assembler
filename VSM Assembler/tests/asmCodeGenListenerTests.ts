import { expect, assert } from "chai";
import { asmCodeGenListener } from "../vsmAssembler/asmCodeGenListener"
import { instructionLookupTable } from "../vsmAssembler/instructionMapping";
import { ErrorLog } from '../../Utility';
import { Assembler } from "../vsmAssembler/Assembler";
import { semanticErrors } from "../vsmAssembler/asmSemanticErrors";
import { equals } from "antlr4ts/misc/Utils";
import { asmSymbolTable } from "../vsmAssembler/asmSymbolTable";

describe('asmCodeGenListener Tests', function () {
    let errorLog: ErrorLog[];
    let byteCode: Uint8Array;
    let codeGen: asmCodeGenListener;
    let symbolTable: asmSymbolTable;

    this.beforeEach(function () {
        errorLog = [];
        byteCode = new Uint8Array(8);
        symbolTable = new asmSymbolTable();
        codeGen = new asmCodeGenListener(byteCode, errorLog, symbolTable);
    });   

    // describe('writeVariableAddress() Tests', function () {

    //     it('should write a valid address', function () {
    //         expect(codeGen._pc, "PC initial state not 0").to.equal(0);
    //         codeGen.writeVariableAddress("64", null, null);
    //         expect(codeGen._pc, "PC should be incremented").to.equal(1);
    //         expect(codeGen._byteCode[0], "Address not written to byte code").to.equal(64);
    //         expect(errorLog.length, "Unexpected error logged").to.equal(0);
    //     });

    //     it('should write an address of 0', function () {
    //         expect(codeGen._pc, "PC initial state not 0").to.equal(0);
    //         codeGen.writeVariableAddress("0", null, null);
    //         expect(codeGen._pc, "PC should be incremented").to.equal(1);
    //         expect(codeGen._byteCode[0], "Address not written to byte code").to.equal(0);
    //         expect(errorLog.length, "Unexpected error logged").to.equal(0);

    //     });

    //     it('should write an address of 255', function () {
    //         expect(codeGen._pc, "PC initial state not 0").to.equal(0);
    //         codeGen.writeVariableAddress("255", null, null);
    //         expect(codeGen._pc, "PC should be incremented").to.equal(1);
    //         expect(codeGen._byteCode[0], "Address not written to byte code").to.equal(255);
    //         expect(errorLog.length, "Unexpected error logged").to.equal(0);

    //     });

    //     it('should generate out of range error for address above 255', function () {
    //         expect(codeGen._pc, "PC initial state not 0").to.equal(0);
    //         codeGen.writeVariableAddress("256", null, null);
    //         expect(codeGen._pc, "PC should not be incremented").to.equal(0);
    //         expect(codeGen._byteCode[0], "Address should not have been written to byte code").to.equal(0);
    //         expect(errorLog.length, "Unexpected error logged").to.equal(1);
    //         expect(errorLog[0]._name, "Expected error not generated").to.equal(semanticErrors[semanticErrors.outOfRangeForAddress8]);
    //     });

    //     it('should generate out of range error for negative address', function () {
    //         expect(codeGen._pc, "PC initial state not 0").to.equal(0);
    //         codeGen.writeVariableAddress("-1", null, null);
    //         expect(codeGen._pc, "PC should not be incremented").to.equal(0);
    //         expect(codeGen._byteCode[0], "Address not written to byte code").to.equal(0);
    //         expect(errorLog.length, "Unexpected error logged").to.equal(1);
    //         expect(errorLog[0]._name, "Expected error not generated").to.equal(semanticErrors[semanticErrors.outOfRangeForAddress8]);
    //     });

    //     it('should throw an error for non number address', function () {
    //         expect(codeGen._pc, "PC initial state not 0").to.equal(0);
    //         expect(codeGen.writeVariableAddress.bind(codeGen, "Zero"), 'Exception should be thrown').to.throw("not a number");
    //         expect(codeGen._pc, "PC should not be incremented").to.equal(0);
    //         expect(codeGen._byteCode[0], "Address not written to byte code").to.equal(0);
    //         expect(errorLog.length, "Unexpected error logged").to.equal(0);
    //     });
    // });

    describe('writeReferenceAddress() Tests', function () {
        it('should write 0 and add forward reference for udefined name', function () {
            codeGen._byteCode[0] = 255; //Should be set to 0.
            codeGen.writeReference("undefined");
            expect(codeGen._pc, "PC not incremented").to.equal(2);
            expect(codeGen._byteCode[0], "byte code not generated corectly").to.equal(0);
            expect(codeGen._symbolTable._forwardReferences[0].name, "Froward ref name not set ").to.equal("undefined");
            expect(codeGen._symbolTable._forwardReferences[0].refFromAddress, "Forward ref address not set").to.equal(0);
            expect(errorLog.length, "Unexpected error logged").to.equal(0);
        });

        it('should write address of defined name', function () {
            codeGen._symbolTable._lables["defined"] = 32; //Add defined symbol   
            codeGen.writeReference("defined");
            expect(codeGen._pc, "PC not incremented").to.equal(2);
            expect(codeGen._byteCode[0], "byte code not generated corectly").to.equal(32);
            expect(codeGen._symbolTable._lableCount, "Forward reference should not have been added").to.equal(0);
            expect(errorLog.length, "Unexpected error logged").to.equal(0);
        });
    });
});