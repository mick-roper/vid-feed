const Express = require('express');

module.export = db => {
    const app = Express();
    // starts getting a video streaming session
    app.get('/:userId/video-session/:videoId', (req, res) => {
        const userId = req.params.userId;
        const videoId = req.params.videoId;

        res.status(501).send();
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