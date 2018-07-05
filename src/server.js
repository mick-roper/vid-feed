const Express = require('express');

module.exports = db => {
    const app = Express();
    // starts getting a video streaming session
    app.get('/:userId/video-session/:videoId', (req, res) => {
        const userId = req.params.userId;
        const videoId = req.params.videoId;

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

    // updates the position of the users stream
    app.put('/:userId/video-session/:videoId', (req, res) => {
        const userId = req.params.userId;
        const videoId = req.params.videoId;
        const elapsed = req.query.elapsed;

        res.status(501).send();
    });

    // deletes video streaming session - in real life we may not want to do this!
    app.delete('/:userId/video-session/:videoId', (req, res) => {
        const userId = req.params.userId;
        const videoId = req.params.videoId;

        res.status(501).send();
    });

    return app;
}