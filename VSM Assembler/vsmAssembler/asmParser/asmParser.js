"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ATNDeserializer_1 = require("antlr4ts/atn/ATNDeserializer");
const Decorators_1 = require("antlr4ts/Decorators");
const Decorators_2 = require("antlr4ts/Decorators");
const Parser_1 = require("antlr4ts/Parser");
const ParserRuleContext_1 = require("antlr4ts/ParserRuleContext");
const ParserATNSimulator_1 = require("antlr4ts/atn/ParserATNSimulator");
const RecognitionException_1 = require("antlr4ts/RecognitionException");
const RuleVersion_1 = require("antlr4ts/RuleVersion");
const Token_1 = require("antlr4ts/Token");
const VocabularyImpl_1 = require("antlr4ts/VocabularyImpl");
const Utils = require("antlr4ts/misc/Utils");
class asmParser extends Parser_1.Parser {
    constructor(input) {
        super(input);
        this._interp = new ParserATNSimulator_1.ParserATNSimulator(asmParser._ATN, this);
    }
    get vocabulary() {
        return asmParser.VOCABULARY;
    }
    get grammarFileName() { return "asm.g4"; }
    get ruleNames() { return asmParser.ruleNames; }
    get serializedATN() { return asmParser._serializedATN; }
    prog() {
        let _localctx = new ProgContext(this._ctx, this.state);
        this.enterRule(_localctx, 0, asmParser.RULE_prog);
        let _la;
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
                } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << asmParser.NAME) | (1 << asmParser.COMMENT) | (1 << asmParser.EOL))) !== 0));
                this.state = 21;
                this.match(asmParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    line() {
        let _localctx = new LineContext(this._ctx, this.state);
        this.enterRule(_localctx, 2, asmParser.RULE_line);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 24;
                this._errHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this._input, 1, this._ctx)) {
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
                if (_la === asmParser.NAME) {
                    {
                        this.state = 26;
                        this.instruction();
                    }
                }
                this.state = 30;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === asmParser.COMMENT) {
                    {
                        this.state = 29;
                        this.match(asmParser.COMMENT);
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    instruction() {
        let _localctx = new InstructionContext(this._ctx, this.state);
        this.enterRule(_localctx, 4, asmParser.RULE_instruction);
        let _la;
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    opcode() {
        let _localctx = new OpcodeContext(this._ctx, this.state);
        this.enterRule(_localctx, 6, asmParser.RULE_opcode);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 36;
                this.match(asmParser.NAME);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    label() {
        let _localctx = new LabelContext(this._ctx, this.state);
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    argumentlist() {
        let _localctx = new ArgumentlistContext(this._ctx, this.state);
        this.enterRule(_localctx, 10, asmParser.RULE_argumentlist);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 41;
                this.argument();
                this.state = 46;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === asmParser.T__1) {
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    argument() {
        let _localctx = new ArgumentContext(this._ctx, this.state);
        this.enterRule(_localctx, 12, asmParser.RULE_argument);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 49;
                _la = this._input.LA(1);
                if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << asmParser.NAME) | (1 << asmParser.STRING) | (1 << asmParser.INT) | (1 << asmParser.FLOAT))) !== 0))) {
                    this._errHandler.recoverInline(this);
                }
                else {
                    if (this._input.LA(1) === Token_1.Token.EOF) {
                        this.matchedEOF = true;
                    }
                    this._errHandler.reportMatch(this);
                    this.consume();
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    static get _ATN() {
        if (!asmParser.__ATN) {
            asmParser.__ATN = new ATNDeserializer_1.ATNDeserializer().deserialize(Utils.toCharArray(asmParser._serializedATN));
        }
        return asmParser.__ATN;
    }
}
asmParser.T__0 = 1;
asmParser.T__1 = 2;
asmParser.NAME = 3;
asmParser.STRING = 4;
asmParser.INT = 5;
asmParser.FLOAT = 6;
asmParser.COMMENT = 7;
asmParser.EOL = 8;
asmParser.WS = 9;
asmParser.RULE_prog = 0;
asmParser.RULE_line = 1;
asmParser.RULE_instruction = 2;
asmParser.RULE_opcode = 3;
asmParser.RULE_label = 4;
asmParser.RULE_argumentlist = 5;
asmParser.RULE_argument = 6;
asmParser.ruleNames = [
    "prog", "line", "instruction", "opcode", "label", "argumentlist", "argument"
];
asmParser._LITERAL_NAMES = [
    undefined, "':'", "','"
];
asmParser._SYMBOLIC_NAMES = [
    undefined, undefined, undefined, "NAME", "STRING", "INT", "FLOAT", "COMMENT",
    "EOL", "WS"
];
asmParser.VOCABULARY = new VocabularyImpl_1.VocabularyImpl(asmParser._LITERAL_NAMES, asmParser._SYMBOLIC_NAMES, []);
asmParser._serializedATN = "\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x03\v6\x04\x02\t" +
    "\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07\t" +
    "\x07\x04\b\t\b\x03\x02\x03\x02\x03\x02\x06\x02\x14\n\x02\r\x02\x0E\x02" +
    "\x15\x03\x02\x03\x02\x03\x03\x05\x03\x1B\n\x03\x03\x03\x05\x03\x1E\n\x03" +
    "\x03\x03\x05\x03!\n\x03\x03\x04\x03\x04\x05\x04%\n\x04\x03\x05\x03\x05" +
    "\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x07\x07/\n\x07\f\x07" +
    "\x0E\x072\v\x07\x03\b\x03\b\x03\b\x02\x02\x02\t\x02\x02\x04\x02\x06\x02" +
    "\b\x02\n\x02\f\x02\x0E\x02\x02\x03\x03\x02\x05\b4\x02\x13\x03\x02\x02" +
    "\x02\x04\x1A\x03\x02\x02\x02\x06\"\x03\x02\x02\x02\b&\x03\x02\x02\x02" +
    "\n(\x03\x02\x02\x02\f+\x03\x02\x02\x02\x0E3\x03\x02\x02\x02\x10\x11\x05" +
    "\x04\x03\x02\x11\x12\x07\n\x02\x02\x12\x14\x03\x02\x02\x02\x13\x10\x03" +
    "\x02\x02\x02\x14\x15\x03\x02\x02\x02\x15\x13\x03\x02\x02\x02\x15\x16\x03" +
    "\x02\x02\x02\x16\x17\x03\x02\x02\x02\x17\x18\x07\x02\x02\x03\x18\x03\x03" +
    "\x02\x02\x02\x19\x1B\x05\n\x06\x02\x1A\x19\x03\x02\x02\x02\x1A\x1B\x03" +
    "\x02\x02\x02\x1B\x1D\x03\x02\x02\x02\x1C\x1E\x05\x06\x04\x02\x1D\x1C\x03" +
    "\x02\x02\x02\x1D\x1E\x03\x02\x02\x02\x1E \x03\x02\x02\x02\x1F!\x07\t\x02" +
    "\x02 \x1F\x03\x02\x02\x02 !\x03\x02\x02\x02!\x05\x03\x02\x02\x02\"$\x05" +
    "\b\x05\x02#%\x05\f\x07\x02$#\x03\x02\x02\x02$%\x03\x02\x02\x02%\x07\x03" +
    "\x02\x02\x02&\'\x07\x05\x02\x02\'\t\x03\x02\x02\x02()\x07\x05\x02\x02" +
    ")*\x07\x03\x02\x02*\v\x03\x02\x02\x02+0\x05\x0E\b\x02,-\x07\x04\x02\x02" +
    "-/\x05\x0E\b\x02.,\x03\x02\x02\x02/2\x03\x02\x02\x020.\x03\x02\x02\x02" +
    "01\x03\x02\x02\x021\r\x03\x02\x02\x0220\x03\x02\x02\x0234\t\x02\x02\x02" +
    "4\x0F\x03\x02\x02\x02\b\x15\x1A\x1D $0";
__decorate([
    Decorators_2.Override,
    Decorators_1.NotNull
], asmParser.prototype, "vocabulary", null);
__decorate([
    Decorators_2.Override
], asmParser.prototype, "grammarFileName", null);
__decorate([
    Decorators_2.Override
], asmParser.prototype, "ruleNames", null);
__decorate([
    Decorators_2.Override
], asmParser.prototype, "serializedATN", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], asmParser.prototype, "prog", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], asmParser.prototype, "line", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], asmParser.prototype, "instruction", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], asmParser.prototype, "opcode", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], asmParser.prototype, "label", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], asmParser.prototype, "argumentlist", null);
__decorate([
    RuleVersion_1.RuleVersion(0)
], asmParser.prototype, "argument", null);
exports.asmParser = asmParser;
class ProgContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    EOF() { return this.getToken(asmParser.EOF, 0); }
    line(i) {
        if (i === undefined) {
            return this.getRuleContexts(LineContext);
        }
        else {
            return this.getRuleContext(i, LineContext);
        }
    }
    EOL(i) {
        if (i === undefined) {
            return this.getTokens(asmParser.EOL);
        }
        else {
            return this.getToken(asmParser.EOL, i);
        }
    }
    get ruleIndex() { return asmParser.RULE_prog; }
    enterRule(listener) {
        if (listener.enterProg)
            listener.enterProg(this);
    }
    exitRule(listener) {
        if (listener.exitProg)
            listener.exitProg(this);
    }
    accept(visitor) {
        if (visitor.visitProg)
            return visitor.visitProg(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], ProgContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], ProgContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], ProgContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], ProgContext.prototype, "accept", null);
exports.ProgContext = ProgContext;
class LineContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    label() {
        return this.tryGetRuleContext(0, LabelContext);
    }
    instruction() {
        return this.tryGetRuleContext(0, InstructionContext);
    }
    COMMENT() { return this.tryGetToken(asmParser.COMMENT, 0); }
    get ruleIndex() { return asmParser.RULE_line; }
    enterRule(listener) {
        if (listener.enterLine)
            listener.enterLine(this);
    }
    exitRule(listener) {
        if (listener.exitLine)
            listener.exitLine(this);
    }
    accept(visitor) {
        if (visitor.visitLine)
            return visitor.visitLine(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], LineContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], LineContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], LineContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], LineContext.prototype, "accept", null);
exports.LineContext = LineContext;
class InstructionContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    opcode() {
        return this.getRuleContext(0, OpcodeContext);
    }
    argumentlist() {
        return this.tryGetRuleContext(0, ArgumentlistContext);
    }
    get ruleIndex() { return asmParser.RULE_instruction; }
    enterRule(listener) {
        if (listener.enterInstruction)
            listener.enterInstruction(this);
    }
    exitRule(listener) {
        if (listener.exitInstruction)
            listener.exitInstruction(this);
    }
    accept(visitor) {
        if (visitor.visitInstruction)
            return visitor.visitInstruction(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], InstructionContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], InstructionContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], InstructionContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], InstructionContext.prototype, "accept", null);
exports.InstructionContext = InstructionContext;
class OpcodeContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    NAME() { return this.getToken(asmParser.NAME, 0); }
    get ruleIndex() { return asmParser.RULE_opcode; }
    enterRule(listener) {
        if (listener.enterOpcode)
            listener.enterOpcode(this);
    }
    exitRule(listener) {
        if (listener.exitOpcode)
            listener.exitOpcode(this);
    }
    accept(visitor) {
        if (visitor.visitOpcode)
            return visitor.visitOpcode(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], OpcodeContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], OpcodeContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], OpcodeContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], OpcodeContext.prototype, "accept", null);
exports.OpcodeContext = OpcodeContext;
class LabelContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    NAME() { return this.getToken(asmParser.NAME, 0); }
    get ruleIndex() { return asmParser.RULE_label; }
    enterRule(listener) {
        if (listener.enterLabel)
            listener.enterLabel(this);
    }
    exitRule(listener) {
        if (listener.exitLabel)
            listener.exitLabel(this);
    }
    accept(visitor) {
        if (visitor.visitLabel)
            return visitor.visitLabel(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], LabelContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], LabelContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], LabelContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], LabelContext.prototype, "accept", null);
exports.LabelContext = LabelContext;
class ArgumentlistContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    argument(i) {
        if (i === undefined) {
            return this.getRuleContexts(ArgumentContext);
        }
        else {
            return this.getRuleContext(i, ArgumentContext);
        }
    }
    get ruleIndex() { return asmParser.RULE_argumentlist; }
    enterRule(listener) {
        if (listener.enterArgumentlist)
            listener.enterArgumentlist(this);
    }
    exitRule(listener) {
        if (listener.exitArgumentlist)
            listener.exitArgumentlist(this);
    }
    accept(visitor) {
        if (visitor.visitArgumentlist)
            return visitor.visitArgumentlist(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], ArgumentlistContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], ArgumentlistContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], ArgumentlistContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], ArgumentlistContext.prototype, "accept", null);
exports.ArgumentlistContext = ArgumentlistContext;
class ArgumentContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    INT() { return this.tryGetToken(asmParser.INT, 0); }
    FLOAT() { return this.tryGetToken(asmParser.FLOAT, 0); }
    NAME() { return this.tryGetToken(asmParser.NAME, 0); }
    STRING() { return this.tryGetToken(asmParser.STRING, 0); }
    get ruleIndex() { return asmParser.RULE_argument; }
    enterRule(listener) {
        if (listener.enterArgument)
            listener.enterArgument(this);
    }
    exitRule(listener) {
        if (listener.exitArgument)
            listener.exitArgument(this);
    }
    accept(visitor) {
        if (visitor.visitArgument)
            return visitor.visitArgument(this);
        else
            return visitor.visitChildren(this);
    }
}
__decorate([
    Decorators_2.Override
], ArgumentContext.prototype, "ruleIndex", null);
__decorate([
    Decorators_2.Override
], ArgumentContext.prototype, "enterRule", null);
__decorate([
    Decorators_2.Override
], ArgumentContext.prototype, "exitRule", null);
__decorate([
    Decorators_2.Override
], ArgumentContext.prototype, "accept", null);
exports.ArgumentContext = ArgumentContext;
//# sourceMappingURL=asmParser.js.map