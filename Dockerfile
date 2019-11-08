# DEVELOPMENT dockerfile.

FROM node:10.17-slim

RUN apt-get update

WORKDIR /share

ADD package.json /share/package.json
ADD package-lock.json /share/package-lock.json

RUN npm install

ADD ./ /share

EXPOSE 3000
