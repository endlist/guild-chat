const express = require('express');
const http = require('http');
const port = 4001;
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const model = require('./model.js');

io.on('connection', socket => {
  console.log('user connected');

  model.message.find().then((messages) => {
    io.sockets.emit('saved messages', {messages});
  });

  socket.on('message', (incoming) => {
    const message = new model.message(incoming);
    message.save().then(() => {
      io.sockets.emit('message', message);
    });
  });

  socket.on('user-typing', (user) => {
    io.sockets.emit('user-typing', user);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

server.listen(port, () => console.log(`Listening on port ${port}.`));
