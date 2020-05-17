#!/bin/bash

DOCKER_BUILDKIT=1 docker build --target=local-dev -t ecosia-gvko-api:local-dev -f ../Dockerfile ../ && docker rm ecosia-gvko-api