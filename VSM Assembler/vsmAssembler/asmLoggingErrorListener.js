"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utility_1 = require("../../Utility");
class asmLoggingErrorListener {
    constructor(errorLog) {
        this._errorLog = errorLog;
    }
    syntaxError(recognizer, offendingSymbol, line, charPositionInLine, msg, e) {
        let error = new Utility_1.ErrorLog(Utility_1.errorTypes.Assembler, "Assembler", msg, offendingSymbol, null);
        this._errorLog.push(error);
    }
}
exports.asmLoggingErrorListener = asmLoggingErrorListener;
//# sourceMappingURL=asmLoggingErrorListener.js.map