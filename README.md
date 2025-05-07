# Ultra-simple language compiler
- define grammar for ABC language
- compile (actually transpile) the language to Python, Javascript, Lisp, to an Intermediate Representation, then, again to Python
- transpilation happens in several stages
  1. parse
  2. rewrite
  3. [run the resulting transpiled code using the host language (Python, Javascript, Lisp ; skip this step in this simple example)]

# Usage
`$ ./make.bash`

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

## What does that ouptut mean?
The source file is `test.abc`. 3 lines of code, to keep things simple.
`Identity` - input source file, output the same unaltered except for removal of some spaces
`Javascript` - the same 3 lines written out in Javascript format
`Lisp` - the same 3 lines written out in Lisp format
`Python` - the same 3 lines written out in Python format
`IR (Intermediate Representation)` - the same 3 lines written out in Internal Representation format (th I.R. looks like Lisp)
	- this becomes the "new" source file for the transpilations below
	- the new source is written to `test.abcir` (feel free to look at that file)
`Javascript from IR (test.abcir)` - `test.abcir` written out in Python format
`Python from IR (test.abcir)` - `test.abcir` written out in Python format

The output lines of code do nothing useful. Just look at them to see if they look right.

See project `abc2py` for something simple that actually runs.
