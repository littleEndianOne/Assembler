"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var semanticErrors;
(function (semanticErrors) {
    semanticErrors[semanticErrors["outOfRangeForAddress8"] = 0] = "outOfRangeForAddress8";
    semanticErrors[semanticErrors["outOfRangeForAddress16"] = 1] = "outOfRangeForAddress16";
    semanticErrors[semanticErrors["lableAlreadyExists"] = 2] = "lableAlreadyExists";
    semanticErrors[semanticErrors["unresolvedReference"] = 3] = "unresolvedReference";
    semanticErrors[semanticErrors["unknownOpcode"] = 4] = "unknownOpcode";
    semanticErrors[semanticErrors["argCountMismatch"] = 5] = "argCountMismatch";
    semanticErrors[semanticErrors["argTypeMismatch"] = 6] = "argTypeMismatch";
    semanticErrors[semanticErrors["stringSizeOverflow"] = 7] = "stringSizeOverflow";
    semanticErrors[semanticErrors["outOfRange"] = 8] = "outOfRange";
})(semanticErrors = exports.semanticErrors || (exports.semanticErrors = {}));
exports.semanticErrorMsgTemplates = {
    [semanticErrors.outOfRangeForAddress8]: "The varaible address <address> is out of range for a 8 bit address",
    [semanticErrors.outOfRangeForAddress16]: "The code address <address> is out of range for a 16 bit address",
    [semanticErrors.lableAlreadyExists]: "The lable <lable> has already been defined",
    [semanticErrors.unresolvedReference]: "The lable <lable> could not be resolved",
    [semanticErrors.unknownOpcode]: "The opcode <opcode> is unknown",
    [semanticErrors.argCountMismatch]: "The number of arguments does not match the instructions definition",
    [semanticErrors.argTypeMismatch]: "The argument type does not match the instructions definition",
    [semanticErrors.stringSizeOverflow]: "The string literal is longer than 255 characters",
    [semanticErrors.outOfRange]: "The value <value> is out of range for the data type",
};
//# sourceMappingURL=asmSemanticErrors.js.map