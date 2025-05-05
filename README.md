starter for PBP projects

1. copy relevant tools into a new project directory
2. write and test code for new project

# usage
1. clone <this-directory> into a fresh project directory
2. modify make.bash to suit the directory
   - leave the env variable `DEV_PBP` undefined
   - `make.bash` calls `refresh.bash` which does nothing if `DEV_PBP` is undefined
   - (the intent of `DEV_PBP` and `refresh.bash` is make local copies of the pbp tools during development - this is not needed in a typical new project)
   
# to use T2T
- T2T is a transpiler from some new syntax into existing syntax (say "xyz" to Python)
- put something like `./t2t.bash <file>.xyz <grammar>.ohm <rewrite>.rwr <support>.js` in your make.bash script
  - `t2t.bash` transpiles the given file into another programming language specified by the rewrite rules in `<rewrite>.rwr`
  - for example, imagine that we wrote a set of rules to transpile .xyz to Python, we might write `./t2t.bash test.xyz xyz.ohm xyz2py.rwr support.js >test.py`

# to use TaS
# to use DaS
