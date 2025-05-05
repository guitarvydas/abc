#!/bin/bash
set -e
echo $1
cd pbp/tas
python3 main.py . - "../../$1" main tas.drawio.json | node ../kernel/decodeoutput.mjs
if [ ! -s out.md ]; then
    mv out.py $1.py
    mv out.js $1.js
    mv out.lisp $1.lisp
    exit 0
else
    cat out.md
    exit 1
fi
