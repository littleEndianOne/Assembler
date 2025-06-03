"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ATNDeserializer_1 = require("antlr4ts/atn/ATNDeserializer");
const Lexer_1 = require("antlr4ts/Lexer");
const LexerATNSimulator_1 = require("antlr4ts/atn/LexerATNSimulator");
const Decorators_1 = require("antlr4ts/Decorators");
const Decorators_2 = require("antlr4ts/Decorators");
const VocabularyImpl_1 = require("antlr4ts/VocabularyImpl");
const Utils = require("antlr4ts/misc/Utils");
class asmLexer extends Lexer_1.Lexer {
    constructor(input) {
        super(input);
        this._interp = new LexerATNSimulator_1.LexerATNSimulator(asmLexer._ATN, this);
    }
    get vocabulary() {
        return asmLexer.VOCABULARY;
    }
    get grammarFileName() { return "asm.g4"; }
    get ruleNames() { return asmLexer.ruleNames; }
    get serializedATN() { return asmLexer._serializedATN; }
    get modeNames() { return asmLexer.modeNames; }
    static get _ATN() {
        if (!asmLexer.__ATN) {
            asmLexer.__ATN = new ATNDeserializer_1.ATNDeserializer().deserialize(Utils.toCharArray(asmLexer._serializedATN));
        }
        return asmLexer.__ATN;
    }
}
asmLexer.T__0 = 1;
asmLexer.T__1 = 2;
asmLexer.NAME = 3;
asmLexer.STRING = 4;
asmLexer.INT = 5;
asmLexer.FLOAT = 6;
asmLexer.COMMENT = 7;
asmLexer.EOL = 8;
asmLexer.WS = 9;
asmLexer.modeNames = [
    "DEFAULT_MODE"
];
asmLexer.ruleNames = [
    "T__0", "T__1", "NAME", "STRING", "INT", "FLOAT", "Digit", "COMMENT",
    "EOL", "WS"
];
asmLexer._LITERAL_NAMES = [
    undefined, "':'", "','"
];
asmLexer._SYMBOLIC_NAMES = [
    undefined, undefined, undefined, "NAME", "STRING", "INT", "FLOAT", "COMMENT",
    "EOL", "WS"
];
asmLexer.VOCABULARY = new VocabularyImpl_1.VocabularyImpl(asmLexer._LITERAL_NAMES, asmLexer._SYMBOLIC_NAMES, []);
asmLexer._serializedATN = "\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x02\v^\b\x01\x04" +
    "\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
    "\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x03\x02\x03\x02\x03" +
    "\x03\x03\x03\x03\x04\x03\x04\x07\x04\x1E\n\x04\f\x04\x0E\x04!\v\x04\x03" +
    "\x05\x03\x05\x07\x05%\n\x05\f\x05\x0E\x05(\v\x05\x03\x05\x03\x05\x03\x06" +
    "\x05\x06-\n\x06\x03\x06\x06\x060\n\x06\r\x06\x0E\x061\x03\x07\x05\x07" +
    "5\n\x07\x03\x07\x06\x078\n\x07\r\x07\x0E\x079\x03\x07\x03\x07\x07\x07" +
    ">\n\x07\f\x07\x0E\x07A\v\x07\x03\x07\x03\x07\x06\x07E\n\x07\r\x07\x0E" +
    "\x07F\x05\x07I\n\x07\x03\b\x03\b\x03\t\x03\t\x07\tO\n\t\f\t\x0E\tR\v\t" +
    "\x03\t\x03\t\x03\n\x06\nW\n\n\r\n\x0E\nX\x03\v\x03\v\x03\v\x03\v\x02\x02" +
    "\x02\f\x03\x02\x03\x05\x02\x04\x07\x02\x05\t\x02\x06\v\x02\x07\r\x02\b" +
    "\x0F\x02\x02\x11\x02\t\x13\x02\n\x15\x02\v\x03\x02\t\x04\x02C\\c|\x07" +
    "\x02$$002;C\\c|\x04\x02$$^^\x03\x022;\x04\x02\f\f\x0F\x0F\x05\x02\f\f" +
    "\x0F\x0FAA\x04\x02\v\v\"\"g\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02" +
    "\x02\x02\x07\x03\x02\x02\x02\x02\t\x03\x02\x02\x02\x02\v\x03\x02\x02\x02" +
    "\x02\r\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02\x13\x03\x02\x02\x02" +
    "\x02\x15\x03\x02\x02\x02\x03\x17\x03\x02\x02\x02\x05\x19\x03\x02\x02\x02" +
    "\x07\x1B\x03\x02\x02\x02\t\"\x03\x02\x02\x02\v,\x03\x02\x02\x02\rH\x03" +
    "\x02\x02\x02\x0FJ\x03\x02\x02\x02\x11L\x03\x02\x02\x02\x13V\x03\x02\x02" +
    "\x02\x15Z\x03\x02\x02\x02\x17\x18\x07<\x02\x02\x18\x04\x03\x02\x02\x02" +
    "\x19\x1A\x07.\x02\x02\x1A\x06\x03\x02\x02\x02\x1B\x1F\t\x02\x02\x02\x1C" +
    "\x1E\t\x03\x02\x02\x1D\x1C\x03\x02\x02\x02\x1E!\x03\x02\x02\x02\x1F\x1D" +
    "\x03\x02\x02\x02\x1F \x03\x02\x02\x02 \b\x03\x02\x02\x02!\x1F\x03\x02" +
    "\x02\x02\"&\x07$\x02\x02#%\n\x04\x02\x02$#\x03\x02\x02\x02%(\x03\x02\x02" +
    "\x02&$\x03\x02\x02\x02&\'\x03\x02\x02\x02\')\x03\x02\x02\x02(&\x03\x02" +
    "\x02\x02)*\x07$\x02\x02*\n\x03\x02\x02\x02+-\x07/\x02\x02,+\x03\x02\x02" +
    "\x02,-\x03\x02\x02\x02-/\x03\x02\x02\x02.0\x05\x0F\b\x02/.\x03\x02\x02" +
    "\x0201\x03\x02\x02\x021/\x03\x02\x02\x0212\x03\x02\x02\x022\f\x03\x02" +
    "\x02\x0235\x07/\x02\x0243\x03\x02\x02\x0245\x03\x02\x02\x0257\x03\x02" +
    "\x02\x0268\x05\x0F\b\x0276\x03\x02\x02\x0289\x03\x02\x02\x0297\x03\x02" +
    "\x02\x029:\x03\x02\x02\x02:;\x03\x02\x02\x02;?\x070\x02\x02<>\x05\x0F" +
    "\b\x02=<\x03\x02\x02\x02>A\x03\x02\x02\x02?=\x03\x02\x02\x02?@\x03\x02" +
    "\x02\x02@I\x03\x02\x02\x02A?\x03\x02\x02\x02BD\x070\x02\x02CE\x05\x0F" +
    "\b\x02DC\x03\x02\x02\x02EF\x03\x02\x02\x02FD\x03\x02\x02\x02FG\x03\x02" +
    "\x02\x02GI\x03\x02\x02\x02H4\x03\x02\x02\x02HB\x03\x02\x02\x02I\x0E\x03" +
    "\x02\x02\x02JK\t\x05\x02\x02K\x10\x03\x02\x02\x02LP\x07=\x02\x02MO\n\x06" +
    "\x02\x02NM\x03\x02\x02\x02OR\x03\x02\x02\x02PN\x03\x02\x02\x02PQ\x03\x02" +
    "\x02\x02QS\x03\x02\x02\x02RP\x03\x02\x02\x02ST\b\t\x02\x02T\x12\x03\x02" +
    "\x02\x02UW\t\x07\x02\x02VU\x03\x02\x02\x02WX\x03\x02\x02\x02XV\x03\x02" +
    "\x02\x02XY\x03\x02\x02\x02Y\x14\x03\x02\x02\x02Z[\t\b\x02\x02[\\\x03\x02" +
    "\x02\x02\\]\b\v\x02\x02]\x16\x03\x02\x02\x02\x0E\x02\x1F&,149?FHPX\x03" +
    "\b\x02\x02";
__decorate([
    Decorators_2.Override,
    Decorators_1.NotNull
], asmLexer.prototype, "vocabulary", null);
__decorate([
    Decorators_2.Override
], asmLexer.prototype, "grammarFileName", null);
__decorate([
    Decorators_2.Override
], asmLexer.prototype, "ruleNames", null);
__decorate([
    Decorators_2.Override
], asmLexer.prototype, "serializedATN", null);
__decorate([
    Decorators_2.Override
], asmLexer.prototype, "modeNames", null);
exports.asmLexer = asmLexer;
//# sourceMappingURL=asmLexer.js.map