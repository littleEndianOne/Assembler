import { asmSymbolTable } from "./asmSymbolTable";

import { ANTLRInputStream, CommonTokenStream, } from 'antlr4ts';
import { asmLexer } from './asmParser/asmLexer';
import { asmParser } from './asmParser/asmParser';

import { ParseTreeWalker } from 'antlr4ts/tree';
import { ErrorLog } from '../../Utility';
import { asmLoggingErrorListener } from './asmLoggingErrorListener';
import { asmCodeGenListener } from './asmCodeGenListener';

export class Assembler {
    _inputStream: ANTLRInputStream;
    _lexer: asmLexer;
    _tokenStream: CommonTokenStream;
    _parser: asmParser;
    _parseTree: any;
    _errorLog: ErrorLog[];
    _symbolTable: asmSymbolTable;
    
    _assemblyCode: string;
    _byteCode: Uint8Array;  
    _codeGenListener: asmCodeGenListener;  

    constructor(assemblyCode: string, machineCode: Uint8Array, errorLog: ErrorLog[]) {
        this._assemblyCode = assemblyCode;
        this._byteCode = machineCode;
        this._errorLog = errorLog;        

        this._symbolTable = new asmSymbolTable();
        let asmErrorLogger = new asmLoggingErrorListener(this._errorLog);
        this._inputStream = new ANTLRInputStream(assemblyCode);
        this._lexer = new asmLexer(this._inputStream);
        this._tokenStream = new CommonTokenStream(this._lexer);
        this._parser = new asmParser(this._tokenStream);
        //Log parser errors to errorLog[]
        this._parser.removeErrorListeners();
        this._parser.addErrorListener(asmErrorLogger);

        let walker: ParseTreeWalker = new ParseTreeWalker(); ​   ​// create listener then feed to walker
        this._codeGenListener = new asmCodeGenListener(this._byteCode, this._errorLog, this._symbolTable);        
        
        let tree = this._parser.prog();
        //Only walk the parse tree if there were no syntax errors.
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