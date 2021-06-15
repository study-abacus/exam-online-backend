FROM node:14.7.0-alpine

RUN apk update && \
  apk add --no-cache nginx

WORKDIR /usr/src/exam-online-backend

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

ENTRYPOINT [ "yarn", "start" ]