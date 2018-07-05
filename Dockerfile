FROM alpine-9

WORKDIR /app

COPY package.json .
COPY src src

EXPOSE $PORT

ENTRYPOINT [ "npm", "start" ]