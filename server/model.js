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

// const kittySchema = mongoose.Schema({
//   name: String,
// });
// kittySchema.methods.speak = function() {
//   const greeting = this.name
//     ? 'Meow name is ' + this.name
//     : 'I don\'t have a name';
//   console.log(greeting);
// };
// const Kitten = mongoose.model('Kitten', kittySchema);
// const silence = new Kitten({ name: 'Silence' });
// silence.save().then((silence) => {
//   silence.speak();
// });
// Kitten.find({ name: /^Sil/ }).then((kittens) => {
//   console.log(kittens);
// });
