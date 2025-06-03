import { ANTLRErrorListener, DiagnosticErrorListener } from 'antlr4ts';
import {Token} from 'antlr4ts';
import { Recognizer } from "antlr4ts/Recognizer";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { ErrorLog, errorTypes } from '../../Utility';

/** 
 * @description Implements ANTLRErrorListener<Token> - All parser errors are logged to the errorLog[].
 * */
export class asmLoggingErrorListener implements ANTLRErrorListener<Token> {

    _errorLog: ErrorLog[];

    /**
     * 
     * @param errorLog The array for storing the generated parse errors.
     */
    constructor(errorLog: ErrorLog[]){
        this._errorLog = errorLog;

    }

    syntaxError <T extends Token>(recognizer: Recognizer<T, any>, offendingSymbol: T | undefined, line: number, charPositionInLine: number, msg: string, e: RecognitionException | undefined) {
   
    let error = new ErrorLog(errorTypes.Assembler, "Assembler", msg, offendingSymbol, null);

    //Append error to log...
    this._errorLog.push(error);    
    }
}