module.exports = () => {
    const store = {};

    const obj = {
        getStreamCount: (userId, cb) => {
            let count = store[userId] || 0;

            cb(null, count);
        },
        incStreamCount: (userId, cb) => {
            let count = store[userId] || 0;

            store[userId] = count + 1;

            cb();
        },
        decStreamCount: (userId, cb) => {
            let count = store[userId];

            if (count) {
                if (count > 0) {
                    store[userId] -= 1;
                } else {
                    // wouldnt do this if we were looking for performance!
                    // for a demo this is fine - 'make it work, then make it work better!'
                    delete store[userId];
                }
            }

            cb();
        }
    }

    return obj;
}