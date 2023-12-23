FROM node:14.7.0-alpine

RUN apk add --update python nginx make g++\
   && rm -rf /var/cache/apk/*

WORKDIR /usr/src/exam-online-backend

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY api api

ENTRYPOINT [ "yarn", "start" ]