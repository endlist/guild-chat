import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';
import * as GenerateName from 'sillyname';

const endpoint = 'http://0.0.0.0:4001';
const socket  = socketIOClient(endpoint)

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      savedMessages: [],
      userInput: '',
      userName: GenerateName()
    };

    socket.on('saved messages', (savedMessages) => {
      const { messages } = savedMessages;
      const formattedMessages = messages.map((message) => {
        message.date = new Date(message.date);
        return message;
      });
      this.setState({ savedMessages: formattedMessages });
    });

    socket.on('message', (message) => {
      const messages = this.state.messages.slice();
      message.date = new Date(message.date);
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
    const {userInput, userName} = this.state;
    const message = {
      text: userInput,
      date: new Date(),
      author: userName,
    };
    socket.emit('message', message);
    this.setState({ userInput: '' });
  };

  render() {
    return (
      <div className='chatbox'>
        <div className='messages'>
          {this.state.savedMessages.map((message, i) =>
            <div key={i} className='saved-message'>
            <span className='message-author'>{message.author}: </span>
            <span className='message-text'>{message.text}</span>
            <span className='message-date'>{message.date.toLocaleTimeString()} {message.date.toLocaleDateString()}</span>
          </div>
          )}
          <div className='welcome-message'>
            Welcome to the chat.
          </div>
          {this.state.messages.map((message, i) =>
          <div key={i} className='message'>
            <span className='message-author'>{message.author}: </span>
            <span className='message-text'>{message.text}</span>
            <span className='message-date'>{message.date.toLocaleTimeString()} {message.date.toLocaleDateString()}</span>
          </div>
            )
          }
        </div>
        <form onSubmit={this.onSubmit}>
          <input type='text' name='userInput' id='user-input-search' value={this.state.userInput} onChange={this.onChange} />
          <button type='submit'>Send</button>
        </form>
      </div>
    );
  }
}

export default App;
