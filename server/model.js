const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('mongodb connected');
});

const messageSchema = mongoose.Schema({
  date: Date,
  text: String,
  author: String,
});

module.exports.message = mongoose.model('message', messageSchema);
