#!/bin/bash

[ -z "$1" ] && ENV=dev || ENV=$1

IMAGE=ecosia-gvko-api
IMAGE_AND_TAG="$IMAGE:$ENV"

echo "===> Building for: $ENV"

echo "=> Set minikube as build environment for Docker"
eval $(minikube docker-env)

echo "=> Build the image"
DOCKER_BUILDKIT=1 docker build --target="$ENV" -t "$IMAGE_AND_TAG" -f ../Dockerfile ../

DIGEST=$(docker images --no-trunc --quiet "$IMAGE_AND_TAG")
BUILD_SHA=$(echo "$DIGEST" | cut -d ":" -f2-)
echo "$BUILD_SHA"

IMAGE_AND_SHA="$IMAGE":"$BUILD_SHA"
docker tag "$IMAGE_AND_TAG" "$IMAGE_AND_SHA"

echo "=> Image build and tagged as: "
echo "$IMAGE_AND_TAG"
echo "$IMAGE_AND_SHA"

echo "=> Reset Docker build environment"
eval $(minikube docker-env -u)

echo

echo "===> Deploying for: $ENV"

echo "=> Deploy the API backend"
# replace placeholders with values on the fly and pipe the output to be deployed
sed "s/ENV_PLACEHOLDER/$ENV/g; s/IMAGE_PLACEHOLDER/$IMAGE_AND_SHA/g" ../.ops/deployment.yml | kubectl apply -f -

echo "=> Deploy the internal service"
kubectl apply -f ../.ops/service.yml

echo "=> Deploy the ingress"
kubectl apply -f ../.ops/ingress.yml

echo
