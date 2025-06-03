// Generated from c:\Users\david\OneDrive\Projects\uDev System\Software\Source Code\Compiler Dev\VSM Assembler\asm.g4 by ANTLR 4.6-SNAPSHOT


import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';

import { ProgContext } from './asmParser';
import { LineContext } from './asmParser';
import { InstructionContext } from './asmParser';
import { OpcodeContext } from './asmParser';
import { LabelContext } from './asmParser';
import { ArgumentlistContext } from './asmParser';
import { ArgumentContext } from './asmParser';


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `asmParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface asmVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `asmParser.prog`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProg?: (ctx: ProgContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.line`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLine?: (ctx: LineContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.instruction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstruction?: (ctx: InstructionContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.opcode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpcode?: (ctx: OpcodeContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.label`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLabel?: (ctx: LabelContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.argumentlist`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArgumentlist?: (ctx: ArgumentlistContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.argument`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArgument?: (ctx: ArgumentContext) => Result;
}

