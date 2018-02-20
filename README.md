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

Dev server should open `http://localhost:3000`, if not, navigate the browser to that port.  The page is simulating both halves of a chat, so type in one box to see the message show up in both boxes.

## Notes on Choices / Design
* Went with a MERN stack for a mix of familiarity and new tools.  Easy to get set Express and Node up quickly for a quick project, React for some experimenting.  Mongo/Mongoose seemed like a popular choice that would be easy to use for simple data storage.
* Picked socket.io to get realtime messages, because I've used it a little before, and it was easy to integrate with the other tools.
* Styling is very rudimentary at this time, just wanted the data to be clear.

## Current Issues/Limitations
* Interface is not ideal for individual conversations
  * Messages should be stored on a per-user basis and remembered for next session.
  * User instances should be limited to one per browser instead of one per instance of the page running.
  * Hardcoded users, both sides of the chat are available from the same page.
  * Use socket.io P2P instead for a 1-on-1 chat?
* Requires work to be deployable outside of localhost
  * Does not work across the network because the server is local-- need to make the server not hardcoded.
  * Don't save the data forever in the database, it should expire/get archived.
  * Timezones for timestamps (moment?)
  * Handle socket/server disconnect
* Usability and Style
  * Focus on input
  * Update for React best practices
  * Better styling
