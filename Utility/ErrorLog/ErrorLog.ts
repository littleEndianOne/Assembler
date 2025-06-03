import {Token} from 'antlr4ts';

export enum errorTypes {
    Syntax,
    Semantic,
    Assembler
}

export class ErrorLog {
    _type: errorTypes;
    _name: string;
    _description: string;
    _line: number;
    _column: number;
    _startToken: Token; //tree node...
    _stopToken: Token;

    constructor(type: errorTypes, name: string, desc: string, startToken: Token, stopToken: Token) {
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

    toString(): string  {
        return errorTypes[this._type] + " Error: " + this._description + " (" + this._startToken.line + ", " + this._startToken.charPositionInLine + ")";
    }
}