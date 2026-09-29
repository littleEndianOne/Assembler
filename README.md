# Assembler

This repository contains the TypeScript assembler for the
[virtual-machine](https://github.com/littleEndianOne/virtual-machine) project.
It parses the virtual machine's assembly language and writes compatible
machine code into a caller-provided `Uint8Array`. The
[VM-CLI](https://github.com/littleEndianOne/VM-CLI) project is the command-line
interface for executing that machine code with the C virtual machine.

## Project contents

| Path | Purpose |
| --- | --- |
| [`VSM Assembler/`](VSM%20Assembler/) | The assembler implementation, ANTLR grammar, generated parser, instruction definitions, sample program, and tests. |
| [`VSM Assembler/asm.g4`](VSM%20Assembler/asm.g4) | Assembly-language grammar. It supports labels, instructions, numeric and string arguments, and `;` comments. |
| [`VSM Assembler/testCode.asm`](VSM%20Assembler/testCode.asm) | Example assembly source. |
| [`Utility/`](Utility/) | Shared error-reporting and numeric-limit utilities used by the assembler. |

The assembler recognizes the instruction set defined in
[`instructionMapping.ts`](VSM%20Assembler/vsmAssembler/instructionMapping.ts),
including arithmetic, control-flow, stack, local/global storage, array, and
`HALT` instructions. Labels can be used as forward or backward jump and call
targets.

## Requirements

- Node.js and npm

## Build

Install and compile the utility project first, then build the assembler:

```sh
cd Utility
npm ci
npx tsc

cd "../VSM Assembler"
npm ci
npx tsc
```

Compilation writes CommonJS JavaScript files next to their TypeScript sources.

## Run the assembler

The assembler is a library, not a standalone command-line executable. From
`VSM Assembler`, create an output buffer large enough for the generated machine
code, pass it with the assembly source and an error array to `Assembler`, then
use the populated buffer with the virtual machine or VM-CLI:

```sh
node <<'NODE'
const { Assembler } = require("./vsmAssembler/assembler");

const source = `
MAIN: CONSTI 1
HALT
`;
const machineCode = new Uint8Array(64);
const errors = [];

new Assembler(source, machineCode, errors);

if (errors.length > 0) {
  console.error(errors.map((error) => error.toString()).join("\n"));
  process.exitCode = 1;
} else {
  console.log(machineCode);
}
NODE
```

Assembly instructions are line-oriented. Labels use `NAME:`, instruction
arguments are comma-separated, and comments begin with `;`. See
[`testCode.asm`](VSM%20Assembler/testCode.asm) for a larger example.

## Test

After installing the assembler dependencies, run its compiled test suite:

```sh
cd "VSM Assembler"
npx mocha tests/*Tests.js
```
