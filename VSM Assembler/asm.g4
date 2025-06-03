grammar asm;

prog: (line EOL)+ EOF;

line: label? instruction? COMMENT?;

instruction: opcode argumentlist?;

opcode:
	NAME;

label: NAME ':';

argumentlist: argument (',' argument)*;

argument: (INT | FLOAT | NAME | STRING);

NAME: [a-zA-Z] [a-zA-Z0-9."]*;

STRING: '"' ( ~('\\' | '"'))* '"';

INT: ('-')? Digit+;

FLOAT: ('-')? Digit+ '.' Digit* | '.' Digit+;

fragment Digit: [0-9];

COMMENT: ';' ~ [\r\n]* -> skip;

EOL: [\r?\n]+;

WS: [ \t] -> skip;

