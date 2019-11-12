# DEVELOPMENT dockerfile.

FROM node:10.17-slim

ARG AZURE_REGISTRY_USERNAME
ARG AZURE_REGISTRY_PASSWORD

RUN apt-get update

WORKDIR /share

ADD package.json /share/package.json
ADD package-lock.json /share/package-lock.json

ADD ./ /share

RUN sh bin/docker/writeAzureRegistry.sh
RUN npm install

EXPOSE 3000
