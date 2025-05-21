wdir=.
t2t = ./pbp/t2t.bash ${wdir} ${wdir}/pbp


all : abcidentity abcjs abccl abcpy test.abcir abcirjs abcirpy

abcjs : abc.ohm abcjs.rwr test.abc
	@echo 'Javascript'
	@${t2t}  abc.ohm abcjs.rwr empty.js test.abc
	@echo

abccl : abc.ohm abccl.rwr test.abc
	@echo 'Lisp'
	@${t2t}  abc.ohm abccl.rwr empty.js test.abc
	@echo

abcpy : abc.ohm abcpy.rwr test.abc
	@echo 'Python'
	@${t2t}  abc.ohm abcpy.rwr empty.js test.abc
	@echo

abcidentity : abc.ohm abcidentity.rwr test.abc
	@echo 'Identity'
	@${t2t}  abc.ohm abcidentity.rwr empty.js test.abc
	@echo

abcirjs : abcir.ohm abcirjs.rwr test.abcir
	@echo 'Javascript from IR (test.abcir)'
	@${t2t}  abcir.ohm abcirjs.rwr empty.js test.abcir
	@echo

abcirpy : abcir.ohm abcirpy.rwr test.abcir
	@echo 'Python from IR (test.abcir)'
	@${t2t}  abcir.ohm abcirpy.rwr empty.js test.abcir
	@echo

test.abcir : abccl
	@echo 'IR (Intermediate Representation)'
	@${t2t}  abc.ohm abccl.rwr empty.js test.abc >test.abcir
	@cat test.abcir
	@echo

install:
	npm install yargs prompt-sync ohm-js
