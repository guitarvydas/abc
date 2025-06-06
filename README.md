# Ultra-simple language compiler
- define grammar for ABC language
- generate (actually "transpile", to be accurate) the test example source code to Python, to Javascript, to Lisp, to an Intermediate Representation, then, again to Python and to Javascript
- transpilation happens in several stages
  1. parse
  2. rewrite
  3. [run the resulting transpiled code using the host language (Python, Javascript, Lisp ; skip this step in this simple example - see abc2py for an example of running code)]

This code generator uses `pbp/t2t.bash` raw in _text_ form without using diagrams. (See the See Also section below).

# Usage
## install
`$ make install`
## run
`$ make`

## Output
The output should be:
```
Identity

b<-2
c<-3
a<-b+c 

Javascript

let b = 2; 
let c = 3; 
let a = b + c ; 

Lisp

(let ((b 2)) 
(let ((c 3)) 
(let ((a (+ b c) )) )))

Python

b = 2
c = 3
a = b + c 

IR (Intermediate Representation)

(let ((b 2)) 
(let ((c 3)) 
(let ((a (+ b c) )) )))

Javascript from IR (test.abcir)

let b = 2;
let c = 3;
let a = b + c;

Python from IR (test.abcir)

b = 2
c = 3
a = b + c
```

## What does that output mean?
The source file is `test.abc`. This example code is just 3 lines of code, to keep things simple.
`Identity` - input source file, output the same unaltered except for removal of some spaces ; an easy workflow is to build the grammar using [Ohm editor](https://ohmjs.org/editor/), save the grammar out to a `.ohm` file, create a dummy identity `.rwr` file and test that the combination of `.ohm` and `.rwr` works. After that, hack on the `.rwr` file to make it generate the desired result.
`Javascript` - `test.abc` written out in Javascript format
`Lisp` - `test.abc` written out in Lisp format
`Python` - `test.abc` written out in Python format
`IR (Intermediate Representation)` - `test.abc` written out in Internal Representation format (the I.R. looks like Lisp)
	- this becomes the "new" source file for the transpilations below
	- the new source is written to `test.abcir` (feel free to look at that file)
`Javascript from IR (test.abcir)` - `test.abcir` written out in Python format (again, but using the IR this time)
`Python from IR (test.abcir)` - `test.abcir` written out in Python format (again, but using the IR this time)

The output lines of code do nothing useful. The best you can do is to look at them to see if they look right.

# Files

A set of source files need to be supplied by the programmer.

This example shows two ways of generating code
	1. straight from the grammar
	2. generating an IR (Intermediate Representation) from the grammar, then generating code from the IR

Strictly speaking, you only need to use one way of generating code. I show two ways, to give you more choice.

I often generate code straight from the grammar,,, but, I like to find simple ways to generate code and all of my examples tend to be small. IF I were building something quite large, I would choose to use an IR with a more regular, normalized, machine-readable syntax. I favour a Lisp-y IR syntax, because it is easy to parse, it is normalized (there are only 2 kinds of things, functions and basic atoms, all code is in prefix form (no pesky infix to parse)) and because there are several choices of already-existing code indenters that can help during low-level debugging and bootstrapping (I use emacs, YMMV).

I tend to think that using a Lisp-y IR achieves many of the goals of "projectional editing", but, I haven't experimented much in that direction.

## Manually written, supplied by programmer
- `test.abc` - simple test program written in ABC (3 lines of code)
- `abc.ohm` - grammar for the example ABC language
- `abccl.rwr` - rewrite rules from ABC to Common Lisp
- `abcidentity.rwr` - rewrite rules from ABC to Common Lisp
- `abcjs.rwr` - rewrite rules from ABC to Javascript
- `abcpy.rwr` - rewrite rules from ABC to Python
- `empty.js` - placeholder for extra support code (no code necessary for this example, hence, empty)
- `abcir.ohm` - grammar for the Itermediate Representation language
- `abcirjs.rwr` - rewrite rules from Intermediate Representation to Javascript
- `abcirpy.rwr` - rewrite rules from Intermedidate Representation to Python

## Scaffolding for this example
- `Makefile` - makefile for this example
- `README.md` - this documentation file

## Tools
- `pbp/das/` - ignored (Diagrams as Syntax tool)
- `pbp/kernel/decodeoutput.mjs` - splits final JSON output into separate files for Javascript, Python, Lisp
- `pbp/kernel/kernel0d.py` - used by `t2t`tool
- `pbp/kernel/repl.py`- used by `kernel0d.py`
- `pbp/main.py` - ignored (template for main.py in DaS projects)
- `pbp/README.md` - readme for tools directory
- `pbp/refresh.bash*` - ignored (tool development helper)
- `pbp/t2t/lib/args.part.js` - utility functions for `t2t`, included in generated code
- `pbp/t2t/lib/front.part.js` - code snippet included in generated code
- `pbp/t2t/lib/middle.part.js` - code snippet included in generated code
- `pbp/t2t/lib/rwr.mjs` - RWR tool - rewriter DSL, used by `t2t.bash`
- `pbp/t2t/lib/tail.part.js` - code snippet included in generated code
- `pbp/t2t.bash*` - text to text code generator ("transpiler" tool)
- `pbp/tas/` - ignored (Text as Syntax tool)
- `pbp/tas.bash*` - ignored

## Generated Files
- `temp.rewrite.mjs` - generated Javascript program derived from `.rwr` files above, part of `t2t` toolchain
- `temp.nanodsl.mjs` - generated Javascript program that implements `t2t` code generator ("transpiler")
- `test.abcir` - generated IR (Intermediate Representation) version of `test.abc`, used for compiling `test.abc` with to Javascript via `abcirjs.rwr` and to Python via `abcirpy.rwr`.


# See Also
See project [abc2py](https://github.com/guitarvydas/abc) for something simple that actually runs.

See project [arith](https://github.com/guitarvydas/arith) for a diagrammatic version of a compiler which allows a programmer to build code generators using LEGO®-like black boxes. 

[aside: PBP drawware can be used to build other kinds of things, beyond just code generators, but these examples `abc`, `abc2py`, `arith` show only one use of PBP - that of building code generators].

