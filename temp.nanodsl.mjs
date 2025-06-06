'use strict'

import * as ohm from 'ohm-js';

let verbose = false;

function top (stack) { let v = stack.pop (); stack.push (v); return v; }

function set_top (stack, v) { stack.pop (); stack.push (v); return v; }

let return_value_stack = [];
let rule_name_stack = [];
let depth_prefix = ' ';

function enter_rule (name) {
    if (verbose) {
	console.error (depth_prefix, ["enter", name]);
	depth_prefix += ' ';
    }
    return_value_stack.push ("");
    rule_name_stack.push (name);
}

function set_return (v) {
    set_top (return_value_stack, v);
}

function exit_rule (name) {
    if (verbose) {
	depth_prefix = depth_prefix.substr (1);
	console.error (depth_prefix, ["exit", name]);
    }
    rule_name_stack.pop ();
    return return_value_stack.pop ()
}

const grammar = String.raw`
abcir {
TopLevel = Statement+

Statement =
  | Expression Statement? -- expr

Expression =
  | "(" "let" "(" "(" variable Expression ")" ")" Expression? ")" -- let
  | "(" "+" Expression Expression ")" -- plus
  | variable -- vatom
  | number -- natom

variable = "a" .. "z"
number = dig+
dig = "0" .. "9"
}`;

let args = {};
function resetArgs () {
    args = {};
}
function memoArg (name, accessorString) {
    args [name] = accessorString;
};
function fetchArg (name) {
    return args [name];
}

// empty
let parameters = {};
function pushParameter (name, v) {
    if (!parameters [name]) {
        parameters [name] = [];
    }
    parameters [name].push (v);
}
function popParameter (name) {
    parameters [name].pop ();
}
function getParameter (name) {
    return parameters [name];
}


let _rewrite = {

TopLevel : function (s,) {
enter_rule ("TopLevel");
    set_return (`${s.rwr ()}`);
return exit_rule ("TopLevel");
},
Statement_expr : function (e,rec,) {
enter_rule ("Statement_expr");
    set_return (`${e.rwr ()}${rec.rwr ().join ('')}`);
return exit_rule ("Statement_expr");
},
Expression_let : function (lp1,_let,lp2,lp3,v,e1,rp3,rp2,e,rp1,) {
enter_rule ("Expression_let");
    set_return (`\n${v.rwr ()} = ${e1.rwr ()}${e.rwr ().join ('')}`);
return exit_rule ("Expression_let");
},
Expression_plus : function (lp,_plus,e1,e2,rp,) {
enter_rule ("Expression_plus");
    set_return (`${e1.rwr ()} ${_plus.rwr ()} ${e2.rwr ()}`);
return exit_rule ("Expression_plus");
},
Expression_vatom : function (v,) {
enter_rule ("Expression_vatom");
    set_return (`${v.rwr ()}`);
return exit_rule ("Expression_vatom");
},
Expression_natom : function (n,) {
enter_rule ("Expression_natom");
    set_return (`${n.rwr ()}`);
return exit_rule ("Expression_natom");
},
variable : function (id,) {
enter_rule ("variable");
    set_return (`${id.rwr ()}`);
return exit_rule ("variable");
},
number : function (digits,) {
enter_rule ("number");
    set_return (`${digits.rwr ().join ('')}`);
return exit_rule ("number");
},
dig : function (c,) {
enter_rule ("dig");
    set_return (`${c.rwr ()}`);
return exit_rule ("dig");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
}
import * as fs from 'fs';

function grammarname (s) {
    let n = s.search (/{/);
    return s.substr (0, n).replaceAll (/\n/g,'').trim ();
}

try {
    const argv = process.argv.slice(2);
    let srcFilename = argv[0];
    if ('-' == srcFilename) { srcFilename = 0 }
    let src = fs.readFileSync(srcFilename, 'utf-8');
    try {
	let parser = ohm.grammar (grammar);
	let cst = parser.match (src);
	if (cst.failed ()) {
	    //throw Error (`${cst.message}\ngrammar=${grammarname (grammar)}\nsrc=\n${src}`);
	    throw Error (cst.message);
	}
	let sem = parser.createSemantics ();
	sem.addOperation ('rwr', _rewrite);
	console.log (sem (cst).rwr ());
	process.exit (0);
    } catch (e) {
	//console.error (`${e}\nargv=${argv}\ngrammar=${grammarname (grammar)}\src=\n${src}`);
	console.error (`${e}\n\ngrammar = "${grammarname (grammar)}"`);
	process.exit (1);
    }
} catch (e) {
    console.error (`${e}\n\ngrammar = "${grammarname (grammar)}`);
    process.exit (1);
}

