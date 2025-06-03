"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utility_1 = require("../../Utility");
const Utility_2 = require("../../Utility");
Math.fround = Math.fround || (function (array) {
    return function (x) {
        return array[0] = x, array[0];
    };
})(new Float32Array(1));
const instructionMapping_1 = require("./instructionMapping");
const asmSemanticErrors_1 = require("./asmSemanticErrors");
class asmCodeGenListener {
    constructor(byteCode, errorLog, symbolTable) {
        this._byteCode = byteCode;
        this._errorLog = errorLog;
        this._symbolTable = symbolTable;
        this._pc = 0;
        this._errorMsgGen = new Utility_1.ErrorMsgGenerator(asmSemanticErrors_1.semanticErrorMsgTemplates);
    }
    setUInt8(num, offset, buffer) {
        if (num <= Utility_2.TypeLimits.UInt8_Max && num >= 0) {
            let view = new DataView(buffer);
            view.setUint8(offset, num);
            return true;
        }
        else {
            return false;
        }
    }
    setInt8(num, offset, buffer) {
        if (num <= Utility_2.TypeLimits.Int8_Max && num >= Utility_2.TypeLimits.Int8_Min) {
            let view = new DataView(buffer);
            view.setInt8(offset, num);
            return true;
        }
        else {
            return false;
        }
    }
    setUInt16(num, offset, buffer) {
        let view = new DataView(buffer);
        view.setUint16(offset, num, true);
        if (num <= Utility_2.TypeLimits.UInt16_Max && num >= 0) {
            view.setUint16(offset, num, true);
            return true;
        }
        else {
            return false;
        }
    }
    setInt16(num, offset, buffer) {
        if (num <= Utility_2.TypeLimits.Int16_Max && num >= Utility_2.TypeLimits.Int16_Min) {
            let view = new DataView(buffer);
            view.setInt16(offset, num, true);
            return true;
        }
        else {
            return false;
        }
    }
    setInt32(num, offset, buffer) {
        if (num <= Utility_2.TypeLimits.Int32_Max && num >= Utility_2.TypeLimits.Int32_Min) {
            let view = new DataView(buffer);
            view.setInt32(offset, num, true);
            return true;
        }
        else {
            return false;
        }
    }
    setFloat32(num, offset, buffer) {
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
    setString(str, offset, buffer) {
        if (!str.endsWith("\0", str.length)) {
            str += "\0";
        }
        let view = new DataView(buffer);
        let strStart = offset + 1;
        for (var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i);
            view.setUint8(strStart + i, code);
        }
        if (!this.setUInt8(str.length, offset, buffer)) {
            return -1;
        }
        return i + 1;
    }
    stringToNumber(numAsString) {
        let num = Number(numAsString);
        if (!Number.isNaN(num)) {
            return num;
        }
        else {
            throw new Error("Address is not a number");
        }
    }
    writeReference(destName) {
        let destAddress = this._symbolTable.resolve(destName, this._pc);
        if (destAddress != null) {
            this.setUInt16(destAddress, this._pc, this._byteCode.buffer);
            this._pc += 2;
        }
        else {
            this.setUInt16(0, this._pc, this._byteCode.buffer);
            this._pc += 2;
        }
    }
    getInstructionDef(opcodeString) {
        let def = instructionMapping_1.instructionLookupTable[opcodeString];
        if (def != undefined) {
            return def;
        }
        else {
            return null;
        }
    }
    exitLabel(ctx) {
        if (this._symbolTable.define(ctx.NAME().text, this._pc) == false) {
            let error = new Utility_1.ErrorLog(Utility_1.errorTypes.Assembler, asmSemanticErrors_1.semanticErrors[asmSemanticErrors_1.semanticErrors.lableAlreadyExists], this._errorMsgGen.getMsg(asmSemanticErrors_1.semanticErrors.lableAlreadyExists, ctx.NAME().text), ctx.start, ctx.stop);
            this._errorLog.push(error);
        }
    }
    getArgumentWrapper(argumentList, index) {
        try {
            return argumentList.argument(index);
        }
        catch (Error) {
            return null;
        }
    }
    exitInstruction(ctx) {
        let opcode = ctx.opcode().NAME().text;
        let instDef = this.getInstructionDef(opcode);
        if (instDef != null) {
            this._byteCode[this._pc++] = instDef.opcode;
            if (ctx.argumentlist() != undefined) {
                let actArgs = [];
                let count = 0;
                while (this.getArgumentWrapper(ctx.argumentlist(), count)) {
                    actArgs[count] = this.getArgumentWrapper(ctx.argumentlist(), count);
                    count++;
                }
                if (actArgs.length == instDef.arguments.length) {
                    count = 0;
                    for (let defArg of instDef.arguments) {
                        let actArg = actArgs[count];
                        this.writeArg(actArg, defArg, actArg);
                        count++;
                    }
                }
                else {
                    let error = new Utility_1.ErrorLog(Utility_1.errorTypes.Assembler, asmSemanticErrors_1.semanticErrors[asmSemanticErrors_1.semanticErrors.argCountMismatch], this._errorMsgGen.getMsg(asmSemanticErrors_1.semanticErrors.argCountMismatch), ctx.start, ctx.stop);
                    this._errorLog.push(error);
                }
            }
            else {
                if (instDef.arguments.length != 0) {
                    let error = new Utility_1.ErrorLog(Utility_1.errorTypes.Assembler, asmSemanticErrors_1.semanticErrors[asmSemanticErrors_1.semanticErrors.argCountMismatch], this._errorMsgGen.getMsg(asmSemanticErrors_1.semanticErrors.argCountMismatch), ctx.start, ctx.stop);
                    this._errorLog.push(error);
                }
            }
        }
        else {
            let error = new Utility_1.ErrorLog(Utility_1.errorTypes.Assembler, asmSemanticErrors_1.semanticErrors[asmSemanticErrors_1.semanticErrors.unknownOpcode], this._errorMsgGen.getMsg(asmSemanticErrors_1.semanticErrors.unknownOpcode, opcode), ctx.start, ctx.stop);
            this._errorLog.push(error);
        }
    }
    writeArg(arg, type, ctx) {
        let result = false;
        switch (type) {
            case instructionMapping_1.argTypes.FLOAT32:
                if (arg.FLOAT() != undefined || arg.INT() != undefined) {
                    let num = Number(arg.text);
                    if (this.setFloat32(num, this._pc, this._byteCode.buffer)) {
                        this._pc += 4;
                        return true;
                    }
                    else {
                        let error = new Utility_1.ErrorLog(Utility_1.errorTypes.Assembler, asmSemanticErrors_1.semanticErrors[asmSemanticErrors_1.semanticErrors.outOfRange], this._errorMsgGen.getMsg(asmSemanticErrors_1.semanticErrors.outOfRange, num.toString()), ctx.start, ctx.stop);
                        this._errorLog.push(error);
                        return false;
                    }
                }
                else {
                    let error = new Utility_1.ErrorLog(Utility_1.errorTypes.Assembler, asmSemanticErrors_1.semanticErrors[asmSemanticErrors_1.semanticErrors.argTypeMismatch], this._errorMsgGen.getMsg(asmSemanticErrors_1.semanticErrors.argTypeMismatch), ctx.start, ctx.stop);
                    this._errorLog.push(error);
                    return false;
                }
                break;
            case instructionMapping_1.argTypes.INT32:
                if (arg.INT() != undefined) {
                    let num = Number(arg.text);
                    result = this.setInt32(num, this._pc, this._byteCode.buffer);
                    if (result) {
                        this._pc += 4;
                        return true;
                    }
                    else {
                        let error = new Utility_1.ErrorLog(Utility_1.errorTypes.Assembler, asmSemanticErrors_1.semanticErrors[asmSemanticErrors_1.semanticErrors.outOfRange], this._errorMsgGen.getMsg(asmSemanticErrors_1.semanticErrors.outOfRange, num.toString()), ctx.start, ctx.stop);
                        this._errorLog.push(error);
                        return false;
                    }
                }
                else {
                    let error = new Utility_1.ErrorLog(Utility_1.errorTypes.Assembler, asmSemanticErrors_1.semanticErrors[asmSemanticErrors_1.semanticErrors.argTypeMismatch], this._errorMsgGen.getMsg(asmSemanticErrors_1.semanticErrors.argTypeMismatch), ctx.start, ctx.stop);
                    this._errorLog.push(error);
                    return false;
                }
                break;
            case instructionMapping_1.argTypes.INT16:
                if (arg.INT() != undefined) {
                    let num = Number(arg.text);
                    if (this.setInt16(num, this._pc, this._byteCode.buffer)) {
                        this._pc += 2;
                        return true;
                    }
                    else {
                        let error = new Utility_1.ErrorLog(Utility_1.errorTypes.Assembler, asmSemanticErrors_1.semanticErrors[asmSemanticErrors_1.semanticErrors.outOfRange], this._errorMsgGen.getMsg(asmSemanticErrors_1.semanticErrors.outOfRange, num.toString()), ctx.start, ctx.stop);
                        this._errorLog.push(error);
                        return false;
                    }
                }
                else {
                    let error = new Utility_1.ErrorLog(Utility_1.errorTypes.Assembler, asmSemanticErrors_1.semanticErrors[asmSemanticErrors_1.semanticErrors.argTypeMismatch], this._errorMsgGen.getMsg(asmSemanticErrors_1.semanticErrors.argTypeMismatch), ctx.start, ctx.stop);
                    this._errorLog.push(error);
                    return false;
                }
                break;
            case instructionMapping_1.argTypes.UINT16:
                if (arg.INT() != undefined) {
                    let num = Number(arg.text);
                    if (this.setUInt16(num, this._pc, this._byteCode.buffer)) {
                        this._pc += 2;
                        return true;
                    }
                    else {
                        let error = new Utility_1.ErrorLog(Utility_1.errorTypes.Assembler, asmSemanticErrors_1.semanticErrors[asmSemanticErrors_1.semanticErrors.outOfRange], this._errorMsgGen.getMsg(asmSemanticErrors_1.semanticErrors.outOfRange, num.toString()), ctx.start, ctx.stop);
                        this._errorLog.push(error);
                        return false;
                    }
                }
                else {
                    let error = new Utility_1.ErrorLog(Utility_1.errorTypes.Assembler, asmSemanticErrors_1.semanticErrors[asmSemanticErrors_1.semanticErrors.argTypeMismatch], this._errorMsgGen.getMsg(asmSemanticErrors_1.semanticErrors.argTypeMismatch), ctx.start, ctx.stop);
                    this._errorLog.push(error);
                    return false;
                }
                break;
            case instructionMapping_1.argTypes.INT8:
                if (arg.INT() != undefined) {
                    let num = Number(arg.text);
                    if (result = this.setInt8(num, this._pc, this._byteCode.buffer)) {
                        this._pc += 1;
                        return true;
                    }
                    else {
                        let error = new Utility_1.ErrorLog(Utility_1.errorTypes.Assembler, asmSemanticErrors_1.semanticErrors[asmSemanticErrors_1.semanticErrors.outOfRange], this._errorMsgGen.getMsg(asmSemanticErrors_1.semanticErrors.outOfRange, num.toString()), ctx.start, ctx.stop);
                        this._errorLog.push(error);
                        return false;
                    }
                }
                else {
                    let error = new Utility_1.ErrorLog(Utility_1.errorTypes.Assembler, asmSemanticErrors_1.semanticErrors[asmSemanticErrors_1.semanticErrors.argTypeMismatch], this._errorMsgGen.getMsg(asmSemanticErrors_1.semanticErrors.argTypeMismatch), ctx.start, ctx.stop);
                    this._errorLog.push(error);
                    return false;
                }
                break;
            case instructionMapping_1.argTypes.UINT8:
                if (arg.INT() != undefined) {
                    let num = Number(arg.text);
                    if (this.setUInt8(num, this._pc, this._byteCode.buffer)) {
                        this._pc += 1;
                        return true;
                    }
                    else {
                        let error = new Utility_1.ErrorLog(Utility_1.errorTypes.Assembler, asmSemanticErrors_1.semanticErrors[asmSemanticErrors_1.semanticErrors.outOfRange], this._errorMsgGen.getMsg(asmSemanticErrors_1.semanticErrors.outOfRange, num.toString()), ctx.start, ctx.stop);
                        this._errorLog.push(error);
                        return false;
                    }
                }
                else {
                    let error = new Utility_1.ErrorLog(Utility_1.errorTypes.Assembler, asmSemanticErrors_1.semanticErrors[asmSemanticErrors_1.semanticErrors.argTypeMismatch], this._errorMsgGen.getMsg(asmSemanticErrors_1.semanticErrors.argTypeMismatch), ctx.start, ctx.stop);
                    this._errorLog.push(error);
                    return false;
                }
                break;
            case instructionMapping_1.argTypes.NAME:
                if (arg.NAME() != undefined) {
                    this.writeReference(arg.NAME().text);
                    return true;
                }
                else {
                    let error = new Utility_1.ErrorLog(Utility_1.errorTypes.Assembler, asmSemanticErrors_1.semanticErrors[asmSemanticErrors_1.semanticErrors.argTypeMismatch], this._errorMsgGen.getMsg(asmSemanticErrors_1.semanticErrors.argTypeMismatch), ctx.start, ctx.stop);
                    this._errorLog.push(error);
                    return false;
                }
                break;
            case instructionMapping_1.argTypes.STRING:
                if (arg.STRING() != undefined) {
                    let str;
                    str = arg.STRING().text;
                    str = str.slice(1, str.length - 1);
                    let byteCount = this.setString(str, this._pc, this._byteCode.buffer);
                    if (byteCount == -1) {
                        let error = new Utility_1.ErrorLog(Utility_1.errorTypes.Assembler, asmSemanticErrors_1.semanticErrors[asmSemanticErrors_1.semanticErrors.stringSizeOverflow], this._errorMsgGen.getMsg(asmSemanticErrors_1.semanticErrors.stringSizeOverflow), ctx.start, ctx.stop);
                        this._errorLog.push(error);
                        return false;
                    }
                    else {
                        this._pc += byteCount;
                        return true;
                    }
                }
                else {
                    let error = new Utility_1.ErrorLog(Utility_1.errorTypes.Assembler, asmSemanticErrors_1.semanticErrors[asmSemanticErrors_1.semanticErrors.argTypeMismatch], this._errorMsgGen.getMsg(asmSemanticErrors_1.semanticErrors.argTypeMismatch), ctx.start, ctx.stop);
                    this._errorLog.push(error);
                    return false;
                }
                break;
            default:
                throw new Error("Unknown argument type");
                break;
        }
    }
    enterEveryRule(ctx) {
    }
    ;
    exitEveryRule(ctx) {
    }
    ;
    exitProg(ctx) {
        let refResolution = this._symbolTable.resolveForwardReferences();
        for (let resolved of refResolution.resolved) {
            this.setUInt16(resolved.lableAddress, resolved.refFromAddress, this._byteCode.buffer);
        }
        for (let unresolved of refResolution.unresolved) {
            let error = new Utility_1.ErrorLog(Utility_1.errorTypes.Assembler, asmSemanticErrors_1.semanticErrors[asmSemanticErrors_1.semanticErrors.unresolvedReference], this._errorMsgGen.getMsg(asmSemanticErrors_1.semanticErrors.unresolvedReference, unresolved.name), null, null);
            this._errorLog.push(error);
        }
    }
}
exports.asmCodeGenListener = asmCodeGenListener;
//# sourceMappingURL=asmCodeGenListener.js.map