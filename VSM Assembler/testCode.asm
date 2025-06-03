MAIN: CONSTIN0
	CONSTI 1
	CALL GETTENP, 3, 3, 3	;get user number
	CONSTF 1024.16
	ADDI		;and shift into the upper 4 bits.
	CALL FUNC1, 0, 0, 0
	HALT

FUNC1: ADDI
	CONSTI 2048	
	ADDI
	JMP TEST
	JMP END
	STRLIT "This is a string"
	CONSTI 1024
	CONSTF 1234.64
	LOAD 2
	STORE 1
	IINC 2, 1 ;Increment variable by value
	END: RET

FUNC2: CONSTIN0
	STORE 0
	IINC 2,1
	LOAD 0
	CALL FUNC3, 0, 0, 0	
	RET

FUNC3: CONSTF 32.0
CONSTF 16.0
ADDF
GSTORE 0
RET
