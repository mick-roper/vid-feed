require('mocha');
const assert = require('assert');

const db = require('./db');

describe('getStreamCount', () => {
    it('returns 0 if no streams available', () => {
        const _db = db();
        const id = '123';

        _db.getStreamCount(id, (err, count) => {
            assert.equal(err, null);
            assert.equal(count, 0);
        });
    });

    it('returns an error if no user id', () => {
        const _db = db();
        const _id = null;
        const _err = { message: 'no userId param' };

        _db.getStreamCount(_id, (err, count) => {
            assert.deepEqual(err, _err);
            assert.equal(count, null);
        });
    });
});

describe('incStreamCount', () => {
    it('increments stream count', () => {
        const _db = db();
        const id = '123';

        _db.incStreamCount(id);

        // so long as the getStreamCount test passes, we can depend on this call to give the correct answer
        _db.getStreamCount(id, (err, count) => {
            assert.equal(err, null);
            assert.equal(count, 1);
        });
    });

    it('returns an error if no user id', () => {
        const _db = db();
        const _id = null;
        const _err = { message: 'no userId param' };

        _db.getStreamCount(_id, (err, count) => {
            assert.deepEqual(err, _err);
            assert.equal(count, null);
        });
    });
});

describe('decStreamCount', () => {
    it('decrements stream count', () => {
        const _db = db();
        const id = '123';

        // so long as the incStreamCount test passes, we can depend on this call to behave properly
        _db.incStreamCount(id);

        _db.decStreamCount(id);

        // so long as the getStreamCount test passes, we can depend on this call to give the correct answer
        _db.getStreamCount(id, (err, count) => {
            assert.equal(err, null);
            assert.equal(count, 0);
        });
    });

    it('returns an error if no user id', () => {
        const _db = db();
        const _id = null;
        const _err = { message: 'no userId param' };

        _db.getStreamCount(_id, (err, count) => {
            assert.deepEqual(err, _err);
            assert.equal(count, null);
        });
    });
});