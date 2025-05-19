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
