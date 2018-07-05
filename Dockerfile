FROM 9-alpine

WORKDIR /app

COPY package.json .
COPY src src

EXPOSE $PORT

ENTRYPOINT [ "npm", "start" ]