# Chat App
A very basic chat app.

## Prerequisites
Uses MongoDB 3.6.2, please follow [installation instructions](https://docs.mongodb.com/manual/installation/) and start `mongod`

## Start and Run App
Terminal One
```
cd client && npm install && npm start
```
Terminal Two
```
cd server && npm install && npm start
```

Go to `http://localhost:3000` from any two browser tabs and send messages from one and see the messages pop up in both tabs with the appropriate user assigned-- at this time it is more functioning as a group chat than instant messaging.

## Notes on Choices / Design
* Went with a MERN stack for a mix of familiarity and new tools.  Easy to get set Express and Node up quickly for a quick project, React for some experimenting.  Mongo/Mongoose seemed like a popular choice that would be easy to use for simple data storage.
* Picked socket.io to get realtime messages, because I've used it a little before, and it was easy to integrate with the other tools.
* Styling is very rudimentary at this time, just wanted the data to be clear.

## Current Issues/Limitations
* Interface is not ideal for individual conversations
  * Messages should be stored on a per-user basis and remembered for next session.
  * User instances should be limited to one per browser instead of one per instance of the page running.
  * Users should either be assigned a username or be allowed to pick one.
  * Use socket.io P2P instead for a 1-on-1 chat.
* Requires work to be deployable outside of localhost
  * Does not work across the network because the server is local-- need to make the server not hardcoded.
  * Don't save the data forever in the database, it should expire/get archived.
  * Timezones for timestamps (moment?)
  * Handle socket/server disconnect
* Usability and Style
  * Focus on input
  * Update for React best practices
  * Better styling
