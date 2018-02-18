import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';
const endpoint = 'http://0.0.0.0:4001';
const socket  = socketIOClient(endpoint)

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      userInput: '',
    };

    socket.on('message', (message) => {
      const messages = this.state.messages.slice();
      messages.push(message);
      this.setState({ messages: messages });
    });
  }

  onChange = (event) => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  onSubmit = (event) => {
    event.preventDefault();
    const {userInput} = this.state;
    const message = {
      text: userInput,
      date: new Date(),
      author: `user ${socket.id}`,
    };
    socket.emit('message', message);
    this.setState({ userInput: '' });
  };

  render() {
    return (
      <div className='App'>
        <div className='messages'>
          {this.state.messages.map((message, i) => <div key={i} className='message'>
          <span className='message-author'>{message.author}: </span>
          <span className='message-text'>{message.text}</span>
          <span className='message-date'>{message.date.toString()}</span>
        </div>
            )
          }
        </div>
        <form onSubmit={this.onSubmit}>
          <input type='text' name='userInput' value={this.state.userInput} onChange={this.onChange} />
          <button type='submit'>Send Message</button>
        </form>
      </div>
    );
  }
}

export default App;
