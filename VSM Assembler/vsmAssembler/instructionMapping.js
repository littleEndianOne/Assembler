"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var argTypes;
(function (argTypes) {
    argTypes[argTypes["INT8"] = 0] = "INT8";
    argTypes[argTypes["INT16"] = 1] = "INT16";
    argTypes[argTypes["INT32"] = 2] = "INT32";
    argTypes[argTypes["FLOAT32"] = 3] = "FLOAT32";
    argTypes[argTypes["UINT8"] = 4] = "UINT8";
    argTypes[argTypes["UINT16"] = 5] = "UINT16";
    argTypes[argTypes["NAME"] = 6] = "NAME";
    argTypes[argTypes["STRING"] = 7] = "STRING";
})(argTypes = exports.argTypes || (exports.argTypes = {}));
exports.instructionLookupTable = {
    ["CONSTF"]: { opcode: 1, arguments: [argTypes.FLOAT32] },
    ["CONSTF8"]: { opcode: 2, arguments: [argTypes.INT8] },
    ["CONSTF16"]: { opcode: 3, arguments: [argTypes.INT16] },
    ["CONSTFN0"]: { opcode: 4, arguments: [] },
    ["CONSTFN1"]: { opcode: 5, arguments: [] },
    ["CONSTFN2"]: { opcode: 6, arguments: [] },
    ["CONSTFN3"]: { opcode: 7, arguments: [] },
    ["CONSTFN4"]: { opcode: 8, arguments: [] },
    ["CONSTFN5"]: { opcode: 9, arguments: [] },
    ["CONSTFN6"]: { opcode: 10, arguments: [] },
    ["CONSTFN7"]: { opcode: 11, arguments: [] },
    ["CONSTFN8"]: { opcode: 12, arguments: [] },
    ["CONSTFN9"]: { opcode: 13, arguments: [] },
    ["CONSTFN10"]: { opcode: 14, arguments: [] },
    ["CONSTI"]: { opcode: 15, arguments: [argTypes.INT32] },
    ["CONSTI8"]: { opcode: 16, arguments: [argTypes.INT8] },
    ["CONSTI16"]: { opcode: 17, arguments: [argTypes.INT16] },
    ["CONSTIN0"]: { opcode: 18, arguments: [] },
    ["STRLIT"]: { opcode: 19, arguments: [argTypes.STRING] },
    ["ADDF"]: { opcode: 20, arguments: [] },
    ["SUBF"]: { opcode: 21, arguments: [] },
    ["DIVF"]: { opcode: 22, arguments: [] },
    ["MULF"]: { opcode: 23, arguments: [] },
    ["EQF"]: { opcode: 24, arguments: [] },
    ["LTF"]: { opcode: 25, arguments: [] },
    ["GTF"]: { opcode: 26, arguments: [] },
    ["NEQF"]: { opcode: 27, arguments: [] },
    ["ADDI"]: { opcode: 28, arguments: [] },
    ["SUBI"]: { opcode: 29, arguments: [] },
    ["DIVI"]: { opcode: 30, arguments: [] },
    ["MULI"]: { opcode: 31, arguments: [] },
    ["EQI"]: { opcode: 32, arguments: [] },
    ["LTI"]: { opcode: 33, arguments: [] },
    ["GTI"]: { opcode: 34, arguments: [] },
    ["NEQI"]: { opcode: 35, arguments: [] },
    ["JMP"]: { opcode: 36, arguments: [argTypes.NAME] },
    ["JMPT"]: { opcode: 37, arguments: [argTypes.NAME] },
    ["JMPF"]: { opcode: 38, arguments: [argTypes.NAME] },
    ["CALL"]: { opcode: 39, arguments: [argTypes.UINT16, argTypes.UINT8, argTypes.UINT8] },
    ["RET"]: { opcode: 40, arguments: [] },
    ["LDARG"]: { opcode: 41, arguments: [argTypes.UINT8] },
    ["DSTR"]: { opcode: 42, arguments: [argTypes.UINT8, argTypes.UINT8] },
    ["STORE"]: { opcode: 43, arguments: [argTypes.UINT8] },
    ["LOAD"]: { opcode: 44, arguments: [argTypes.UINT8] },
    ["APPEND"]: { opcode: 45, arguments: [] },
    ["TOSTR"]: { opcode: 46, arguments: [] },
    ["GDSTR"]: { opcode: 47, arguments: [argTypes.UINT8, argTypes.UINT8] },
    ["GSTORE"]: { opcode: 48, arguments: [argTypes.UINT8] },
    ["GLOAD"]: { opcode: 49, arguments: [argTypes.UINT8] },
    ["POP"]: { opcode: 52, arguments: [] },
    ["DARRAY"]: { opcode: 53, arguments: [argTypes.UINT8, argTypes.UINT8] },
    ["STOREAE"]: { opcode: 54, arguments: [argTypes.UINT8, argTypes.UINT8] },
    ["LOADAE"]: { opcode: 55, arguments: [argTypes.UINT8, argTypes.UINT8] },
    ["GDARRAY"]: { opcode: 56, arguments: [argTypes.UINT8, argTypes.UINT8] },
    ["GSTOREAE"]: { opcode: 57, arguments: [argTypes.UINT8, argTypes.UINT8] },
    ["GLOADAE"]: { opcode: 58, arguments: [argTypes.UINT8, argTypes.UINT8] },
    ["PROMOTE"]: { opcode: 59, arguments: [] },
    ["DEMOTE"]: { opcode: 60, arguments: [] },
    ["HALT"]: { opcode: 255, arguments: [] },
};
//# sourceMappingURL=instructionMapping.js.map