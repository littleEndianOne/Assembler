"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const asmSymbolTable_1 = require("../vsmAssembler/asmSymbolTable");
describe('ASM Symbol Table Tests', function () {
    let symbolTable;
    before(function () {
        symbolTable = new asmSymbolTable_1.asmSymbolTable();
    });
    describe('constructor', function () {
        it('creates a valid instance', function () {
            chai_1.expect(symbolTable._lableCount, "The lable count has not 0").to.equal(0);
            chai_1.expect(symbolTable._lables, "Lables obj not initialised").to.be.empty;
            chai_1.expect(symbolTable._forwardReferences.length, "forwardReferenes not empty").to.equal(0);
        });
    });
    describe('resolveForwardReferences with no lables/references', function () {
        it('should not crash when calling resolveForwardReferences when empty', function () {
            let results = symbolTable.resolveForwardReferences();
            chai_1.expect(results.resolved.length, "resolved should be 0").to.equal(0);
            chai_1.expect(results.unresolved.length, "unresolved should be 0").to.equal(0);
        });
    });
    describe('resolve with empty lables dictionary', function () {
        it('return null and add undefined lable to forwardReferences for undefined name', function () {
            chai_1.expect(symbolTable.resolve("testLable0", 32), "Should have returned null").to.equal(null);
            chai_1.expect(symbolTable._forwardReferences.length, "forwardReference should have been added").to.equal(1);
            chai_1.expect(symbolTable._forwardReferences[0].name, "name not set").to.equal("testLable0");
            chai_1.expect(symbolTable._forwardReferences[0].refFromAddress, "refAddress not set").to.equal(32);
        });
    });
    describe('define', function () {
        it('should add a lable to an empty lables table and return true', function () {
            chai_1.expect(symbolTable.define("testLable", 8), "true not returned as expected").to.equal(true);
            chai_1.expect(symbolTable._lableCount, "The lable count has not been invremented").to.equal(1);
            chai_1.expect(symbolTable._lables["testLable"], "Lable not added").to.equal(8);
            chai_1.expect(symbolTable._forwardReferences.length, "forwardReferenes length not as expected").to.equal(1);
        });
        it('should add a lable to a non empty lables table and return true', function () {
            chai_1.expect(symbolTable.define("testLable2", 16), "true not returned as expected").to.equal(true);
            chai_1.expect(symbolTable._lableCount, "The lable count has not been incremented").to.equal(2);
            chai_1.expect(symbolTable._lables["testLable2"], "Lable not added").to.equal(16);
            chai_1.expect(symbolTable._forwardReferences.length, "forwardReferenes length not as expected").to.equal(1);
        });
        it('should not add a lable that already exists and return false', function () {
            chai_1.expect(symbolTable.define("testLable", 2), "false not returned as expected").to.equal(false);
            chai_1.expect(symbolTable._lableCount, "The lable count should not have been incremented").to.equal(2);
            chai_1.expect(symbolTable._lables["testLable"], "Stored lable should not have changed").to.equal(8);
            chai_1.expect(symbolTable._forwardReferences.length, "forwardReferenes length not as expected").to.equal(1);
        });
    });
    describe('resolve', function () {
        it('return the address for a defined lable', function () {
            chai_1.expect(symbolTable.resolve("testLable2", 8), "Expected address not returned").to.equal(16);
            chai_1.expect(symbolTable._forwardReferences.length, "forwardReferences should not have been added to").to.equal(1);
        });
        it('return null and add undefined lable to forwardReferences for first undefined name', function () {
            chai_1.expect(symbolTable.resolve("testLable8", 12), "Should have returned null").to.equal(null);
            chai_1.expect(symbolTable._forwardReferences.length, "forwardReference should have been added").to.equal(2);
            chai_1.expect(symbolTable._forwardReferences[1].name, "name not set").to.equal("testLable8");
            chai_1.expect(symbolTable._forwardReferences[1].refFromAddress, "refAddress not set").to.equal(12);
        });
        it('return null and add undefined lable to forwardReferences for additional name', function () {
            chai_1.expect(symbolTable.resolve("testLable16", 16), "Should have returned null").to.equal(null);
            chai_1.expect(symbolTable._forwardReferences.length, "forwardReference should have been added").to.equal(3);
            chai_1.expect(symbolTable._forwardReferences[2].name, "name not set").to.equal("testLable16");
            chai_1.expect(symbolTable._forwardReferences[2].refFromAddress, "refAddress not set").to.equal(16);
        });
        it('return null and add undefined lable to forwardReferences for same name', function () {
            chai_1.expect(symbolTable.resolve("testLable8", 18), "Should have returned null").to.equal(null);
            chai_1.expect(symbolTable._forwardReferences.length, "forwardReference should have been added").to.equal(4);
            chai_1.expect(symbolTable._forwardReferences[3].name, "name not set").to.equal("testLable8");
            chai_1.expect(symbolTable._forwardReferences[3].refFromAddress, "refAddress not set").to.equal(18);
        });
    });
    describe('resolveForwardReferences', function () {
        it('should return array of resolved & unresoved forward references', function () {
            symbolTable.define("testLable8", 64);
            let results = symbolTable.resolveForwardReferences();
            chai_1.expect(results.resolved.length, "resolved forward references count not as expected").to.equal(2);
            chai_1.expect(results.unresolved.length, "unresolved references count not as expected").to.equal(2);
        });
    });
});
//# sourceMappingURL=symbolTableTests.js.map