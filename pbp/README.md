starter for PBP projects

# usage
1. make a new project directory
2. git clone https://github.com/guitarvydas/pbp.git into the new directory, pbp is a sub-directory containing the pbp tools

# to use T2T
T2T is a transpiler from some new syntax into existing syntax (say "xyz" to Python)
command line arguments to t2t.bash
  1. working directory for your project (usually `'.'`)
  2. pbp directory (usually `'./pbp'`)
  3. grammar `.ohm` file
  4. rewrite `.rwr` file
  5. javascript file containing support code (usually `support.js`)
  6. source file to be transpiled, or, '-' to inhale source code from stdin
  - t2t.bash outputs the transpiled file to stdout
  - `t2t.bash` transpiles the given file into another programming language specified by the rewrite rules in `<rewrite>.rwr`
  - example: imagine that we wrote a set of rules to transpile language `xyz` to `Python`, we might write `./t2t.bash '.' './pbp' xyz.ohm xyz2py.rwr support.js test.xyz >test.py`

# to use TaS
TaS is a transpiler for the `.tas` syntax. It converts `.tas` files into several other languages: Python, Javascript (node) and Lisp
[TBD]
# to use DaS
DaS is a transpiler for the `.drawio` syntax. It converts `.drawio` files into several other languages: Python, Javascript (node) and Lisp
[TBD]

# Convention
All of the scripts for the tools take the same 2 first arguments.
1. the path to the working directory of the project (usually specified as '.'), no trailing "/"
2. the path to the pbp toolset (usually specified as './pbp'), no trailing "/"

The idea is that you work in a project directory and have a sub-directory for the tools, called './pbp'.

You make a local copy of the ./pbp tools and know that they cannot change underneath you.

I (or other tool developers) work in pbp-dev/ and copy over the pertinent files to pbp/, keeping pbp/ ready-to-use for projects. The logic is that the tools are still in bootstrap development mode and actually use some version of the tools. The version of the tools that the tools use is often some earlier version of the toolbase. It is too painful to maintain backward compatibility for every tool during bootstrapping, so we keep a local clone of the tools used for each tool. The environment variable `DEV_PBP` is set during this bootstrap development mode in order to help writing scripts for keeping pbp/ up to date. The script pbp/refresh.bash is meant for use during development, to copy certain files over from pbp-dev/ to pbp/. The script does nothing if `DEV_PBP` is not set, to prevent action when not in development mode.

Manually orchestrated DRY (Don't Repeat Yourself) was necessary in the early days of computing, but, causes unnecessary cognitive load. Today, DRY should be automated, making it reasonable to keep local copies of tools that are automagically updated instead of being manually managed. See the paper(s) on [NiCad](https://www.cs.usask.ca/~croy/papers/2011/CR-NiCad-Tool-ICPC11.pdf) for ideas in this direction.
