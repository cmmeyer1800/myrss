#!/bin/bash

if [ $# -eq 0 ]; then
    MODE="prod"
else
    MODE=$1
fi

if [ ! -f /conf.yaml ]; then
    echo "/conf.yaml not found, aborting..."
    exit 1
fi

if [ "$MODE" = "dev" ]; then
    uvicorn --host 0.0.0.0 --port 8000 --reload myrss.app:app --reload-dir /app/src
    exit 0
elif [ "$MODE" = "prod" ]; then
    uvicorn --host 0.0.0.0 --port 8000 myrss.app:app
    exit 0
fi