const db = require('./db')();
const server = require('./server')(db);

const port = process.env.PORT || 8080;

server.listen(port, () => console.log('server listening on port: ', port));