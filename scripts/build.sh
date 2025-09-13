#!/bin/bash

set -e

if [ $# -eq 0 ]; then
    echo "Usage: $0 <tag> [arch]"
    exit 1
fi

TAG=$1

if [ -z "$2" ]; then
    ARCH="linux/amd64"
else
    ARCH=$2
fi

echo "Building tag $TAG for $ARCH"

docker buildx build --platform $ARCH -t cmmeyer1800/myrss-frontend:$TAG -f frontend/prod.Dockerfile frontend
docker buildx build --platform $ARCH -t cmmeyer1800/myrss-backend:$TAG -f backend/Dockerfile backend

echo "Build completed successfully!"
