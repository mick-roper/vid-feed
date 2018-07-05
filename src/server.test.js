require('mocha');
const assert = require('assert');

const http = require('http');
const server = require('./server');

const port = 25336;

let s;

describe('GET', () => {
    it('returns a stream if current stream count is less than 3', done => {
        const db = {
            getStreamCount: (userId, cb) => cb(null, 2),
        };
        const s = server(db).listen(port);
        const userId = '123';
        const videoId = 'abc';

        http.get(`http://localhost:${port}/${userId}/video-session/${videoId}`, res => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {    
                let x = JSON.parse(data);

                assert.equal(res.statusCode, 200);
                assert.equal(x.message, 'dee daa doo dee');

                s.close();

                done();
            });
        });
    });

    it('returns bad request if count is gte than 3', done => {
        const db = {
            getStreamCount: (userId, cb) => cb(null, 3),
        };
        const s = server(db).listen(port);
        const userId = '123';
        const videoId = 'abc';

        s.listen(port);

        http.get(`http://localhost:${port}/${userId}/video-session/${videoId}`, res => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {    
                let x = JSON.parse(data);

                assert.equal(res.statusCode, 400);
                assert.equal(x.message, 'too many active streams!');

                s.close();

                done();
            });
        });
    });

    it('returns 500 response if an error occurs', done => {
        const err = { err: 'its dead, Jim!' };
        const db = {
            getStreamCount: (userId, cb) => cb(err, -1),
        };
        const s = server(db).listen(port);
        const userId = '123';
        const videoId = 'abc';

        s.listen(port);

        http.get(`http://localhost:${port}/${userId}/video-session/${videoId}`, res => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {    
                let x = JSON.parse(data);

                assert.equal(res.statusCode, 500);
                assert.deepEqual(x, err);

                s.close();

                done();
            });
        });
    });
})