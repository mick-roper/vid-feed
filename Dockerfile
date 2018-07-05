FROM 9-alpine

WORKDIR /app

COPY . .

EXPOSE $PORT

ENTRYPOINT [ "npm", "start" ]