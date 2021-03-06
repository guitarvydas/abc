var symbolTable = require ('./symbolTable.js');

exports.interpret = {

    TopLevel: function (assignments) {
	var dontcare = assignments.interpret ();
	return symbolTable.symbolTable;
    },
    
    Assignment_simple: function (v, keq, n) {
	var name = v.interpret ();
	var value = n.interpret ();
	symbolTable.symbolTable[name] = value;
    },

    Assignment_complex: function (v, keq, expr) {
	let value = expr.interpret ();
	symbolTable.symbolTable[v.interpret ()] = value;
    },

    Expression: function (v1, kplus, v2) {
	let name1 = v1.interpret ();
	let name2 = v2.interpret ();
	let value1 = symbolTable.symbolTable [name1];
	let value2 = symbolTable.symbolTable [name2];
	return value1 + value2;
    },

    Variable: function (c) {
	return this.sourceString;
    },

    number: function (ds) {
	return parseInt (this.sourceString);
    }    
};

exports.transpile = {

    TopLevel: function (assignments) {
	var finalString = assignments.transpile ().join ('\n');
	return finalString;
    },
    
    Assignment_simple: function (v, keq, n) {
	var name = v.transpile ();
	var value = n.transpile ();
	return `var ${name} = ${value};`; 
    },

    Assignment_complex: function (v, keq, expr) {
	var name = v.transpile ();
	var value = expr.transpile ();
	return `var ${name} = ${value};`; 
    },

    Expression: function (v1, kplus, v2) {
	let name1 = v1.transpile ();
	let name2 = v2.transpile ();
	return `${name1} + ${name2}`;
    },

    Variable: function (c) {
	return this.sourceString;
    },

    number: function (ds) {
	return this.sourceString;
    }    
};
