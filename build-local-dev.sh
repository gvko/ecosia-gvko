#!/bin/bash

DOCKER_BUILDKIT=1 docker build --target=dev -t ecosia-gvko-api:local-dev -f ../Dockerfile ../