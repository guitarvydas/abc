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

TopLevel : function (e,) {
enter_rule ("TopLevel");
    set_return (`${e.rwr ()}`);
return exit_rule ("TopLevel");
},
Expression_let : function (L,) {
enter_rule ("Expression_let");
    set_return (`${L.rwr ()}`);
return exit_rule ("Expression_let");
},
Expression_let : function (p,) {
enter_rule ("Expression_let");
    set_return (`${p.rwr ()}`);
return exit_rule ("Expression_let");
},
Expression_let : function (a,) {
enter_rule ("Expression_let");
    set_return (`${a.rwr ()}`);
return exit_rule ("Expression_let");
},
LetExpression : function (lp1,_let,lp2,binding,rp2,e,rb1,) {
enter_rule ("LetExpression");
    set_return (`${binding.rwr ()}${e.rwr ().join ('')}`);
return exit_rule ("LetExpression");
},
Binding : function (lp,v,e,rp,) {
enter_rule ("Binding");
    set_return (`\n${v.rwr ()} = ${e.rwr ()}`);
return exit_rule ("Binding");
},
PlusExpression : function (lp,_plus,e1,e2,rp,) {
enter_rule ("PlusExpression");
    set_return (`${e1.rwr ()} ${_plus.rwr ()} ${e2.rwr ()}`);
return exit_rule ("PlusExpression");
},
atom : function (x,) {
enter_rule ("atom");
    set_return (`${x.rwr ()}`);
return exit_rule ("atom");
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
