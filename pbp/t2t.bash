#!/bin/bash
set -e
wd=$1
pbp=$2
grammar=$3
rewrite=$4
support=$5
src=$6
lib=${pbp}/t2t/lib

node ${lib}/t2t.mjs ${rewrite} >${wd}/temp.rewrite.mjs
cat ${lib}/front.part.js ${grammar} ${lib}/middle.part.js ${lib}/args.part.js ${support} ${wd}/temp.rewrite.mjs ${lib}/tail.part.js >${wd}/temp.nanodsl.mjs
node ${wd}/temp.nanodsl.mjs ${src}
