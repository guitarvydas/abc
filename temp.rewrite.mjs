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

TopLevel : function (exprs,) {
enter_rule ("TopLevel");
    set_return (`${exprs.rwr ()}`);
return exit_rule ("TopLevel");
},
Statement_assignment : function (v,_eq,e,rec,) {
enter_rule ("Statement_assignment");
    set_return (`\n${v.rwr ()}${_eq.rwr ()}${e.rwr ()}${rec.rwr ().join ('')}`);
return exit_rule ("Statement_assignment");
},
Statement_expr : function (e,rec,) {
enter_rule ("Statement_expr");
    set_return (`${e.rwr ()}${rec.rwr ().join ('')}`);
return exit_rule ("Statement_expr");
},
Expression_plus : function (left,_plus,right,) {
enter_rule ("Expression_plus");
    set_return (`${left.rwr ()}${_plus.rwr ()}${right.rwr ()}`);
return exit_rule ("Expression_plus");
},
Expression_atom : function (a,) {
enter_rule ("Expression_atom");
    set_return (`${a.rwr ()}`);
return exit_rule ("Expression_atom");
},
atom : function (a,) {
enter_rule ("atom");
    set_return (`${a.rwr ()}`);
return exit_rule ("atom");
},
variable : function (c,) {
enter_rule ("variable");
    set_return (`${c.rwr ()}`);
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
