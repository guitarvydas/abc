'use strict'

var ohm = require('ohm-js');
var fs = require('fs');

var semanticsCode = require('./abcSemantics.js');
var transpiler = ('./transpiler.js');
var source = fs.readFileSync ('test.abc', 'utf-8');
var symbolTable = require ('./symbolTable.js');

var grammar = `
ABCgrok {
TopLevel = Assignment+

  Assignment =   Variable "=" Expression -- complex
               | Variable "=" number -- simple
  Expression = Variable "+" Variable

    Variable = "a" .. "z"
    number = digit+
}
`;

function main () {
    let parser = ohm.grammar (grammar);
    let cst = parser.match (source);
    if (cst.succeeded ()) {
	let cstSemantics = parser.createSemantics ();
	cstSemantics.addOperation ('interpret', semanticsCode.interpret);
	var interpretedResult = cstSemantics (cst).interpret ();
	cstSemantics.addOperation ('transpile', semanticsCode.transpile);
	var transpiledResult = cstSemantics (cst).transpile ();
	return {
	    interpreted: interpretedResult,
	    transpiled:  transpiledResult
	};
    } else {
	console.log (parser.trace (source).toString ());
	throw ("grammar error");
    }
}

var result = main ();
console.log (result.interpreted);
console.log (result.transpiled);
