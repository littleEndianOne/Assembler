import { asmListener } from './asmParser/asmListener';
import { ErrorLog, errorTypes, ErrorMsgGenerator } from '../../Utility';
import { TypeLimits } from '../../Utility'

Math.fround = Math.fround || (function (array) {
    return function (x: number) {
        return array[0] = x, array[0];
    };
})(new Float32Array(1));

import {
    OpcodeContext,
    LabelContext,
    ProgContext,
    InstructionContext,
    LineContext,
    ArgumentContext,
    ArgumentlistContext
} from './asmParser/asmParser';

import { Token } from 'antlr4ts';

import { ErrorNode } from 'antlr4ts/tree/ErrorNode';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';

import { instructionLookupTable, IInstructionLookup, IInstructionDef, argTypes } from './instructionMapping';
import { ParseTreeProperty } from 'antlr4ts/tree';
import { asmSymbolTable } from './asmSymbolTable';

import { semanticErrors, semanticErrorMsgTemplates } from './asmSemanticErrors';
import { Array2DHashMap } from 'antlr4ts/misc/Array2DHashMap';


/**
 * @description Implements the 
 * The write functions call the set functions to right the data into the byte array and increment the pc. 
 * Arg types and value ranges are checked and errors generated.
 * The write functions write the data types into the byte array.
 * 
 */
export class asmCodeGenListener implements asmListener {

    _byteCode: Uint8Array;
    _pc: number;
    _symbolTable: asmSymbolTable;
    _errorLog: ErrorLog[];
    _errorMsgGen: ErrorMsgGenerator<semanticErrors>;


    constructor(byteCode: Uint8Array, errorLog: ErrorLog[], symbolTable: asmSymbolTable) {
        this._byteCode = byteCode;
        this._errorLog = errorLog;
        this._symbolTable = symbolTable;
        this._pc = 0;
        this._errorMsgGen = new ErrorMsgGenerator(semanticErrorMsgTemplates);
    }

    //Write a 8bit unsigned intger into byte code. Return null if the value is our of range.
    private setUInt8(num: number, offset: number, buffer: ArrayBuffer): boolean {

        //check for valid UInt8
        if (num <= TypeLimits.UInt8_Max && num >= 0) {
            let view = new DataView(buffer);
            view.setUint8(offset, num);
            return true;
        }
        else {
            return false;  //error
        }
    }

    //Write a 8 bit intger into byte code. Return null if the value is our of range.
    private setInt8(num: number, offset: number, buffer: ArrayBuffer): boolean {

        //check for valid Int8
        if (num <= TypeLimits.Int8_Max && num >= TypeLimits.Int8_Min) {
            let view = new DataView(buffer);
            view.setInt8(offset, num);
            return true;
        }
        else {
            return false;  //error
        }
    }

    //Write a 16bit unsigned intger into byte code. Return null if the value is our of range.
    private setUInt16(num: number, offset: number, buffer: ArrayBuffer): boolean {
        //check for valid UInt16
        let view = new DataView(buffer);
        view.setUint16(offset, num, true);
        if (num <= TypeLimits.UInt16_Max && num >= 0) {
            view.setUint16(offset, num, true);
            return true;
        }
        else {
            return false; //error
        }
    }

    //Write a 16bit intger into byte code. Return null if the value is our of range.
    private setInt16(num: number, offset: number, buffer: ArrayBuffer): boolean {
        //check for valid Int16
        if (num <= TypeLimits.Int16_Max && num >= TypeLimits.Int16_Min) {
            let view = new DataView(buffer);
            view.setInt16(offset, num, true);
            return true;
        }
        else {
            return false; //error
        }
    }

    //Write a 32bit intger into byte code. Return null if the value is our of range.
    private setInt32(num: number, offset: number, buffer: ArrayBuffer): boolean {

        //check for valid Int32
        if (num <= TypeLimits.Int32_Max && num >= TypeLimits.Int32_Min) {
            let view = new DataView(buffer);
            view.setInt32(offset, num, true);
            return true;
        }
        else {
            return false;  //error
        }
    }

    //Write a 32bit float into byte code. Return null if the value is our of range.
    private setFloat32(num: number, offset: number, buffer: ArrayBuffer): boolean {
        let f32 = Math.fround(num);
        if (f32 != Infinity) {
            let view = new DataView(buffer);
            view.setFloat32(offset, num, true);
            return true;
        }
        else {
            return false;
        }
    }

    //Write a string into byte code. Return the number of bytes writen or -1 if the string is longer than 255 characters.
    setString(str: string, offset: number, buffer: ArrayBuffer): number {

        //ensure the string is terminated with a null character.
        if (!str.endsWith("\0", str.length)) {
            str += "\0";
        }

        let view = new DataView(buffer);
        let strStart = offset + 1;
        for (var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i);
            view.setUint8(strStart + i, code);
        }

        //prefix the string length in byte code.
        if (!this.setUInt8(str.length, offset, buffer)) {
            return -1;
        }
        return i + 1;
    }

    /* Description: Convert the passed string into a number.
    * Exception: If the stirng passed is not a number then a "Address is not a number" is thrown.
    * Note:  Parser will have verified a valid number so error should never be thrown.
    */
    stringToNumber(numAsString: string): number {
        let num = Number(numAsString);
        if (!Number.isNaN(num)) {
            return num;
        }
        else {
            throw new Error("Address is not a number"); //Opcode not fond in lookup table.
        }
    }


    // writeVariableAddress(addressAsString: string, start: Token, stop: Token) {
    //     //convert string to number - Parser will have verified a valid number so error should never be thrown.
    //     let address = this.stringToNumber(addressAsString);

    //     //check range
    //     if (!this.setUInt8(address, this._pc, this._byteCode.buffer)) {
    //         //Generate assembler error for out of range value.
    //         let error = new ErrorLog(errorTypes.Assembler, semanticErrors[semanticErrors.outOfRangeForAddress8], 
    //             this._errorMsgGen.getMsg(semanticErrors.outOfRangeForAddress8, address.toString()), start, stop);
    //         this._errorLog.push(error);
    //     }
    //     else {
    //         this._pc++;
    //     }
    // }

    //Attempts to resolve a lable name (get its code address) and write its code address into the byte code array.
    //If the lable cannot be resolved then 0 is written into the byte code.
    writeReference(destName: string) {
        //get lable address from name
        let destAddress = this._symbolTable.resolve(destName, this._pc);
        //Has the name been defined?
        if (destAddress != null) {
            //Address was internally assigned so assumed to always be valid.
            this.setUInt16(destAddress, this._pc, this._byteCode.buffer); //not a forward reference so set dest address in byte code.
            this._pc += 2;
        } else {
            this.setUInt16(0, this._pc, this._byteCode.buffer);//forward reference so set byte code reference to 0.
            this._pc += 2;
        }
    }

    //Attemps to get an instruction definition from the instruction lookup table. Returns the IInstructionDef or null if not found.
    getInstructionDef(opcodeString: string): IInstructionDef {
        let def = instructionLookupTable[opcodeString];
        if (def != undefined) {
            return def;
        }
        else {
            return null;
        }
    }

    //Attempt to define a lable. Its byte code address will be added to the symbolTable.
    //If it already exists in the table an error will be generated.
    exitLabel(ctx: LabelContext) {
        if (this._symbolTable.define(ctx.NAME().text, this._pc) == false) {
            let error = new ErrorLog(errorTypes.Assembler, semanticErrors[semanticErrors.lableAlreadyExists],
                this._errorMsgGen.getMsg(semanticErrors.lableAlreadyExists,
                    ctx.NAME().text), ctx.start, ctx.stop);
            this._errorLog.push(error);
        }
    }

    //Attempting to access an argument that does not exist will though an Error. This wrapper catches the error and returns null if the argument does not exist.
    getArgumentWrapper(argumentList: ArgumentlistContext, index: number): ArgumentContext | null {
        try {
            return argumentList.argument(index);
        } catch (Error) {
            return null;
        }
    }

    /*
    * Write the instuction into byte code:
    *Get the instuctions definition. 
    *Write the instructions opcode.
    *Check that the actual arg count matches the definition.
    *Attempt to write each arg into the byte code using the writeArg function.
    */
    exitInstruction(ctx: InstructionContext) {
        let opcode = ctx.opcode().NAME().text;
        let instDef = this.getInstructionDef(opcode);
        if (instDef != null) {
            //write the opcode
            this._byteCode[this._pc++] = instDef.opcode;

            //Are there arguments in the code?
            if (ctx.argumentlist() != undefined) {
                //Check number of arguments matches definition                
                //Get the actual args
                let actArgs: ArgumentContext[] = [];
                let count = 0;
                while (this.getArgumentWrapper(ctx.argumentlist(), count)) {
                    actArgs[count] = this.getArgumentWrapper(ctx.argumentlist(), count);
                    count++;
                }
                if (actArgs.length == instDef.arguments.length) {
                    //check each argument type with definition and write.
                    count = 0;
                    for (let defArg of instDef.arguments) {
                        let actArg = actArgs[count];
                        this.writeArg(actArg, defArg, actArg);
                        count++;
                    }
                }
                else {
                    //Param count mismatch
                    let error = new ErrorLog(errorTypes.Assembler, semanticErrors[semanticErrors.argCountMismatch], this._errorMsgGen.getMsg(semanticErrors.argCountMismatch),
                        ctx.start, ctx.stop);
                    this._errorLog.push(error);
                }
            } else {
                //No arguments in code - Should there be?
                if (instDef.arguments.length != 0) {
                    //error - Should have arguments.
                    let error = new ErrorLog(errorTypes.Assembler, semanticErrors[semanticErrors.argCountMismatch], this._errorMsgGen.getMsg(semanticErrors.argCountMismatch),
                        ctx.start, ctx.stop);
                    this._errorLog.push(error);
                }
            }
        } else {
            //Unknown opcode
            let error = new ErrorLog(errorTypes.Assembler, semanticErrors[semanticErrors.unknownOpcode], this._errorMsgGen.getMsg(semanticErrors.unknownOpcode, opcode),
                ctx.start, ctx.stop);
            this._errorLog.push(error);
        }
    }

    //Identify the arg type and attempt to write it out into byte code. Generate errors for incorect arg types and values that are out of range of the declared types.
    writeArg(arg: ArgumentContext, type: argTypes, ctx: ArgumentContext): boolean {
        let result = false;

        switch (type) {
            case argTypes.FLOAT32:
                if (arg.FLOAT() != undefined || arg.INT() != undefined) {
                    let num = Number(arg.text);
                    if (this.setFloat32(num, this._pc, this._byteCode.buffer)) {
                        this._pc += 4; //Increment pc by 4B 
                        return true;
                    } else {
                        let error = new ErrorLog(errorTypes.Assembler, semanticErrors[semanticErrors.outOfRange],
                            this._errorMsgGen.getMsg(semanticErrors.outOfRange, num.toString()), ctx.start, ctx.stop);
                        this._errorLog.push(error);
                        return false;
                    }
                }
                else {
                    let error = new ErrorLog(errorTypes.Assembler, semanticErrors[semanticErrors.argTypeMismatch],
                        this._errorMsgGen.getMsg(semanticErrors.argTypeMismatch),
                        ctx.start, ctx.stop);
                    this._errorLog.push(error);
                    return false;
                }
                break;

            case argTypes.INT32:
                if (arg.INT() != undefined) {
                    //check range
                    let num = Number(arg.text);
                    result = this.setInt32(num, this._pc, this._byteCode.buffer);
                    if (result) {
                        this._pc += 4; //Increment pc by 4B
                        return true;
                    } else {
                        let error = new ErrorLog(errorTypes.Assembler, semanticErrors[semanticErrors.outOfRange],
                            this._errorMsgGen.getMsg(semanticErrors.outOfRange, num.toString()), ctx.start, ctx.stop);
                        this._errorLog.push(error);
                        return false;
                    }
                } else {
                    let error = new ErrorLog(errorTypes.Assembler, semanticErrors[semanticErrors.argTypeMismatch],
                        this._errorMsgGen.getMsg(semanticErrors.argTypeMismatch), ctx.start, ctx.stop);
                    this._errorLog.push(error);
                    return false;
                }
                break;

            case argTypes.INT16:
                if (arg.INT() != undefined) {
                    let num = Number(arg.text);
                    if (this.setInt16(num, this._pc, this._byteCode.buffer)) {
                        this._pc += 2; //Increment pc by 2B
                        return true;
                    } else {
                        let error = new ErrorLog(errorTypes.Assembler, semanticErrors[semanticErrors.outOfRange],
                            this._errorMsgGen.getMsg(semanticErrors.outOfRange, num.toString()), ctx.start, ctx.stop);
                        this._errorLog.push(error);
                        return false;
                    }
                } else {
                    let error = new ErrorLog(errorTypes.Assembler, semanticErrors[semanticErrors.argTypeMismatch],
                        this._errorMsgGen.getMsg(semanticErrors.argTypeMismatch), ctx.start, ctx.stop);
                    this._errorLog.push(error);
                    return false;
                }
                break;

            case argTypes.UINT16:
                if (arg.INT() != undefined) {
                    let num = Number(arg.text);
                    if (this.setUInt16(num, this._pc, this._byteCode.buffer)) {
                        this._pc += 2; //Increment pc by 2B
                        return true;
                    } else {
                        let error = new ErrorLog(errorTypes.Assembler, semanticErrors[semanticErrors.outOfRange],
                            this._errorMsgGen.getMsg(semanticErrors.outOfRange, num.toString()), ctx.start, ctx.stop);
                        this._errorLog.push(error);
                        return false;
                    }
                } else {
                    let error = new ErrorLog(errorTypes.Assembler, semanticErrors[semanticErrors.argTypeMismatch],
                        this._errorMsgGen.getMsg(semanticErrors.argTypeMismatch), ctx.start, ctx.stop);
                    this._errorLog.push(error);
                    return false;
                }
                break;

            case argTypes.INT8:
                //Check range               
                if (arg.INT() != undefined) {
                    let num = Number(arg.text);
                    if (result = this.setInt8(num, this._pc, this._byteCode.buffer)) {
                        this._pc += 1; //Increment pc by 1B
                        return true;
                    } else {
                        let error = new ErrorLog(errorTypes.Assembler, semanticErrors[semanticErrors.outOfRange],
                            this._errorMsgGen.getMsg(semanticErrors.outOfRange, num.toString()), ctx.start, ctx.stop);
                        this._errorLog.push(error);
                        return false;
                    }
                } else {
                    let error = new ErrorLog(errorTypes.Assembler, semanticErrors[semanticErrors.argTypeMismatch],
                        this._errorMsgGen.getMsg(semanticErrors.argTypeMismatch), ctx.start, ctx.stop);
                    this._errorLog.push(error);
                    return false;
                }
                break;

            case argTypes.UINT8:
                //Check range               
                if (arg.INT() != undefined) {
                    let num = Number(arg.text);

                    if (this.setUInt8(num, this._pc, this._byteCode.buffer)) {
                        this._pc += 1; //Increment pc by 1B
                        return true;
                    } else {
                        let error = new ErrorLog(errorTypes.Assembler, semanticErrors[semanticErrors.outOfRange],
                            this._errorMsgGen.getMsg(semanticErrors.outOfRange, num.toString()), ctx.start, ctx.stop);
                        this._errorLog.push(error);
                        return false;
                    }
                } else {
                    let error = new ErrorLog(errorTypes.Assembler, semanticErrors[semanticErrors.argTypeMismatch],
                        this._errorMsgGen.getMsg(semanticErrors.argTypeMismatch), ctx.start, ctx.stop);
                    this._errorLog.push(error);
                    return false;
                }
                break;

            case argTypes.NAME:
                if (arg.NAME() != undefined) {
                    this.writeReference(arg.NAME().text); //This write call increments the PC.                   
                    return true;
                } else {
                    let error = new ErrorLog(errorTypes.Assembler, semanticErrors[semanticErrors.argTypeMismatch],
                        this._errorMsgGen.getMsg(semanticErrors.argTypeMismatch), ctx.start, ctx.stop);
                    this._errorLog.push(error);
                    return false;
                }
                break;

            case argTypes.STRING:
                if (arg.STRING() != undefined) {
                    let str: string;
                    str = arg.STRING().text;
                    str = str.slice(1, str.length - 1);
                    //Make sure the string is null terminated. 
                    let byteCount = this.setString(str, this._pc, this._byteCode.buffer);

                    if (byteCount == -1) {
                        let error = new ErrorLog(errorTypes.Assembler, semanticErrors[semanticErrors.stringSizeOverflow],
                            this._errorMsgGen.getMsg(semanticErrors.stringSizeOverflow), ctx.start, ctx.stop);
                        this._errorLog.push(error);
                        return false;
                    }
                    else {
                        this._pc += byteCount;
                        return true;
                    }
                } else {
                    let error = new ErrorLog(errorTypes.Assembler, semanticErrors[semanticErrors.argTypeMismatch],
                        this._errorMsgGen.getMsg(semanticErrors.argTypeMismatch), ctx.start, ctx.stop);
                    this._errorLog.push(error);
                    return false;
                }
                break;

            default:
                throw new Error("Unknown argument type");
                break;
        }
    }

    //These are required to implement the ParseTreeListner interface.
    enterEveryRule(ctx: ParserRuleContext) {
    };
    exitEveryRule(ctx: ParserRuleContext) {
    };

    //Attemp to resolve forward references
    exitProg(ctx: ProgContext) {
        let refResolution = this._symbolTable.resolveForwardReferences();

        //Write the lable address into the location where the reference was made.
        for (let resolved of refResolution.resolved) {
            //Assume that both lableAddress and reference Address are valid because they have been internally generated.
            this.setUInt16(resolved.lableAddress, resolved.refFromAddress, this._byteCode.buffer);
        }
        //Generate errors for unresolved forward references.
        for (let unresolved of refResolution.unresolved) {
            let error = new ErrorLog(errorTypes.Assembler, semanticErrors[semanticErrors.unresolvedReference],
                this._errorMsgGen.getMsg(semanticErrors.unresolvedReference, unresolved.name), null, null);
            this._errorLog.push(error);
        }
    }
}
