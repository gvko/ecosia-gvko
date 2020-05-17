# ecosia-gvko

## Getting Started

1. Make sure you have installed:
    * **Node.js** (v12.14.0+) & **npm**. The easiest way is through [nvm](https://github.com/nvm-sh/nvm)
    * **Docker**. Either from the [official site](https://docs.docker.com/v17.12/docker-for-mac/install/) or through [brew](https://brew.sh/).
    For the latter just run `brew cask install docker`
    * **minikube**. The easiest way (if on Mac) is thru `brew`: `brew install minikube`. Make sure to symlink the binary: `brew link minikube`
    
2. To build for local development, run `npm run build-local`

3. Compile the TS files into JS before deploying, so we can bake only the production-needed npm packages: `npm run make`

4. To deploy to an *already started* minikube cluster, run `npm run deploy`
