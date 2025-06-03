"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorTypes;
(function (errorTypes) {
    errorTypes[errorTypes["Syntax"] = 0] = "Syntax";
    errorTypes[errorTypes["Semantic"] = 1] = "Semantic";
    errorTypes[errorTypes["Assembler"] = 2] = "Assembler";
})(errorTypes = exports.errorTypes || (exports.errorTypes = {}));
class ErrorLog {
    constructor(type, name, desc, startToken, stopToken) {
        this._type = type;
        this._name = name;
        this._description = desc;
        this._startToken = startToken;
        this._stopToken = stopToken;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get line() {
        return this._line;
    }
    get column() {
        return this._column;
    }
    get startToken() {
        return this._startToken;
    }
    get stopToken() {
        return this._stopToken;
    }
    toString() {
        return errorTypes[this._type] + " Error: " + this._description + " (" + this._startToken.line + ", " + this._startToken.charPositionInLine + ")";
    }
}
exports.ErrorLog = ErrorLog;
//# sourceMappingURL=ErrorLog.js.map