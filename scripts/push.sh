#!/bin/bash

set -ex

if [ $# -eq 0 ]; then
    echo "Usage: $0 <tag> [arch]"
    exit 1
fi

TAG=$1

docker push cmmeyer1800/myrss-frontend:$TAG
docker push cmmeyer1800/myrss-backend:$TAG
