// Generated from c:\Users\david\OneDrive\Projects\uDev System\Software\Source Code\Compiler Dev\VSM Assembler\asm.g4 by ANTLR 4.6-SNAPSHOT


import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { FailedPredicateException } from 'antlr4ts/FailedPredicateException';
import { NotNull } from 'antlr4ts/Decorators';
import { NoViableAltException } from 'antlr4ts/NoViableAltException';
import { Override } from 'antlr4ts/Decorators';
import { Parser } from 'antlr4ts/Parser';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { ParserATNSimulator } from 'antlr4ts/atn/ParserATNSimulator';
import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';
import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';
import { RecognitionException } from 'antlr4ts/RecognitionException';
import { RuleContext } from 'antlr4ts/RuleContext';
import { RuleVersion } from 'antlr4ts/RuleVersion';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Token } from 'antlr4ts/Token';
import { TokenStream } from 'antlr4ts/TokenStream';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';

import * as Utils from 'antlr4ts/misc/Utils';

import { asmListener } from './asmListener';
import { asmVisitor } from './asmVisitor';


export class asmParser extends Parser {
	public static readonly T__0=1;
	public static readonly T__1=2;
	public static readonly NAME=3;
	public static readonly STRING=4;
	public static readonly INT=5;
	public static readonly FLOAT=6;
	public static readonly COMMENT=7;
	public static readonly EOL=8;
	public static readonly WS=9;
	public static readonly RULE_prog = 0;
	public static readonly RULE_line = 1;
	public static readonly RULE_instruction = 2;
	public static readonly RULE_opcode = 3;
	public static readonly RULE_label = 4;
	public static readonly RULE_argumentlist = 5;
	public static readonly RULE_argument = 6;
	public static readonly ruleNames: string[] = [
		"prog", "line", "instruction", "opcode", "label", "argumentlist", "argument"
	];

	private static readonly _LITERAL_NAMES: (string | undefined)[] = [
		undefined, "':'", "','"
	];
	private static readonly _SYMBOLIC_NAMES: (string | undefined)[] = [
		undefined, undefined, undefined, "NAME", "STRING", "INT", "FLOAT", "COMMENT", 
		"EOL", "WS"
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(asmParser._LITERAL_NAMES, asmParser._SYMBOLIC_NAMES, []);

	@Override
	@NotNull
	public get vocabulary(): Vocabulary {
		return asmParser.VOCABULARY;
	}

	@Override
	public get grammarFileName(): string { return "asm.g4"; }

	@Override
	public get ruleNames(): string[] { return asmParser.ruleNames; }

	@Override
	public get serializedATN(): string { return asmParser._serializedATN; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(asmParser._ATN, this);
	}
	@RuleVersion(0)
	public prog(): ProgContext {
		let _localctx: ProgContext = new ProgContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, asmParser.RULE_prog);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 17; 
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 14;
				this.line();
				this.state = 15;
				this.match(asmParser.EOL);
				}
				}
				this.state = 19; 
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ( (((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << asmParser.NAME) | (1 << asmParser.COMMENT) | (1 << asmParser.EOL))) !== 0) );
			this.state = 21;
			this.match(asmParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public line(): LineContext {
		let _localctx: LineContext = new LineContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, asmParser.RULE_line);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 24;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,1,this._ctx) ) {
			case 1:
				{
				this.state = 23;
				this.label();
				}
				break;
			}
			this.state = 27;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===asmParser.NAME) {
				{
				this.state = 26;
				this.instruction();
				}
			}

			this.state = 30;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===asmParser.COMMENT) {
				{
				this.state = 29;
				this.match(asmParser.COMMENT);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public instruction(): InstructionContext {
		let _localctx: InstructionContext = new InstructionContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, asmParser.RULE_instruction);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 32;
			this.opcode();
			this.state = 34;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << asmParser.NAME) | (1 << asmParser.STRING) | (1 << asmParser.INT) | (1 << asmParser.FLOAT))) !== 0)) {
				{
				this.state = 33;
				this.argumentlist();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public opcode(): OpcodeContext {
		let _localctx: OpcodeContext = new OpcodeContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, asmParser.RULE_opcode);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 36;
			this.match(asmParser.NAME);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public label(): LabelContext {
		let _localctx: LabelContext = new LabelContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, asmParser.RULE_label);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 38;
			this.match(asmParser.NAME);
			this.state = 39;
			this.match(asmParser.T__0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public argumentlist(): ArgumentlistContext {
		let _localctx: ArgumentlistContext = new ArgumentlistContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, asmParser.RULE_argumentlist);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 41;
			this.argument();
			this.state = 46;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===asmParser.T__1) {
				{
				{
				this.state = 42;
				this.match(asmParser.T__1);
				this.state = 43;
				this.argument();
				}
				}
				this.state = 48;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public argument(): ArgumentContext {
		let _localctx: ArgumentContext = new ArgumentContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, asmParser.RULE_argument);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 49;
			_la = this._input.LA(1);
			if ( !((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << asmParser.NAME) | (1 << asmParser.STRING) | (1 << asmParser.INT) | (1 << asmParser.FLOAT))) !== 0)) ) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x03\v6\x04\x02\t"+
		"\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07\t"+
		"\x07\x04\b\t\b\x03\x02\x03\x02\x03\x02\x06\x02\x14\n\x02\r\x02\x0E\x02"+
		"\x15\x03\x02\x03\x02\x03\x03\x05\x03\x1B\n\x03\x03\x03\x05\x03\x1E\n\x03"+
		"\x03\x03\x05\x03!\n\x03\x03\x04\x03\x04\x05\x04%\n\x04\x03\x05\x03\x05"+
		"\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x07\x07/\n\x07\f\x07"+
		"\x0E\x072\v\x07\x03\b\x03\b\x03\b\x02\x02\x02\t\x02\x02\x04\x02\x06\x02"+
		"\b\x02\n\x02\f\x02\x0E\x02\x02\x03\x03\x02\x05\b4\x02\x13\x03\x02\x02"+
		"\x02\x04\x1A\x03\x02\x02\x02\x06\"\x03\x02\x02\x02\b&\x03\x02\x02\x02"+
		"\n(\x03\x02\x02\x02\f+\x03\x02\x02\x02\x0E3\x03\x02\x02\x02\x10\x11\x05"+
		"\x04\x03\x02\x11\x12\x07\n\x02\x02\x12\x14\x03\x02\x02\x02\x13\x10\x03"+
		"\x02\x02\x02\x14\x15\x03\x02\x02\x02\x15\x13\x03\x02\x02\x02\x15\x16\x03"+
		"\x02\x02\x02\x16\x17\x03\x02\x02\x02\x17\x18\x07\x02\x02\x03\x18\x03\x03"+
		"\x02\x02\x02\x19\x1B\x05\n\x06\x02\x1A\x19\x03\x02\x02\x02\x1A\x1B\x03"+
		"\x02\x02\x02\x1B\x1D\x03\x02\x02\x02\x1C\x1E\x05\x06\x04\x02\x1D\x1C\x03"+
		"\x02\x02\x02\x1D\x1E\x03\x02\x02\x02\x1E \x03\x02\x02\x02\x1F!\x07\t\x02"+
		"\x02 \x1F\x03\x02\x02\x02 !\x03\x02\x02\x02!\x05\x03\x02\x02\x02\"$\x05"+
		"\b\x05\x02#%\x05\f\x07\x02$#\x03\x02\x02\x02$%\x03\x02\x02\x02%\x07\x03"+
		"\x02\x02\x02&\'\x07\x05\x02\x02\'\t\x03\x02\x02\x02()\x07\x05\x02\x02"+
		")*\x07\x03\x02\x02*\v\x03\x02\x02\x02+0\x05\x0E\b\x02,-\x07\x04\x02\x02"+
		"-/\x05\x0E\b\x02.,\x03\x02\x02\x02/2\x03\x02\x02\x020.\x03\x02\x02\x02"+
		"01\x03\x02\x02\x021\r\x03\x02\x02\x0220\x03\x02\x02\x0234\t\x02\x02\x02"+
		"4\x0F\x03\x02\x02\x02\b\x15\x1A\x1D $0";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!asmParser.__ATN) {
			asmParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(asmParser._serializedATN));
		}

		return asmParser.__ATN;
	}

}

export class ProgContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(asmParser.EOF, 0); }
	public line(): LineContext[];
	public line(i: number): LineContext;
	public line(i?: number): LineContext | LineContext[] {
		if (i === undefined) {
			return this.getRuleContexts(LineContext);
		} else {
			return this.getRuleContext(i, LineContext);
		}
	}
	public EOL(): TerminalNode[];
	public EOL(i: number): TerminalNode;
	public EOL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(asmParser.EOL);
		} else {
			return this.getToken(asmParser.EOL, i);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return asmParser.RULE_prog; }
	@Override
	public enterRule(listener: asmListener): void {
		if (listener.enterProg) listener.enterProg(this);
	}
	@Override
	public exitRule(listener: asmListener): void {
		if (listener.exitProg) listener.exitProg(this);
	}
	@Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitProg) return visitor.visitProg(this);
		else return visitor.visitChildren(this);
	}
}


export class LineContext extends ParserRuleContext {
	public label(): LabelContext | undefined {
		return this.tryGetRuleContext(0, LabelContext);
	}
	public instruction(): InstructionContext | undefined {
		return this.tryGetRuleContext(0, InstructionContext);
	}
	public COMMENT(): TerminalNode | undefined { return this.tryGetToken(asmParser.COMMENT, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return asmParser.RULE_line; }
	@Override
	public enterRule(listener: asmListener): void {
		if (listener.enterLine) listener.enterLine(this);
	}
	@Override
	public exitRule(listener: asmListener): void {
		if (listener.exitLine) listener.exitLine(this);
	}
	@Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitLine) return visitor.visitLine(this);
		else return visitor.visitChildren(this);
	}
}


export class InstructionContext extends ParserRuleContext {
	public opcode(): OpcodeContext {
		return this.getRuleContext(0, OpcodeContext);
	}
	public argumentlist(): ArgumentlistContext | undefined {
		return this.tryGetRuleContext(0, ArgumentlistContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return asmParser.RULE_instruction; }
	@Override
	public enterRule(listener: asmListener): void {
		if (listener.enterInstruction) listener.enterInstruction(this);
	}
	@Override
	public exitRule(listener: asmListener): void {
		if (listener.exitInstruction) listener.exitInstruction(this);
	}
	@Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitInstruction) return visitor.visitInstruction(this);
		else return visitor.visitChildren(this);
	}
}


export class OpcodeContext extends ParserRuleContext {
	public NAME(): TerminalNode { return this.getToken(asmParser.NAME, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return asmParser.RULE_opcode; }
	@Override
	public enterRule(listener: asmListener): void {
		if (listener.enterOpcode) listener.enterOpcode(this);
	}
	@Override
	public exitRule(listener: asmListener): void {
		if (listener.exitOpcode) listener.exitOpcode(this);
	}
	@Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitOpcode) return visitor.visitOpcode(this);
		else return visitor.visitChildren(this);
	}
}


export class LabelContext extends ParserRuleContext {
	public NAME(): TerminalNode { return this.getToken(asmParser.NAME, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return asmParser.RULE_label; }
	@Override
	public enterRule(listener: asmListener): void {
		if (listener.enterLabel) listener.enterLabel(this);
	}
	@Override
	public exitRule(listener: asmListener): void {
		if (listener.exitLabel) listener.exitLabel(this);
	}
	@Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitLabel) return visitor.visitLabel(this);
		else return visitor.visitChildren(this);
	}
}


export class ArgumentlistContext extends ParserRuleContext {
	public argument(): ArgumentContext[];
	public argument(i: number): ArgumentContext;
	public argument(i?: number): ArgumentContext | ArgumentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ArgumentContext);
		} else {
			return this.getRuleContext(i, ArgumentContext);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return asmParser.RULE_argumentlist; }
	@Override
	public enterRule(listener: asmListener): void {
		if (listener.enterArgumentlist) listener.enterArgumentlist(this);
	}
	@Override
	public exitRule(listener: asmListener): void {
		if (listener.exitArgumentlist) listener.exitArgumentlist(this);
	}
	@Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitArgumentlist) return visitor.visitArgumentlist(this);
		else return visitor.visitChildren(this);
	}
}


export class ArgumentContext extends ParserRuleContext {
	public INT(): TerminalNode | undefined { return this.tryGetToken(asmParser.INT, 0); }
	public FLOAT(): TerminalNode | undefined { return this.tryGetToken(asmParser.FLOAT, 0); }
	public NAME(): TerminalNode | undefined { return this.tryGetToken(asmParser.NAME, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(asmParser.STRING, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return asmParser.RULE_argument; }
	@Override
	public enterRule(listener: asmListener): void {
		if (listener.enterArgument) listener.enterArgument(this);
	}
	@Override
	public exitRule(listener: asmListener): void {
		if (listener.exitArgument) listener.exitArgument(this);
	}
	@Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitArgument) return visitor.visitArgument(this);
		else return visitor.visitChildren(this);
	}
}


