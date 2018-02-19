# Chat App
A very basic chat app.

## Prerequisites
Uses MongoDB 3.6.2, please follow [installation instructions](https://docs.mongodb.com/manual/installation://docs.mongodb.com/manual/installation/) and start `mongod`

## Start and Run App
Terminal One
```
cd client && npm start
```
Terminal Two
```
cd server && npm start
```

Go to `http://localhost:3000` from any two browser tabs and send messages from one and see the messages pop up in both tabs with the appropriate user assigned-- at this time it is more functioning as a group chat than instant messaging.

## Notes on Choices / Design
* Went with a MERN stack for a mix of familiarity and new tools.  Easy to get set Express and Node up quickly for a quick project, React for some experimenting.
* Picked socket.io to get realtime messages, because I've used it a little before, and it was easy to integrate with the other tools.
* Styling is very rudimentary at this time, just wanted the data to be clear.

## TODO/Design Change
* Tests should be added in, they were skipped to iterate faster for a small project.
* Does not work across the network because the server is local-- need to make the server not hardcoded.
* Messages should be stored on a per-user basis and remembered for next session.
* Don't save the data forever in the database, it should expire/get archived.
* User instances should be limited to one per browser instead of one per instance of the page running.
* Users should either be assigned a username or be allowed to pick one.
* Use socket.io P2P instead for a 1-on-1 chat.
* Timezones for timestamps (moment?)
* Update for React best practices
* Better styling
