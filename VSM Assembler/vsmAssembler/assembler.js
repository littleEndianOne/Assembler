"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asmSymbolTable_1 = require("./asmSymbolTable");
const antlr4ts_1 = require("antlr4ts");
const asmLexer_1 = require("./asmParser/asmLexer");
const asmParser_1 = require("./asmParser/asmParser");
const tree_1 = require("antlr4ts/tree");
const asmLoggingErrorListener_1 = require("./asmLoggingErrorListener");
const asmCodeGenListener_1 = require("./asmCodeGenListener");
class Assembler {
    constructor(assemblyCode, machineCode, errorLog) {
        this._assemblyCode = assemblyCode;
        this._byteCode = machineCode;
        this._errorLog = errorLog;
        this._symbolTable = new asmSymbolTable_1.asmSymbolTable();
        let asmErrorLogger = new asmLoggingErrorListener_1.asmLoggingErrorListener(this._errorLog);
        this._inputStream = new antlr4ts_1.ANTLRInputStream(assemblyCode);
        this._lexer = new asmLexer_1.asmLexer(this._inputStream);
        this._tokenStream = new antlr4ts_1.CommonTokenStream(this._lexer);
        this._parser = new asmParser_1.asmParser(this._tokenStream);
        this._parser.removeErrorListeners();
        this._parser.addErrorListener(asmErrorLogger);
        let walker = new tree_1.ParseTreeWalker();
        this._codeGenListener = new asmCodeGenListener_1.asmCodeGenListener(this._byteCode, this._errorLog, this._symbolTable);
        let tree = this._parser.prog();
        if (this._errorLog.length == 0) {
            walker.walk(this._codeGenListener, tree);
        }
    }
    get parser() {
        return this._parser;
    }
    get tree() {
        return this._parseTree;
    }
    get errors() {
        return this._errorLog;
    }
    get byteCode() {
        return this._byteCode;
    }
}
exports.Assembler = Assembler;
//# sourceMappingURL=Assembler.js.map