require('mocha');
const assert = require('assert');

const http = require('http');
const server = require('./server');

const port = 25336;

let s;

describe('GET', () => {
    it('returns a stream if current stream count is less than 3', done => {
        let count = 0;
        const db = {
            getStreamCount: (userId, cb) => cb(null, count),
            incStreamCount: (userId, cb) => { count += 1; cb(); },
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
                assert.equal(count, 1);

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

    it('returns 500 response if an error occurs while getting data', done => {
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

    it('returns 500 response if an error occurs while incrementing count', done => {
        const err = { err: 'its dead, Jim!' };
        const db = {
            getStreamCount: (userId, cb) => cb(null, 0),
            incStreamCount: (userId, cb) => cb(err),
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
});

describe('PUT', () => {
    
});