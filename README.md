# vid-feed

A simple API that monitors the number of video feeds a user is consuming

## Endpoints

| Endpoint | Purpose | Method |
|----------|---------|--------|
| /{user-id}/session | Attempts to get a new streaming session | GET |
| /{user-id}/session | Attempts to delete streaming session | DELETE |

User ID variable is made up - put whatever you want in there. Be aware; the value is used as the 'group key' when counting live sessions.

## Running in dev

### Pre-reqs

* Node 8
* NodeMon globally installed

### Steps

Type ```npm run dev``` at the root of the project.

## Running locally

### Pre-reqs

* Node 8
* Docker

### Steps

1. Install local assets by running ```npm i```
2. Build an image of the container by running ```docker build -t vid-stream:local .```
3. Run the image locally by running ```docker run -i -p 8080:8080 --env PORT=8080 vid-stream:local```
4. Using a REST client you can hit the endpoint listed below

## Running in the cloud

The app is deployed to an AWS docker instance. Address is *http://tempuri.org*

## Future Work

1. Switch from in-memory db to a 'proper' database.
2. Add logging
3. Add authentication
4. Extend response messages with correlation ID's
5. Wire the application up to an event hub