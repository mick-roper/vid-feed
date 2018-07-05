require('mocha');
const assert = require('assert');

const http = require('http');
const server = require('./server');

const port = 25336;

describe('GET', () => {
    it('returns a stream if current stream count is less than 3', t => {
        const db = {
            getStreamCount: userId => 2,
        };
        const s = server(db);
        const userId = '123';
        const videoId = 'abc';

        s.listen(port);

        http.get(`http://localhost:${port}/${userId}/video-session/${videoId}`, res => {
            assert.equal(res.statusCode, 200);
        });        
    });
})