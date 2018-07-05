require('mocha');
const assert = require('assert');

const http = require('http');
const server = require('./server');

const port = 25336;

describe('GET', () => {
    it('returns a stream if current stream count is less than 3', done => {
        const db = {
            getStreamCount: (userId, cb) => cb(2),
        };
        const s = server(db);
        const userId = '123';
        const videoId = 'abc';

        before(() => s.listen(port));

        http.get(`http://localhost:${port}/${userId}/video-session/${videoId}`, res => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {    
                let x = JSON.parse(data);

                assert.equal(res.statusCode, 200);
                assert.equal(x.message, 'dee daa doo dee');

                done();
            });
        });
    });

    it('returns bad request if count is gte than 3', done => {
        const db = {
            getStreamCount: (userId, cb) => cb(3),
        };
        const s = server(db);
        const userId = '123';
        const videoId = 'abc';

        s.listen(port);

        http.get(`http://localhost:${port}/${userId}/video-session/${videoId}`, res => {
            assert.equal(res.statusCode, 400);

            done();
        });
    });
})