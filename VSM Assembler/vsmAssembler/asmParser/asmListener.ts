// Generated from c:\Users\david\OneDrive\Projects\uDev System\Software\Source Code\Compiler Dev\VSM Assembler\asm.g4 by ANTLR 4.6-SNAPSHOT


import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';

import { ProgContext } from './asmParser';
import { LineContext } from './asmParser';
import { InstructionContext } from './asmParser';
import { OpcodeContext } from './asmParser';
import { LabelContext } from './asmParser';
import { ArgumentlistContext } from './asmParser';
import { ArgumentContext } from './asmParser';


/**
 * This interface defines a complete listener for a parse tree produced by
 * `asmParser`.
 */
export interface asmListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `asmParser.prog`.
	 * @param ctx the parse tree
	 */
	enterProg?: (ctx: ProgContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.prog`.
	 * @param ctx the parse tree
	 */
	exitProg?: (ctx: ProgContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.line`.
	 * @param ctx the parse tree
	 */
	enterLine?: (ctx: LineContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.line`.
	 * @param ctx the parse tree
	 */
	exitLine?: (ctx: LineContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.instruction`.
	 * @param ctx the parse tree
	 */
	enterInstruction?: (ctx: InstructionContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.instruction`.
	 * @param ctx the parse tree
	 */
	exitInstruction?: (ctx: InstructionContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.opcode`.
	 * @param ctx the parse tree
	 */
	enterOpcode?: (ctx: OpcodeContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.opcode`.
	 * @param ctx the parse tree
	 */
	exitOpcode?: (ctx: OpcodeContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.label`.
	 * @param ctx the parse tree
	 */
	enterLabel?: (ctx: LabelContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.label`.
	 * @param ctx the parse tree
	 */
	exitLabel?: (ctx: LabelContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.argumentlist`.
	 * @param ctx the parse tree
	 */
	enterArgumentlist?: (ctx: ArgumentlistContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.argumentlist`.
	 * @param ctx the parse tree
	 */
	exitArgumentlist?: (ctx: ArgumentlistContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.argument`.
	 * @param ctx the parse tree
	 */
	enterArgument?: (ctx: ArgumentContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.argument`.
	 * @param ctx the parse tree
	 */
	exitArgument?: (ctx: ArgumentContext) => void;
}

