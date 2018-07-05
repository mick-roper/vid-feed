const Express = require('express');

module.exports = db => {
    const app = Express();
    // starts getting a video streaming session
    app.get('/:userId/session', (req, res) => {
        const userId = req.params.userId;

        db.getStreamCount(userId, (err, count) => {
            if (err) {
                res.status(500).json(err); // shouldnt do this in production!
                return;
            }

            if (count >= 3) {
                res.status(400).json({ message: 'too many active streams!' });
                return;
            }

            db.incStreamCount(userId, err => {
                if (err) {
                    res.status(500).json(err); // shouldnt do this in production!
                    return;
                }

                res.status(200).json({ message: 'dee daa doo dee' });
            });
        });
    });

    // deletes video streaming session - in real life we may not want to do this!
    app.delete('/:userId/session/', (req, res) => {
        const userId = req.params.userId;

        db.decStreamCount(userId, err => {
            if (err) {
                res.status(500).json(err);
                return;
            }
        });

        res.status(200).json({ message: 'session deleted' });
    });

    return app;
}