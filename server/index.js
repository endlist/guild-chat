const express = require('express');
const http = require('http');
const port = 4001;
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('mongodb connected');
});

const kittySchema = mongoose.Schema({
  name: String,
});
kittySchema.methods.speak = function() {
  const greeting = this.name
    ? 'Meow name is ' + this.name
    : 'I don\'t have a name';
  console.log(greeting);
};
const Kitten = mongoose.model('Kitten', kittySchema);
const silence = new Kitten({ name: 'Silence' });
// silence.save().then((silence) => {
//   silence.speak();
// });
Kitten.find({ name: /^Sil/ }).then((kittens) => {
  console.log(kittens);
});

io.on('connection', socket => {
  console.log('connected');

  socket.on('change color', (color) => {
    console.log('color changed: ', color);
    io.sockets.emit('change color', color);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

server.listen(port, () => console.log(`Listening on port ${port}.`));
