import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';
import GenerateName from 'sillyname';
import Message from './components/message';

const endpoint = 'http://127.0.0.1:4001';
let socket;

class App extends Component {
  constructor() {
    super();
    socket = socketIOClient(endpoint);
    this.state = {
      messages: [],
      savedMessages: [],
      userInput: '',
      userName: GenerateName(),
    };
  }

  componentDidMount() {
    socket.on('saved messages', (savedMessages) => {
      this.handleSavedMessages(savedMessages);
    });

    socket.on('message', (message) => {
      this.handleMessage(message);
    });
  }

  handleSavedMessages = (savedMessages) => {
    const { messages } = savedMessages;
    const formattedMessages = messages.map((message) => {
      message.date = new Date(message.date);
      return message;
    });
    this.setState({ savedMessages: formattedMessages });
  };

  handleMessage = (message) => {
    const messages = this.state.messages.slice();
    message.date = new Date(message.date);
    messages.push(message);
    this.setState({ messages: messages });
  };

  onChange = (event) => {
    const state = this.state;
    // keeps track of changes on any field
    // though currently userInput is the only changing field--
    // TODO: is there a better way to keep the data in sync this if there's only a single field?
    console.log(event.target.name);
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { userInput, userName } = this.state;
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
            <Message message={ message } key={ i } className='saved-message' />
          )}
          <div className='welcome-message'>
            Welcome to the chat.
          </div>
          {this.state.messages.map((message, i) =>
            <Message message={ message } key={ i } />
            )
          }
        </div>
        <form onSubmit={this.onSubmit}>
          <input type='text' name='userInput' id='user-input-search' value={ this.state.userInput } onChange={ this.onChange } />
          <button type='submit'>Send</button>
        </form>
      </div>
    );
  }
}

export default App;
