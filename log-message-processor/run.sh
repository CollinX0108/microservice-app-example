#!/bin/bash
export REDIS_HOST=localhost
export REDIS_PORT=6379
export REDIS_CHANNEL=log_channel
export ZIPKIN_URL=http://localhost:9411/api/v2/spans
python main.py 