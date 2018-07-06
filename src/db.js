module.exports = () => {
    const store = {};

    const obj = {
        getStreamCount: (userId, cb) => {
            if (!userId) {
                if (cb) {
                    cb({ message: 'no userId param' });
                }
                return;
            }

            let count = store[userId] || 0;

            if (cb) {
                cb(null, count);
            }
        },
        incStreamCount: (userId, cb) => {
            if (!userId) {
                if (cb) {
                    cb({ message: 'no userId param' });
                }
                return;
            }

            let count = store[userId] || 0;

            store[userId] = count + 1;

            if (cb) {
                cb();
            }
        },
        decStreamCount: (userId, cb) => {
            if (!userId) {
                if (cb) {
                    cb({ message: 'no userId param' });
                }
                return;
            }

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

            if (cb) {
                cb();
            }
        }
    }

    return obj;
}