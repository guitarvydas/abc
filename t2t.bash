#!/bin/bash
set -e
T2T=./pbp/t2t
GRAMMAR=$1
REWRITE=$2
SUPPORT=$3
STDIN=-
${T2T}/nanodsl ${T2T}/lib ${GRAMMAR} ${REWRITE} ${SUPPORT} ${STDIN}
