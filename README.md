# Ultra-simple language compiler
- define grammar for ABC language
- compile (actually transpile) the language to Python, Javascript, Lisp, to an Intermediate Representation, then, again to Python
- run the results
- the IR looks like Lisp (so, for this simple example, I just re-use the Lisp version)
- transpilation happens in several stages
  1. parse
  2. rewrite
  3. run the resulting transpiled code using the host language (Python, Javascript, Lisp in this example)


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

Meta

(let ((b 2)) 
(let ((c 3)) 
(let ((a (+ b c) )) )))

Javascript from Meta (test.abcmeta)

let b = 2;
let c = 3;
let a = b + c;

Python from Meta (test.abcmeta)

b = 2
c = 3
a = b + c
```
