t2t = ./t2t.bash


all : abcidentity abcjs abccl abcpy test.abcmeta abcmetajs abcmetapy

abcjs : abc.ohm abcjs.rwr test.abc
	@echo 'Javascript'
	@${t2t} abc.ohm abcjs.rwr empty.js <test.abc
	@echo

abccl : abc.ohm abccl.rwr test.abc
	@echo 'Lisp'
	@${t2t} abc.ohm abccl.rwr empty.js <test.abc
	@echo

abcpy : abc.ohm abcpy.rwr test.abc
	@echo 'Python'
	@${t2t} abc.ohm abcpy.rwr empty.js <test.abc
	@echo

abcidentity : abc.ohm abcidentity.rwr test.abc
	@echo 'Identity'
	@${t2t} abc.ohm abcidentity.rwr empty.js <test.abc
	@echo

abcmetajs : abcmeta.ohm abcmetajs.rwr test.abcmeta
	@echo 'Javascript from Meta (test.abcmeta)'
	@${t2t} abcmeta.ohm abcmetajs.rwr empty.js <test.abcmeta
	@echo

abcmetapy : abcmeta.ohm abcmetapy.rwr test.abcmeta
	@echo 'Python from Meta (test.abcmeta)'
	@${t2t} abcmeta.ohm abcmetapy.rwr empty.js <test.abcmeta
	@echo

test.abcmeta : abccl
	@echo 'Meta'
	@${t2t} abc.ohm abccl.rwr empty.js <test.abc >test.abcmeta
	@cat test.abcmeta
	@echo

install-js-requires:
	npm install yargs prompt-sync ohm-js
