'use strict'

var ohm = require('ohm-js');
var fs = require('fs');

var semanticsCode = require('./abcSemanticsRoughIn.js');
var transpiler = ('./transpiler.js');
var source = fs.readFileSync ('test.abc', 'utf-8');

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
	cstSemantics.addOperation ('roughIn', semanticsCode.roughInSemantics);
    } else {
	console.log (parser.trace (source).toString ());
	throw ("grammar error :");
    }
}

main ();
