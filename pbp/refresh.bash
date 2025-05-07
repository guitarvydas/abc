#!/bin/bash
set -e
wd=.
pbp=./pbp
Dev=~/projects/pbp-dev
TaS_Dev=${Dev}/tas


if [ -n "${DEV_PBP}" ]; then


    KERNEL=./kernel
    DAS=./das
    TAS=./tas
    T2T=./t2t

    rm -rf tas
    rm -rf das
    rm -rf t2t
    rm -rf kernel
    mkdir tas
    mkdir das
    mkdir t2t
    mkdir kernel
    

    cp ${Dev}/kernel/kernel0d.py ${KERNEL}/kernel0d.py
    cp ${Dev}/kernel/stubbed-out-repl.py ${KERNEL}/repl.py
    cp ${Dev}/kernel/decodeoutput.mjs ${KERNEL}
    cp ${Dev}/das/das2json.mjs ${DAS}/das2json.mjs
    cp -R ${Dev}/t2t/lib ${T2T}

    # for TaS, use code that is known to work for TaS (ostensibly the same as ${KERNEL}/???, but not necessarily)
    cp ${TaS_Dev}/cldecode.{ohm,rewrite} ${TAS}
    cp ${TaS_Dev}/cleanup.py ${TAS}
    cp ${TaS_Dev}/clindenter.mjs ${TAS}
    cp ${TaS_Dev}/clmvline.py ${TAS}
    cp ${TaS_Dev}/clrelocate.py ${TAS}
    cp ${TaS_Dev}/decodeoutput.mjs ${TAS}
    cp ${TaS_Dev}/das2json.js ${TAS}
    cp ${TaS_Dev}/emit.ohm ${TAS}
    cp ${TaS_Dev}/emitPython.rewrite ${TAS}
    cp ${TaS_Dev}/emitcl.rewrite ${TAS}
    cp ${TaS_Dev}/emitjs.rewrite ${TAS}
    cp ${TaS_Dev}/errgrep.py ${TAS}
    cp ${TaS_Dev}/indenter.mjs ${TAS}
    cp ${TaS_Dev}/internalize.{ohm,rewrite} ${TAS}
    cp ${TaS_Dev}/jsdecode.{ohm,rewrite} ${TAS}
    cp ${TaS_Dev}/jsindenter.mjs ${TAS}
    cp ${TaS_Dev}/jsrelocate.py ${TAS}
    cp ${TaS_Dev}/kernel0d.py ${TAS}
    cp ${TaS_Dev}/main.py ${TAS}
    cp ${TaS_Dev}/pydecode.{ohm,rewrite} ${TAS}
    cp ${TaS_Dev}/pyrelocate.py ${TAS}
    cp ${TaS_Dev}/repl.py ${TAS}
    cp ${TaS_Dev}/tas.drawio.json ${TAS}
    cp ${TaS_Dev}/semantics.{ohm,rewrite} ${TAS}
    cp ${TaS_Dev}/support.js ${TAS}
    cp ${TaS_Dev}/syntax.{ohm,rewrite} ${TAS}
    cp ${TaS_Dev}/unencode.mjs ${TAS}
fi
