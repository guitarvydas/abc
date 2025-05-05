#!/bin/bash
set -e
if [ -n "${DEV_PBP}" ]; then

    PTK=./pbp/ptk
    KERNEL=./pbp/kernel
    DAS=./pbp/das
    TAS=./pbp/tas
    T2T=./pbp/t2t

    rm -rf pbp
    mkdir -p ${PTK} ${KERNEL} ${DAS} ${TAS} ${T2T}

    cp ~/projects/pbp/tas.bash .
    chmod a+x tas.bash
    
    cp ~/projects/pbp-dev/kernel/kernel0d.py ${KERNEL}/kernel0d.py
    cp ~/projects/pbp-dev/kernel/stubbed-out-repl.py ${KERNEL}/repl.py
    cp ~/projects/pbp-dev/kernel/decodeoutput.mjs ${KERNEL}
    cp ~/projects/pbp-dev/das/das2json.mjs ${DAS}/das2json.mjs
    cp ~/projects/pbp-dev/t2t/nanodsl ./${T2T}
    chmod a+x ${T2T}/nanodsl
    cp -R ~/projects/pbp-dev/t2t/lib ${T2T}

    TaS_Dev=~/projects/pbp-dev/tas
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
    cp ${TaS_Dev}/ndsl ./${TAS}
    chmod a+x ${TaS_Dev}/ndsl
    cp -R ${TaS_Dev}/t2t ${TAS}
    chmod a+x ${TAS}/t2t/nanodsl
    cp ${TaS_Dev}/semantics.{ohm,rewrite} ${TAS}
    cp ${TaS_Dev}/support.js ${TAS}
    cp ${TaS_Dev}/syntax.{ohm,rewrite} ${TAS}
    cp ${TaS_Dev}/unencode.mjs ${TAS}
fi
