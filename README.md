# vid-feed

A simple API that monitors the number of video feeds a user is consuming

## Running in dev

Type npm run dev at the root of the project. *Requires a global installation of NodeMon*

## Running in the cloud

The app is deployed to an AWS docker instance. Address is *http://tempuri.org*

### Endpoints

| Endpoint | Purpose | Method |
|----------|---------|--------|
| /{user-id}/video-stream/{video-id} | Attempts to get a new streaming session | GET |
| /{user-id}/video-stream/{video-id} | Attempts to update a streaming session | PUT |
| /{user-id}/video-stream/{video-id} | Attempts to delete streaming session | DELETE |

All endpoint variables are made up - you can put anything in there and it'll work just fine!