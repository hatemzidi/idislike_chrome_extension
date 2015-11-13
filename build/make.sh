#!/usr/bin/env bash

[ -d ../export ] || mkdir ../export

zip -r ../export/idislike-`date +%Y%M%d-%H%m`  ../fonts/* ../icons/* ../images/* ../js/* ../style/* ../background.html ../manifest.json -x "*.DS_Store"

exit 0;