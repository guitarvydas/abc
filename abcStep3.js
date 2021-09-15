'user strict'

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
	cstSemantics (cst).interpret ();
	console.log (`a = ${symbolTable.symbolTable["a"]}`);
	console.log (`b = ${symbolTable.symbolTable["b"]}`);
	console.log (`c = ${symbolTable.symbolTable["c"]}`);
    } else {
	console.log (parser.trace (source).toString ());
	throw ("grammar error");
    }
}

main ();

