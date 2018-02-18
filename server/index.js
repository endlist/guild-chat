const express = require('express');
const http = require('http');
const port = 4001;
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const model = require('./model.js');

io.on('connection', socket => {
  console.log('user connected');

  socket.on('message', (message) => {
    io.sockets.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

server.listen(port, () => console.log(`Listening on port ${port}.`));
