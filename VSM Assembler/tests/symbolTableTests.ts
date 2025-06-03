import { expect } from "chai";
import { asmSymbolTable } from "../vsmAssembler/asmSymbolTable"

describe('ASM Symbol Table Tests', function () {
  let symbolTable: asmSymbolTable;

  before(function () {
    symbolTable = new asmSymbolTable();
  });

  describe('constructor', function () {

    it('creates a valid instance', function () {

      expect(symbolTable._lableCount, "The lable count has not 0").to.equal(0);
      expect(symbolTable._lables, "Lables obj not initialised").to.be.empty;
      expect(symbolTable._forwardReferences.length, "forwardReferenes not empty").to.equal(0);

    });
  });

  describe('resolveForwardReferences with no lables/references', function () {
    it('should not crash when calling resolveForwardReferences when empty', function () {
      let results = symbolTable.resolveForwardReferences();

      expect(results.resolved.length, "resolved should be 0").to.equal(0);
      expect(results.unresolved.length, "unresolved should be 0").to.equal(0);
    });
  });

  describe('resolve with empty lables dictionary', function () {

    it('return null and add undefined lable to forwardReferences for undefined name', function () {

      expect(symbolTable.resolve("testLable0", 32), "Should have returned null").to.equal(null);
      expect(symbolTable._forwardReferences.length, "forwardReference should have been added").to.equal(1);

      expect(symbolTable._forwardReferences[0].name, "name not set").to.equal("testLable0");
      expect(symbolTable._forwardReferences[0].refFromAddress, "refAddress not set").to.equal(32);

    });
  });

  describe('define', function () {

    it('should add a lable to an empty lables table and return true', function () {

      expect(symbolTable.define("testLable", 8), "true not returned as expected").to.equal(true);

      expect(symbolTable._lableCount, "The lable count has not been invremented").to.equal(1);
      expect(symbolTable._lables["testLable"], "Lable not added").to.equal(8);

      expect(symbolTable._forwardReferences.length, "forwardReferenes length not as expected").to.equal(1);
    });

    it('should add a lable to a non empty lables table and return true', function () {

      expect(symbolTable.define("testLable2", 16), "true not returned as expected").to.equal(true);

      expect(symbolTable._lableCount, "The lable count has not been incremented").to.equal(2);
      expect(symbolTable._lables["testLable2"], "Lable not added").to.equal(16);

      expect(symbolTable._forwardReferences.length, "forwardReferenes length not as expected").to.equal(1);
    });

    it('should not add a lable that already exists and return false', function () {

      expect(symbolTable.define("testLable", 2), "false not returned as expected").to.equal(false);

      expect(symbolTable._lableCount, "The lable count should not have been incremented").to.equal(2);
      expect(symbolTable._lables["testLable"], "Stored lable should not have changed").to.equal(8);

      expect(symbolTable._forwardReferences.length, "forwardReferenes length not as expected").to.equal(1);
    });
  });

  describe('resolve', function () {

    it('return the address for a defined lable', function () {

      expect(symbolTable.resolve("testLable2", 8), "Expected address not returned").to.equal(16);
      expect(symbolTable._forwardReferences.length, "forwardReferences should not have been added to").to.equal(1);

    });

    it('return null and add undefined lable to forwardReferences for first undefined name', function () {

      expect(symbolTable.resolve("testLable8", 12), "Should have returned null").to.equal(null);
      expect(symbolTable._forwardReferences.length, "forwardReference should have been added").to.equal(2);

      expect(symbolTable._forwardReferences[1].name, "name not set").to.equal("testLable8");
      expect(symbolTable._forwardReferences[1].refFromAddress, "refAddress not set").to.equal(12);

    });

    it('return null and add undefined lable to forwardReferences for additional name', function () {

      expect(symbolTable.resolve("testLable16", 16), "Should have returned null").to.equal(null);
      expect(symbolTable._forwardReferences.length, "forwardReference should have been added").to.equal(3);

      expect(symbolTable._forwardReferences[2].name, "name not set").to.equal("testLable16");
      expect(symbolTable._forwardReferences[2].refFromAddress, "refAddress not set").to.equal(16);

    });

    it('return null and add undefined lable to forwardReferences for same name', function () {

      expect(symbolTable.resolve("testLable8", 18), "Should have returned null").to.equal(null);
      expect(symbolTable._forwardReferences.length, "forwardReference should have been added").to.equal(4);

      expect(symbolTable._forwardReferences[3].name, "name not set").to.equal("testLable8");
      expect(symbolTable._forwardReferences[3].refFromAddress, "refAddress not set").to.equal(18);

    });

  });

  describe('resolveForwardReferences', function () {

    it('should return array of resolved & unresoved forward references', function () {

      //Define undfined lables for forward lookup resolution.
      symbolTable.define("testLable8", 64);

      let results = symbolTable.resolveForwardReferences();
      
      expect(results.resolved.length, "resolved forward references count not as expected").to.equal(2);
      expect(results.unresolved.length, "unresolved references count not as expected").to.equal(2);

    });
  }); 


});
