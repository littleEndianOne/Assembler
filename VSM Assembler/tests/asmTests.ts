import { expect } from "chai";
import { asmCodeGenListener } from "../vsmAssembler/asmCodeGenListener"
import { instructionLookupTable } from "../vsmAssembler/instructionMapping";
import { ErrorLog, errorTypes, TypeLimits } from '../../Utility';
import { semanticErrors } from "../vsmAssembler/asmSemanticErrors";
import { Assembler } from "../vsmAssembler/Assembler";

describe('Assembler Tests', function () {
    let assembler: Assembler;
    let errorLog: ErrorLog[] = [];
    this.beforeAll(function () {
    });

    describe('Generate byte code for CONSTFN# opcodes', function () {

        it('Should generated correct byte codes for opcodes with no parameters', function () {
            let asm = "CONSTFN0 \n CONSTFN1 \n CONSTFN2 \n CONSTFN3 \n CONSTFN4 \n CONSTFN5 \n CONSTFN6 \n CONSTFN7 \n CONSTFN8 \n CONSTFN9 \n CONSTFN10\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(4);
            expect(byteCode[1], "Incorrect bytecode generated").to.equal(5);
            expect(byteCode[2], "Incorrect bytecode generated").to.equal(6);
            expect(byteCode[3], "Incorrect bytecode generated").to.equal(7);
            expect(byteCode[4], "Incorrect bytecode generated").to.equal(8);
            expect(byteCode[5], "Incorrect bytecode generated").to.equal(9);
            expect(byteCode[6], "Incorrect bytecode generated").to.equal(10);
            expect(byteCode[7], "Incorrect bytecode generated").to.equal(11);
            expect(byteCode[8], "Incorrect bytecode generated").to.equal(12);
            expect(byteCode[9], "Incorrect bytecode generated").to.equal(13);
            expect(byteCode[10], "Incorrect bytecode generated").to.equal(14);
        });
    });

    describe('Opcodes with no args called with args', function () {
        it('Arg count mismatch for 1 arg', function () {
            let asm = "CONSTFN0 32 \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "Error should be generated").to.equal(1);
            expect(errorLog[0].name).to.equal(semanticErrors[semanticErrors.argCountMismatch]);
            expect(byteCode[0], "Incorrect opcode").to.equal(4);
            expect(assembler._codeGenListener._pc).to.equal(1);
        });

        it('Arg count mismatch for 2 arg', function () {
            let asm = "CONSTFN0 32, 64 \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "Error should be generated").to.equal(1);
            expect(errorLog[0].name).to.equal(semanticErrors[semanticErrors.argCountMismatch]);
            expect(byteCode[0], "Incorrect opcode").to.equal(4);
            expect(assembler._codeGenListener._pc).to.equal(1);
        });
    });

    describe('Generate byte code for Arithmetic opcodes', function () {

        it('Int Ops', function () {

            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let asm = "ADDI \n SUBI \n DIVI \n MULI \n EQI \n LTI \n GTI \n NEQI \n";
            let assembler = new Assembler(asm, byteCode, errorLog);
            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(28);
            expect(byteCode[1], "Incorrect bytecode generated").to.equal(29);
            expect(byteCode[2], "Incorrect bytecode generated").to.equal(30);
            expect(byteCode[3], "Incorrect bytecode generated").to.equal(31);
            expect(byteCode[4], "Incorrect bytecode generated").to.equal(32);
            expect(byteCode[5], "Incorrect bytecode generated").to.equal(33);
            expect(byteCode[6], "Incorrect bytecode generated").to.equal(34);
            expect(byteCode[7], "Incorrect bytecode generated").to.equal(35);
        });

        it('Float Ops', function () {
            let asm = "ADDF \n SUBF \n DIVF \n MULF \n EQF \n LTF \n GTF \n NEQF \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);
            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(20);
            expect(byteCode[1], "Incorrect bytecode generated").to.equal(21);
            expect(byteCode[2], "Incorrect bytecode generated").to.equal(22);
            expect(byteCode[3], "Incorrect bytecode generated").to.equal(23);
            expect(byteCode[4], "Incorrect bytecode generated").to.equal(24);
            expect(byteCode[5], "Incorrect bytecode generated").to.equal(25);
            expect(byteCode[6], "Incorrect bytecode generated").to.equal(26);
            expect(byteCode[7], "Incorrect bytecode generated").to.equal(27);
        });
    });

    describe('Test lable definition', function () {

        it('should add symbol to symbol table for valid lable', function () {
            let asm = "TestLable:\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(assembler._symbolTable._lableCount, "Symbol should have been added").to.equal(1);
            expect(assembler._symbolTable._lables["TestLable"], "Symbol not retrievable").to.not.equal(undefined);
        });

        it('should add symbol to symbol table for lable at address 2', function () {
            let asm = "CONSTIN0\n CONSTIN0\n TestLable:\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(assembler._symbolTable._lableCount, "Symbol should have been added").to.equal(1);
            expect(assembler._symbolTable._lables["TestLable"], "Symbol value not correct").to.equal(2);
        });

        it('should generate error for duplicate lable name', function () {
            let asm = "CONSTIN0\n TestLable: \n CONSTIN0\n TestLable:\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "Error should be generated").to.equal(1);
            expect(errorLog[0].name, "Incorect error generated").to.equal(semanticErrors[semanticErrors.lableAlreadyExists]);
            expect(assembler._symbolTable._lableCount, "1 Symbol should have been added").to.equal(1);
        });
    });

    describe('Test references & forward references resolution', function () {

        it('should resolve a lable reference', function () {
            let asm = "CONSTFN1 \n  LOOP: \n CONSTFN1 \n ADDF \n JMP LOOP\n HALT\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(assembler._symbolTable._lableCount, "Symbol should have been added").to.equal(1);

            //check code for jump dest
            expect(byteCode[4], "Reference address incorrect in byte code").to.equal(1);
        });

        it('should resolve forward reference', function () {
            let asm = "CONSTFN0\n JMP END\n CONSTFN1\n CONSTFN2\n CONSTFN3\n END:\n HALT\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(assembler._symbolTable._lableCount, "Symbol should have been added").to.equal(1);

            //check code for jump dest
            expect(byteCode[2], "Reference address incorrect in byte code").to.equal(7);
        });

        it('should resolve forward reference to 2B address', function () {
            let asm = "CONSTFN0\n JMP END\n CONSTFN1\n CONSTFN2\n CONSTFN3\n END:\n HALT\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(assembler._symbolTable._lableCount, "Symbol should have been added").to.equal(1);

            //check code for jump dest
            expect(byteCode[2], "Reference address incorrect in byte code").to.equal(7);
        });

        it('should generate error for an unresolved forwared reference', function () {
            let asm = "CONSTFN0\n JMP END\n CONSTFN1\n JMP TEST \n CONSTFN2\n CONSTFN3\n END:\n HALT\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(assembler._symbolTable._lableCount, "One symbol should have been added").to.equal(1);           
            expect(errorLog.length, "Error should have been generated").to.equal(1);           
            expect(errorLog[0].name, "Incorect error generated").to.equal(semanticErrors[semanticErrors.unresolvedReference]); 
        });

        it('should generate multiple errors for multiple unresolved forwared references', function () {
            let asm = "CONSTFN0\n JMP END\n CONSTFN1\n JMP TEST \n CONSTFN2\n CONSTFN3\n END:\n JMP REF \n JMPT BEGIN\n HALT\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(assembler._symbolTable._lableCount, "One symbol should have been added").to.equal(1);           
            expect(errorLog.length, "Error should have been generated").to.equal(3);           
            expect(errorLog[0].name, "Incorect error generated").to.equal(semanticErrors[semanticErrors.unresolvedReference]); 
            expect(errorLog[1].name, "Incorect error generated").to.equal(semanticErrors[semanticErrors.unresolvedReference]); 
            expect(errorLog[2].name, "Incorect error generated").to.equal(semanticErrors[semanticErrors.unresolvedReference]); 
        });
    });

    describe('Generate byte code for CONSTF opcode', function () {

        it('Generate byte code for CONSTF with valid float', function () {
            let numToPush = Math.fround(2048 / 3); //Generate a 32bit float value.
            let asm = "CONSTF " + numToPush + "\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(1);
            expect(assembler._codeGenListener._pc).to.equal(5);
            //extract written bytes and recombine into float32 value.
            let view = new DataView(byteCode.buffer, 1, 4);
            let numRead = view.getFloat32(0, true);
            expect(numRead, "Float number no written correctly").to.equal(numToPush);
        });

        it('Generate byte code for CONSTF with negative float', function () {
            let numToPush = Math.fround(-2048 / 3); //Generate a 32bit float value.
            let asm = "CONSTF " + numToPush + "\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(1);
            expect(assembler._codeGenListener._pc).to.equal(5);
            //extract written bytes and recombine into float32 value.
            let view = new DataView(byteCode.buffer, 1, 4);
            let numRead = view.getFloat32(0, true);
            expect(numRead, "Float number no written correctly").to.equal(numToPush);
        });

        it('Generate byte code for CONSTF 0.0', function () {
            let numToPush = 0.0; //Generate a 32bit float value.
            let asm = "CONSTF " + "0.0" + "\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(1);
            expect(assembler._codeGenListener._pc).to.equal(5);
            //extract written bytes and recombine into float32 value.
            let view = new DataView(byteCode.buffer, 1, 4);
            let numRead = view.getFloat32(0);
            expect(numRead, "Float number no written correctly").to.equal(0);
        });

        it('Generate byte code for CONSTF 0', function () {
            let asm = "CONSTF " + "0" + "\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(1);
            expect(assembler._codeGenListener._pc).to.equal(5);
            //extract written bytes and recombine into float32 value.
            let view = new DataView(byteCode.buffer, 1, 4);
            let numRead = view.getFloat32(0);
            expect(numRead, "Float number no written correctly").to.equal(0);
        });

        it('Generate type mismatch error for TEXT arg', function () {
            let asm = "CONSTF " + "Car" + "\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "A error should be generated").to.equal(1);
            expect(errorLog[0].name).to.equal(semanticErrors[semanticErrors.argTypeMismatch]);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(1);
            expect(assembler._codeGenListener._pc).to.equal(1);
            //extract written bytes and recombine into float32 value.
            let view = new DataView(byteCode.buffer, 1, 4);
        });

        it('Generate arg count mismatch error for incorect number of args', function () {
            let asm = "CONSTF " + "64, 32" + "\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "A error should be generated").to.equal(1);
            expect(errorLog[0].name).to.equal(semanticErrors[semanticErrors.argCountMismatch]);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(1);
            expect(assembler._codeGenListener._pc).to.equal(1);
            //extract written bytes and recombine into float32 value.
            let view = new DataView(byteCode.buffer, 1, 4);
        });
    });

    describe('Generate byte code for CONSTI opcode', function () {

        it('Generate byte code for CONSTI with valid int', function () {
            let numToPush = 48128; //Generate a 32bit float value.
            let asm = "CONSTI " + numToPush + "\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(15);
            expect(assembler._codeGenListener._pc).to.equal(5);
            //extract written bytes and recombine into float32 value.
            let view = new DataView(byteCode.buffer, 1, 4);
            let numRead = view.getInt32(0, true);
            expect(numRead, "Int number not written correctly").to.equal(numToPush);
        });

        it('Generate byte code for CONSTI with valid negative int', function () {
            let numToPush = -32256; //Generate a 32bit float value.
            let asm = "CONSTI " + numToPush + "\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(15);
            expect(assembler._codeGenListener._pc).to.equal(5);
            //extract written bytes and recombine into float32 value.
            let view = new DataView(byteCode.buffer, 1, 4);
            let numRead = view.getInt32(0, true);
            expect(numRead, "Int number not written correctly").to.equal(numToPush);
        });

        it('Generate byte code for CONSTI 0', function () {
            let asm = "CONSTI " + "0" + "\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(15);
            expect(assembler._codeGenListener._pc).to.equal(5);
            //extract written bytes and recombine into float32 value.
            let view = new DataView(byteCode.buffer, 1, 4);
            let numRead = view.getInt32(0, true);
            expect(numRead, "Int number no written correctly").to.equal(0);
        });

        it('CONSTI Generate byte code for int32 max', function () {
            let num = TypeLimits.Int32_Max;
            let asm = "CONSTI " + num + "\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(15);
            expect(assembler._codeGenListener._pc).to.equal(5);
            //extract written bytes and recombine into float32 value.
            let view = new DataView(byteCode.buffer, 1, 4);
            let numRead = view.getInt32(0, true);
            expect(numRead, "Int number no written correctly").to.equal(num);
        });

        it('CONSTI Generate byte code for int32 min', function () {
            let num = TypeLimits.Int32_Min;
            let asm = "CONSTI " + num + "\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(15);
            expect(assembler._codeGenListener._pc).to.equal(5);
            //extract written bytes and recombine into float32 value.
            let view = new DataView(byteCode.buffer, 1, 4);
            let numRead = view.getInt32(0, true);
            expect(numRead, "Int number no written correctly").to.equal(num);
        });

        it('CONSTI Generate error for int over int32 max', function () {
            let max = TypeLimits.Int32_Max + 1;
            let asm = "CONSTI " + max.toString() + "\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);
            expect(errorLog.length, "Expected error").to.equal(1);
            expect(assembler._codeGenListener._pc).to.equal(1);
            expect(errorLog[0].name, "Incorrect error generated").to.equal(semanticErrors[semanticErrors.outOfRange]);
        });

        it('CONSTI Generate error for int under int32 min', function () {
            let num = TypeLimits.Int32_Min - 1;
            let asm = "CONSTI " + num.toString() + "\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);
            expect(errorLog.length, "Expected error").to.equal(1);
            expect(assembler._codeGenListener._pc).to.equal(1);
            expect(errorLog[0].name, "Incorrect error generated").to.equal(semanticErrors[semanticErrors.outOfRange]);
        });
    });

    describe('Test CONSTI8 opcode', function () {
        it('CONSTI8 Generate byte code for CONSTI8 positive integer', function () {
            let asm = "CONSTI8 64\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(16);
            expect(assembler._codeGenListener._pc).to.equal(2);
            //extract written bytes and recombine into float32 value.
            let view = new DataView(byteCode.buffer, 1, 1);
            let numRead = view.getInt8(0);
            expect(numRead, "Number not written correctly").to.equal(64);
        });

        it('CONSTI8 Generate byte code for Max value int8 127', function () {
            let asm = "CONSTI8 127\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(16);
            expect(assembler._codeGenListener._pc).to.equal(2);
            let view = new DataView(byteCode.buffer, 1, 1);
            let numRead = view.getInt8(0);
            expect(numRead, "Float number no written correctly").to.equal(127);
        });

        it('CONSTI8 Generate byte code for Min int8 value -128', function () {
            let asm = "CONSTI8 -128\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(16);
            expect(assembler._codeGenListener._pc).to.equal(2);
            let view = new DataView(byteCode.buffer, 1, 4);
            let numRead = view.getInt8(0);
            expect(numRead, "Float number no written correctly").to.equal(-128);
        });

        it('CONSTI8 Generate error for int over int8 max 130', function () {
            let asm = "CONSTI8 128\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);
            expect(errorLog.length, "Expected error").to.equal(1);
            expect(assembler._codeGenListener._pc).to.equal(1);
            expect(errorLog[0].name, "Incorect error generated").to.equal(semanticErrors[semanticErrors.outOfRange]);
        });

        it('CONSTI8 Generate error for int under min: CONSTI8 -130', function () {
            let asm = "CONSTI8 -129\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);
            expect(errorLog.length, "Expected error").to.equal(1);
            expect(assembler._codeGenListener._pc).to.equal(1);
            expect(errorLog[0].name, "Incorect error generated").to.equal(semanticErrors[semanticErrors.outOfRange]);
        });
    });

    describe('Test CONSTI16 opcode', function () {
        it('CONSTI16 Generate byte code for positive integer', function () {
            let asm = "CONSTI16 5056\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(17);
            expect(assembler._codeGenListener._pc).to.equal(3);
            let view = new DataView(byteCode.buffer, 1, 2);
            let numRead = view.getInt16(0, true);
            expect(numRead, "Number no written correctly").to.equal(5056);
        });

        it('CONSTI16 Generate byte code for negative integer', function () {
            let asm = "CONSTI16 -5054\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(17);
            expect(assembler._codeGenListener._pc).to.equal(3);
            let view = new DataView(byteCode.buffer, 1, 2);
            let numRead = view.getInt16(0, true);
            expect(numRead, "Number no written correctly").to.equal(-5054);
        });

        it('CONSTI16 Generate byte code for 0', function () {
            let asm = "CONSTI16 0\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(17);
            expect(assembler._codeGenListener._pc).to.equal(3);
            let view = new DataView(byteCode.buffer, 1, 2);
            let numRead = view.getInt16(0, true);
            expect(numRead, "Number no written correctly").to.equal(0);
        });

        it('CONSTI16 Generate byte code for Max int16 value', function () {
            let num = TypeLimits.Int16_Max;
            let asm = "CONSTI16 " + num + "\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(17);
            expect(assembler._codeGenListener._pc).to.equal(3);
            let view = new DataView(byteCode.buffer, 1, 2);
            let numRead = view.getInt16(0, true);
            expect(numRead, "Number no written correctly").to.equal(num);
        });

        it('CONSTI16 Generate byte code for Min int16 value', function () {
            let num = TypeLimits.Int16_Min;
            let asm = "CONSTI16 " + num + "\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(17);
            expect(assembler._codeGenListener._pc).to.equal(3);
            let view = new DataView(byteCode.buffer, 1, 2);
            let numRead = view.getInt16(0, true);
            expect(numRead, "Number not written correctly").to.equal(num);
        });

        it('CONSTI16 Generate error for int over max int16', function () {
            let num = TypeLimits.Int16_Max + 1;
            let asm = "CONSTI16 " + num + "\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);
            expect(errorLog.length, "Expected error").to.equal(1);
            expect(assembler._codeGenListener._pc).to.equal(1);
            expect(errorLog[0].name, "Incorrect error generated").to.equal(semanticErrors[semanticErrors.outOfRange]);
        });

        it('CONSTI16 Generate error for int under min int16', function () {
            let num = TypeLimits.Int16_Min - 1;
            let asm = "CONSTI16 " + num + "\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);
            expect(errorLog.length, "Expected error").to.equal(1);
            expect(assembler._codeGenListener._pc).to.equal(1);
            expect(errorLog[0].name, "Incorrect error generated").to.equal(semanticErrors[semanticErrors.outOfRange]);

        });
    });

    describe('Test CONSTF8 opcode', function () {
        it('CONSTF8 Generate byte code for CONSTF8 positive integer', function () {
            let asm = "CONSTF8 64\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(2);
            expect(assembler._codeGenListener._pc).to.equal(2);
            let view = new DataView(byteCode.buffer, 1, 1);
            let numRead = view.getInt8(0);
            expect(numRead, "Float number no written correctly").to.equal(64);
        });

        it('CONSTF8 Generate byte code for CONSTF8 negative integer', function () {
            let asm = "CONSTF8 -64\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(2);
            expect(assembler._codeGenListener._pc).to.equal(2);
            let view = new DataView(byteCode.buffer, 1, 1);
            let numRead = view.getInt8(0);
            expect(numRead, "Float number no written correctly").to.equal(-64);
        });

        it('CONSTF8 Generate byte code for CONSTF8 0', function () {
            let asm = "CONSTF8 0\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(2);
            expect(assembler._codeGenListener._pc).to.equal(2);
            let view = new DataView(byteCode.buffer, 1, 1);
            let numRead = view.getInt8(0);
            expect(numRead, "Float number no written correctly").to.equal(0);
        });

        it('CONSTF8 Generate byte code for Max value CONSTF8 127', function () {
            let asm = "CONSTF8 127\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(2);
            expect(assembler._codeGenListener._pc).to.equal(2);
            let view = new DataView(byteCode.buffer, 1, 1);
            let numRead = view.getInt8(0);
            expect(numRead, "Float number no written correctly").to.equal(127);
        });

        it('CONSTF8 Generate byte code for Min value CONSTF8 -128', function () {
            let asm = "CONSTF8 -128\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(2);
            expect(assembler._codeGenListener._pc).to.equal(2);
            let view = new DataView(byteCode.buffer, 1, 4);
            let numRead = view.getInt8(0);
            expect(numRead, "Float number no written correctly").to.equal(-128);
        });

        it('CONSTF8 Generate error for int over max: CONSTF8 130', function () {
            let asm = "CONSTF8 130\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);
            expect(errorLog.length, "Expected error").to.equal(1);
            expect(assembler._codeGenListener._pc).to.equal(1);
            expect(errorLog[0].name, "Incorect error generated").to.equal(semanticErrors[semanticErrors.outOfRange]);
        });

        it('CONSTF8 Generate error for int under min: CONSTF8 -130', function () {
            let asm = "CONSTF8 -130\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);
            expect(errorLog.length, "Expected error").to.equal(1);
            expect(assembler._codeGenListener._pc).to.equal(1);
            expect(errorLog[0].name, "Incorect error generated").to.equal(semanticErrors[semanticErrors.outOfRange]);
        });
    });

    describe('Test CONSTF16 opcode', function () {
        it('CONSTF16 Generate byte code for CONSTF16 positive integer', function () {
            let asm = "CONSTF16 5056\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(3);
            expect(assembler._codeGenListener._pc).to.equal(3);
            let view = new DataView(byteCode.buffer, 1, 2);
            let numRead = view.getInt16(0, true);
            expect(numRead, "Number no written correctly").to.equal(5056);
        });

        it('CONSTF16 Generate byte code for CONSTF16 negative integer', function () {
            let asm = "CONSTF16 -5054\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(3);
            expect(assembler._codeGenListener._pc).to.equal(3);
            let view = new DataView(byteCode.buffer, 1, 2);
            let numRead = view.getInt16(0, true);
            expect(numRead, "Number no written correctly").to.equal(-5054);
        });

        it('CONSTF16 Generate byte code for CONSTF16 0', function () {
            let asm = "CONSTF16 0\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(3);
            expect(assembler._codeGenListener._pc).to.equal(3);
            let view = new DataView(byteCode.buffer, 1, 2);
            let numRead = view.getInt16(0, true);
            expect(numRead, "Number no written correctly").to.equal(0);
        });

        it('CONSTF16 Generate byte code for Max int16 value', function () {
            let num = TypeLimits.Int16_Max;
            let asm = "CONSTF16 " + num + "\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(3);
            expect(assembler._codeGenListener._pc).to.equal(3);
            let view = new DataView(byteCode.buffer, 1, 2);
            let numRead = view.getInt16(0, true);
            expect(numRead, "Number no written correctly").to.equal(num);
        });

        it('CONSTF16 Generate byte code for Min int16 value', function () {
            let num = TypeLimits.Int16_Min;
            let asm = "CONSTF16 " + num + "\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(3);
            expect(assembler._codeGenListener._pc).to.equal(3);
            let view = new DataView(byteCode.buffer, 1, 2);
            let numRead = view.getInt16(0, true);
            expect(numRead, "Number not written correctly").to.equal(num);
        });

        it('CONSTF16 Generate error for int over max int16', function () {
            let num = TypeLimits.Int16_Max + 1;
            let asm = "CONSTF16 " + num + "\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);
            expect(errorLog.length, "Expected error").to.equal(1);
            expect(assembler._codeGenListener._pc).to.equal(1);
            expect(errorLog[0].name, "Incorect error generated").to.equal(semanticErrors[semanticErrors.outOfRange]);
        });

        it('CONSTF16 Generate error for int under min int16', function () {
            let num = TypeLimits.Int16_Min - 1;
            let asm = "CONSTF16 " + num + "\n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);
            expect(errorLog.length, "Expected error").to.equal(1);
            expect(assembler._codeGenListener._pc).to.equal(1);
            expect(errorLog[0].name, "Incorect error generated").to.equal(semanticErrors[semanticErrors.outOfRange]);

        });
    });

    describe('Test JMP Opcodes', function () {
        it('Generate byte code for JMP command', function () {
            let asm = "JMP NAME \n NAME: \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect opcode generated").to.equal(36);
            //Amalgamate written address from bytes
            let view = new DataView(byteCode.buffer, 1, 2);
            let addressWriten = view.getUint16(0, true);
            expect(addressWriten, "Address not written correctly").to.equal(3);
        });

        it('Generate byte code for JMPT command', function () {
            let asm = "JMPT NAME \n NAME: \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect opcode generated").to.equal(37);
            expect(assembler._codeGenListener._pc).to.equal(3);
            //Amalgamate written address from bytes
            let view = new DataView(byteCode.buffer, 1, 2);
            let addressWriten = view.getUint16(0, true);
            expect(addressWriten, "Address not written correctly").to.equal(3);
        });

        it('Generate byte code for JMPF command', function () {
            let asm = "JMPF NAME \n NAME: \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect opcode generated").to.equal(38);
            expect(assembler._codeGenListener._pc).to.equal(3);
            //Amalgamate written address from bytes
            let view = new DataView(byteCode.buffer, 1, 2);
            let addressWriten = view.getUint16(0, true);
            expect(addressWriten, "Address not written correctly").to.equal(3);
        });

    });

    describe('Test STORE & LOAD Opcodes', function () {
        it('Generate byte code for STORE 128', function () {
            let asm = "STORE 128 \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect opcode generated").to.equal(43);
            expect(assembler._codeGenListener._pc).to.equal(2);
            //Amalgamate written address from bytes
            let view = new DataView(byteCode.buffer, 1, 1);
            let addressWriten = view.getUint8(0);
            expect(addressWriten, "Address not written correctly").to.equal(128);
        });

        it('Generate byte code for STORE 255', function () {
            let asm = "STORE 255 \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect opcode generated").to.equal(43);
            expect(assembler._codeGenListener._pc).to.equal(2);
            //Amalgamate written address from bytes
            let view = new DataView(byteCode.buffer, 1, 1);
            let addressWriten = view.getUint8(0);
            expect(addressWriten, "Address not written correctly").to.equal(255);
        });

        it('Generate byte code for STORE 0', function () {
            let asm = "STORE 0 \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect opcode generated").to.equal(43);
            expect(assembler._codeGenListener._pc).to.equal(2);
            //Amalgamate written address from bytes
            let view = new DataView(byteCode.buffer, 1, 1);
            let addressWriten = view.getUint8(0);
            expect(addressWriten, "Address not written correctly").to.equal(0);
        });

        it('Generate byte code for LOAD 128', function () {
            let asm = "LOAD 128 \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect opcode generated").to.equal(44);
            expect(assembler._codeGenListener._pc).to.equal(2);
            //Amalgamate written address from bytes
            let view = new DataView(byteCode.buffer, 1, 1);
            let addressWriten = view.getUint8(0);
            expect(addressWriten, "Address not written correctly").to.equal(128);
        });

        it('Generate byte code for LOAD 255', function () {
            let asm = "LOAD 255 \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect opcode generated").to.equal(44);
            expect(assembler._codeGenListener._pc).to.equal(2);
            //Amalgamate written address from bytes
            let view = new DataView(byteCode.buffer, 1, 1);
            let addressWriten = view.getUint8(0);
            expect(addressWriten, "Address not written correctly").to.equal(255);
        });

        it('Generate byte code for STORE 0', function () {
            let asm = "LOAD 0 \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect opcode generated").to.equal(44);
            expect(assembler._codeGenListener._pc).to.equal(2);
            //Amalgamate written address from bytes
            let view = new DataView(byteCode.buffer, 1, 1);
            let addressWriten = view.getUint8(0);
            expect(addressWriten, "Address not written correctly").to.equal(0);
        });
    });

    describe('Test GSTORE & GLOAD Opcodes', function () {
        it('Generate byte code for GSTORE 128', function () {
            let asm = "GSTORE 128 \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect opcode generated").to.equal(48);
            expect(assembler._codeGenListener._pc).to.equal(2);
            //Amalgamate written address from bytes
            let view = new DataView(byteCode.buffer, 1, 1);
            let addressWriten = view.getUint8(0);
            expect(addressWriten, "Address not written correctly").to.equal(128);
        });

        it('Generate byte code for GSTORE 255', function () {
            let asm = "GSTORE 255 \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect opcode generated").to.equal(48);
            expect(assembler._codeGenListener._pc).to.equal(2);
            //Amalgamate written address from bytes
            let view = new DataView(byteCode.buffer, 1, 1);
            let addressWriten = view.getUint8(0);
            expect(addressWriten, "Address not written correctly").to.equal(255);
        });

        it('Generate byte code for GSTORE 0', function () {
            let asm = "GSTORE 0 \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect opcode generated").to.equal(48);
            expect(assembler._codeGenListener._pc).to.equal(2);
            //Amalgamate written address from bytes
            let view = new DataView(byteCode.buffer, 1, 1);
            let addressWriten = view.getUint8(0);
            expect(addressWriten, "Address not written correctly").to.equal(0);
        });

        it('Generate byte code for LOAD 128', function () {
            let asm = "GLOAD 128 \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect opcode generated").to.equal(49);
            expect(assembler._codeGenListener._pc).to.equal(2);
            //Amalgamate written address from bytes
            let view = new DataView(byteCode.buffer, 1, 1);
            let addressWriten = view.getUint8(0);
            expect(addressWriten, "Address not written correctly").to.equal(128);
        });

        it('Generate byte code for GLOAD 255', function () {
            let asm = "GLOAD 255 \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect opcode generated").to.equal(49);
            expect(assembler._codeGenListener._pc).to.equal(2);
            //Amalgamate written address from bytes
            let view = new DataView(byteCode.buffer, 1, 1);
            let addressWriten = view.getUint8(0);
            expect(addressWriten, "Address not written correctly").to.equal(255);
        });

        it('Generate byte code for GSTORE 0', function () {
            let asm = "GLOAD 0 \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect opcode generated").to.equal(49);
            expect(assembler._codeGenListener._pc).to.equal(2);
            //Amalgamate written address from bytes
            let view = new DataView(byteCode.buffer, 1, 1);
            let addressWriten = view.getUint8(0);
            expect(addressWriten, "Address not written correctly").to.equal(0);
        });
    });

    describe('Generate byte code for STRLIT', function () {
        it('Generate byte code for STRLIT with valid string', function () {
            let asm = "STRLIT \"Test String\" \n HALT \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(19);
            expect(byteCode[1], "Incorect string length in bytecode").to.equal(12);
            expect(byteCode[13], "String not terminated correctly").to.equal(0);
            expect(assembler._codeGenListener._pc).to.equal(15);
        });

        it('Generate byte code for STRLIT with empty string', function () {
            let asm = "STRLIT \"\" \n HALT \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(19);
            expect(byteCode[1], "Incorect string length in bytecode").to.equal(1);
            expect(byteCode[2], "String not terminated correctly").to.equal(0);
            expect(assembler._codeGenListener._pc).to.equal(4);
        });

        it('Generate byte code for STRLIT string with null trailing character', function () {
            let asm = "STRLIT \"Test\0\" \n HALT \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(19);
            expect(byteCode[1], "Incorect string length in bytecode").to.equal(5);
            expect(byteCode[6], "String not terminated correctly").to.equal(0);
            expect(assembler._codeGenListener._pc).to.equal(8);
        });

        it('Generate byte code for STRLIT string with only null character', function () {
            let asm = "STRLIT \"\0\" \n HALT \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(19);
            expect(byteCode[1], "Incorect string length in bytecode").to.equal(1);
            expect(byteCode[2], "String not terminated correctly").to.equal(0);
            expect(assembler._codeGenListener._pc).to.equal(4);

            //expect(numRead, "Int number not written correctly").to.equal(numToPush);
        });

    });

    describe('String Instructions', function () {
        describe('DSTR', function () {
            it('DSTR normal args', function () {
                let asm = "DSTR 8, 32 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "No errors should be generated").to.equal(0);
                expect(byteCode[0], "Incorrect bytecode generated").to.equal(42);
                expect(byteCode[1], "Incorrect arg value").to.equal(8);
                expect(byteCode[2], "Incorrect arg value").to.equal(32);
                expect(assembler._codeGenListener._pc).to.equal(3);
            });
        });

        describe('GDSTR', function () {
            it('GDSTR normal args', function () {
                let asm = "GDSTR 8, 32 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "No errors should be generated").to.equal(0);
                expect(byteCode[0], "Incorrect bytecode generated").to.equal(47);
                expect(byteCode[1], "Incorrect arg value").to.equal(8);
                expect(byteCode[2], "Incorrect arg value").to.equal(32);
                expect(assembler._codeGenListener._pc).to.equal(3);
            });
        });

        describe('APPEND, TOSTR, GAPPEND, GTOSTR', function () {
            it('Should generate corect byte codes for instructions', function () {

                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let asm = "APPEND \n TOSTR \n";
                let assembler = new Assembler(asm, byteCode, errorLog);
                expect(errorLog.length, "No errors should be generated").to.equal(0);
                expect(byteCode[0], "Incorrect bytecode generated").to.equal(45);
                expect(byteCode[1], "Incorrect bytecode generated").to.equal(46);
            });

        });
    });

    describe('Function Instructions', function () {
        describe('CALL', function () {
            it('nominal args', function () {
                let asm = "CALL 2000, 3, 18 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "No errors should be generated").to.equal(0);
                expect(byteCode[0], "Incorrect bytecode generated").to.equal(39);
                let view = new DataView(byteCode.buffer, 1, 2);
                let address = view.getUint16(0, true);
                expect(address, "Address not set corectly").to.equal(2000);
                expect(byteCode[3], "Incorrect arg value").to.equal(3);
                expect(byteCode[4], "Incorrect arg value").to.equal(18);
                expect(assembler._codeGenListener._pc).to.equal(5);
            });

            it('All args at max values', function () {
                let asm = "CALL 65535,255, 255 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);
                expect(errorLog.length, "Errors should be generated").to.equal(0);
                let view = new DataView(byteCode.buffer, 1, 2);
                let address = view.getUint16(0, true);
                expect(address, "Address not set corectly").to.equal(65535);
                expect(byteCode[3], "Incorrect arg value").to.equal(255);
                expect(byteCode[4], "Incorrect arg value").to.equal(255);
                expect(byteCode[0], "Incorrect erro").to.equal(39);
                expect(assembler._codeGenListener._pc).to.equal(5);
            });

            it('address arg outOfRange', function () {
                let asm = "CALL 70000, 3, 18 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "Error should be generated").to.equal(1);
                expect(errorLog[0].name).to.equal(semanticErrors[semanticErrors.outOfRange]);
                expect(byteCode[0], "Incorrect erro").to.equal(39);
                expect(assembler._codeGenListener._pc).to.equal(3);
            });

            it('Locals & Param Count args outOfRange', function () {
                let asm = "CALL 3000, 256, 256 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "Errors should be generated").to.equal(2);
                expect(errorLog[0].name).to.equal(semanticErrors[semanticErrors.outOfRange]);
                expect(errorLog[1].name).to.equal(semanticErrors[semanticErrors.outOfRange]);
                expect(byteCode[0], "Incorrect erro").to.equal(39);
                expect(assembler._codeGenListener._pc).to.equal(3);
            });

            it('Arg count mismatch', function () {
                let asm = "CALL 1024, 3  \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "Error should be generated").to.equal(1);
                expect(errorLog[0].name).to.equal(semanticErrors[semanticErrors.argCountMismatch]);
                expect(byteCode[0], "Incorrect erro").to.equal(39);
                expect(assembler._codeGenListener._pc).to.equal(1);
            });

        });

        describe('RET', function () {
            it('should generate correct opcode', function () {
                let asm = "RET \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "No errors should be generated").to.equal(0);
                expect(byteCode[0], "Incorrect bytecode generated").to.equal(40);
                expect(assembler._codeGenListener._pc).to.equal(1);
            });
        });
    });

    describe('LDARG', function () {
        it('nominal arg', function () {
            let asm = "LDARG 255 \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(41);
            expect(byteCode[1], "Incorrect arg value").to.equal(255);
            expect(assembler._codeGenListener._pc).to.equal(2);
        });

        it('arg out of range', function () {
            let asm = "LDARG 256 \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);
            expect(errorLog.length, "Errors should be generated").to.equal(1);
            expect(errorLog[0].name).to.equal(semanticErrors[semanticErrors.outOfRange]);
            expect(byteCode[0], "Incorrect opcode").to.equal(41);
            expect(assembler._codeGenListener._pc).to.equal(1);
        });
    });

    describe('POP', function () {
        it('should generate correct opcode', function () {
            let asm = "POP \n";
            let errorLog: ErrorLog[] = [];
            let byteCode = new Uint8Array(30);
            let assembler = new Assembler(asm, byteCode, errorLog);

            expect(errorLog.length, "No errors should be generated").to.equal(0);
            expect(byteCode[0], "Incorrect bytecode generated").to.equal(52);
            expect(assembler._codeGenListener._pc).to.equal(1);
        });
    });

    describe('Local Array Instructions', function () {
        describe('DARRAY', function () {
            it('nominal args', function () {
                let asm = "DARRAY 255, 255 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "No errors should be generated").to.equal(0);
                expect(byteCode[0], "Incorrect bytecode generated").to.equal(53);

                expect(byteCode[1], "Incorrect arg value").to.equal(255);
                expect(byteCode[2], "Incorrect arg value").to.equal(255);
                expect(assembler._codeGenListener._pc).to.equal(3);
            });

            it("min value args", function () {
                let asm = "DARRAY 0, 0 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "No errors should be generated").to.equal(0);
                expect(byteCode[0], "Incorrect bytecode generated").to.equal(53);

                expect(byteCode[1], "Incorrect arg value").to.equal(0);
                expect(byteCode[2], "Incorrect arg value").to.equal(0);
                expect(assembler._codeGenListener._pc).to.equal(3);
            });

            it('args outOfRange', function () {
                let asm = "DARRAY 256, 256 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "Errors should be generated").to.equal(2);
                expect(byteCode[0], "Incorrect opcode").to.equal(53);
                expect(errorLog[0].name).to.equal(semanticErrors[semanticErrors.outOfRange]);
                expect(errorLog[1].name).to.equal(semanticErrors[semanticErrors.outOfRange]);
                expect(assembler._codeGenListener._pc).to.equal(1);
            });

            it('arg count mismatch', function () {
                let asm = "DARRAY 256 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "Error should be generated").to.equal(1);
                expect(errorLog[0].name).to.equal(semanticErrors[semanticErrors.argCountMismatch]);
                expect(byteCode[0], "Incorrect erro").to.equal(53);
                expect(assembler._codeGenListener._pc).to.equal(1);
            });

        });

        describe('LOADAE', function () {
            it('nominal args', function () {
                let asm = "LOADAE 255, 255 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "No errors should be generated").to.equal(0);
                expect(byteCode[0], "Incorrect bytecode generated").to.equal(55);

                expect(byteCode[1], "Incorrect arg value").to.equal(255);
                expect(byteCode[2], "Incorrect arg value").to.equal(255);
                expect(assembler._codeGenListener._pc).to.equal(3);
            });

            it("min value args", function () {
                let asm = "LOADAE 0, 0 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "No errors should be generated").to.equal(0);
                expect(byteCode[0], "Incorrect bytecode generated").to.equal(55);

                expect(byteCode[1], "Incorrect arg value").to.equal(0);
                expect(byteCode[2], "Incorrect arg value").to.equal(0);
                expect(assembler._codeGenListener._pc).to.equal(3);
            });

            it('args outOfRange', function () {
                let asm = "LOADAE 256, 256 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "Errors should be generated").to.equal(2);
                expect(byteCode[0], "Incorrect opcode").to.equal(55);
                expect(errorLog[0].name).to.equal(semanticErrors[semanticErrors.outOfRange]);
                expect(errorLog[1].name).to.equal(semanticErrors[semanticErrors.outOfRange]);
                expect(assembler._codeGenListener._pc).to.equal(1);
            });

            it('arg count mismatch', function () {
                let asm = "LOADAE 256 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "Error should be generated").to.equal(1);
                expect(errorLog[0].name).to.equal(semanticErrors[semanticErrors.argCountMismatch]);
                expect(byteCode[0], "Incorrect erro").to.equal(55);
                expect(assembler._codeGenListener._pc).to.equal(1);
            });

        });

        describe('STOREAE', function () {
            it('nominal args', function () {
                let asm = "STOREAE 255, 255 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "No errors should be generated").to.equal(0);
                expect(byteCode[0], "Incorrect bytecode generated").to.equal(54);

                expect(byteCode[1], "Incorrect arg value").to.equal(255);
                expect(byteCode[2], "Incorrect arg value").to.equal(255);
                expect(assembler._codeGenListener._pc).to.equal(3);
            });

            it("min value args", function () {
                let asm = "STOREAE 0, 0 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "No errors should be generated").to.equal(0);
                expect(byteCode[0], "Incorrect bytecode generated").to.equal(54);

                expect(byteCode[1], "Incorrect arg value").to.equal(0);
                expect(byteCode[2], "Incorrect arg value").to.equal(0);
                expect(assembler._codeGenListener._pc).to.equal(3);
            });

            it('args outOfRange', function () {
                let asm = "STOREAE 256, 256 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "Errors should be generated").to.equal(2);
                expect(byteCode[0], "Incorrect opcode").to.equal(54);
                expect(errorLog[0].name).to.equal(semanticErrors[semanticErrors.outOfRange]);
                expect(errorLog[1].name).to.equal(semanticErrors[semanticErrors.outOfRange]);
                expect(assembler._codeGenListener._pc).to.equal(1);
            });

            it('arg count mismatch', function () {
                let asm = "STOREAE 256 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "Error should be generated").to.equal(1);
                expect(errorLog[0].name).to.equal(semanticErrors[semanticErrors.argCountMismatch]);
                expect(byteCode[0], "Incorrect opcode").to.equal(54);
                expect(assembler._codeGenListener._pc).to.equal(1);
            });
        });
    });

    describe('Global Array Instructions', function () {
        describe('GDARRAY', function () {
            it('nominal args', function () {
                let asm = "GDARRAY 255, 255 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "No errors should be generated").to.equal(0);
                expect(byteCode[0], "Incorrect bytecode generated").to.equal(56);

                expect(byteCode[1], "Incorrect arg value").to.equal(255);
                expect(byteCode[2], "Incorrect arg value").to.equal(255);
                expect(assembler._codeGenListener._pc).to.equal(3);
            });

            it("min value args", function () {
                let asm = "GDARRAY 0, 0 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "No errors should be generated").to.equal(0);
                expect(byteCode[0], "Incorrect bytecode generated").to.equal(56);

                expect(byteCode[1], "Incorrect arg value").to.equal(0);
                expect(byteCode[2], "Incorrect arg value").to.equal(0);
                expect(assembler._codeGenListener._pc).to.equal(3);
            });

            it('args outOfRange', function () {
                let asm = "GDARRAY 256, 256 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "Errors should be generated").to.equal(2);
                expect(byteCode[0], "Incorrect opcode").to.equal(56);
                expect(errorLog[0].name).to.equal(semanticErrors[semanticErrors.outOfRange]);
                expect(errorLog[1].name).to.equal(semanticErrors[semanticErrors.outOfRange]);
                expect(assembler._codeGenListener._pc).to.equal(1);
            });

            it('arg count mismatch', function () {
                let asm = "GDARRAY 256 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "Error should be generated").to.equal(1);
                expect(errorLog[0].name).to.equal(semanticErrors[semanticErrors.argCountMismatch]);
                expect(byteCode[0], "Incorrect opcode").to.equal(56);
                expect(assembler._codeGenListener._pc).to.equal(1);
            });

        });

        describe('GLOADAE', function () {
            it('nominal args', function () {
                let asm = "GLOADAE 255, 255 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "No errors should be generated").to.equal(0);
                expect(byteCode[0], "Incorrect bytecode generated").to.equal(58);

                expect(byteCode[1], "Incorrect arg value").to.equal(255);
                expect(byteCode[2], "Incorrect arg value").to.equal(255);
                expect(assembler._codeGenListener._pc).to.equal(3);
            });

            it("min value args", function () {
                let asm = "GLOADAE 0, 0 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "No errors should be generated").to.equal(0);
                expect(byteCode[0], "Incorrect bytecode generated").to.equal(58);

                expect(byteCode[1], "Incorrect arg value").to.equal(0);
                expect(byteCode[2], "Incorrect arg value").to.equal(0);
                expect(assembler._codeGenListener._pc).to.equal(3);
            });

            it('args outOfRange', function () {
                let asm = "GLOADAE 256, 256 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "Errors should be generated").to.equal(2);
                expect(byteCode[0], "Incorrect opcode").to.equal(58);
                expect(errorLog[0].name).to.equal(semanticErrors[semanticErrors.outOfRange]);
                expect(errorLog[1].name).to.equal(semanticErrors[semanticErrors.outOfRange]);
                expect(assembler._codeGenListener._pc).to.equal(1);
            });

            it('arg count mismatch', function () {
                let asm = "GLOADAE 256 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "Error should be generated").to.equal(1);
                expect(errorLog[0].name).to.equal(semanticErrors[semanticErrors.argCountMismatch]);
                expect(byteCode[0], "Incorrect erro").to.equal(58);
                expect(assembler._codeGenListener._pc).to.equal(1);
            });

        });

        describe('GSTOREAE', function () {
            it('nominal args', function () {
                let asm = "GSTOREAE 255, 255 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "No errors should be generated").to.equal(0);
                expect(byteCode[0], "Incorrect bytecode generated").to.equal(57);

                expect(byteCode[1], "Incorrect arg value").to.equal(255);
                expect(byteCode[2], "Incorrect arg value").to.equal(255);
                expect(assembler._codeGenListener._pc).to.equal(3);
            });

            it("min value args", function () {
                let asm = "GSTOREAE 0, 0 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "No errors should be generated").to.equal(0);
                expect(byteCode[0], "Incorrect bytecode generated").to.equal(57);

                expect(byteCode[1], "Incorrect arg value").to.equal(0);
                expect(byteCode[2], "Incorrect arg value").to.equal(0);
                expect(assembler._codeGenListener._pc).to.equal(3);
            });

            it('args outOfRange', function () {
                let asm = "GSTOREAE 256, 256 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "Errors should be generated").to.equal(2);
                expect(byteCode[0], "Incorrect opcode").to.equal(57);
                expect(errorLog[0].name).to.equal(semanticErrors[semanticErrors.outOfRange]);
                expect(errorLog[1].name).to.equal(semanticErrors[semanticErrors.outOfRange]);
                expect(assembler._codeGenListener._pc).to.equal(1);
            });

            it('arg count mismatch', function () {
                let asm = "GSTOREAE 256 \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "Error should be generated").to.equal(1);
                expect(errorLog[0].name).to.equal(semanticErrors[semanticErrors.argCountMismatch]);
                expect(byteCode[0], "Incorrect opcode").to.equal(57);
                expect(assembler._codeGenListener._pc).to.equal(1);
            });
        });

        describe('Type Conversion', function () {
            it('should generate correct opcodes', function () {
                let asm = "PROMOTE \n DEMOTE \n";
                let errorLog: ErrorLog[] = [];
                let byteCode = new Uint8Array(30);
                let assembler = new Assembler(asm, byteCode, errorLog);

                expect(errorLog.length, "No errors should be generated").to.equal(0);
                expect(byteCode[0], "Incorrect bytecode generated").to.equal(59);
                expect(byteCode[1], "Incorrect bytecode generated").to.equal(60);
                expect(assembler._codeGenListener._pc).to.equal(2);
            });
        });
    });
});