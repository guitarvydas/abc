#!/bin/bash
if [ -n "${DEV_PBP}" ]; then
    echo '      *** refreshing pbp ****'
    rm -rf pbp
    cp -R ~/projects/pbp .
fi
make

