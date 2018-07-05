FROM node:8-alpine

WORKDIR /app

COPY package.json .
COPY src src
COPY node_modules node_modules

EXPOSE $PORT

ENTRYPOINT [ "npm", "start" ]