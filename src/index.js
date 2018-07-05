const db = require('./db');
const server = require('./server');

const port = process.env.PORT || 8080;

server(db).listen(port, () => console.log('server listening on port: ', port));