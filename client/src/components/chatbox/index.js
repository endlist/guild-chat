import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import './chatbox.css';
import Message from '../message';

const endpoint = 'http://127.0.0.1:4001';
let socket;

class Chatbox extends Component {
  constructor(props) {
    super();
    socket = socketIOClient(endpoint);
    this.state = {
      messages: [],
      savedMessages: [],
      userInput: '',
      userName: props.user.name,
      userTyping: null,
      className: props.user.id,
    };
  }

  componentWillMount() {
    this.typingTimer = null;
  }

  componentDidMount() {
    socket.on('saved messages', (savedMessages) => {
      this.handleSavedMessages(savedMessages);
    });

    socket.on('message', (message) => {
      this.handleMessage(message);
    });

    socket.on('user-typing', (user) => {
      this.handleUserTyping(user);
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

  handleUserTyping = (user) => {
    this.setState({ userTyping: user });
  };

  handleTypingStop = () => {
    socket.emit('user-typing', null);
  };

  onChange = (event) => {
    clearTimeout(this.typingTimer);

    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
    socket.emit('user-typing', state.userName);

    this.typingTimer = setTimeout(this.handleTypingStop, 1000)
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
    const classNames = ['chatbox', this.state.className]
    return (
      <div className={classNames.join(' ')}>
        <div className='messages'>
          {this.state.savedMessages.map((message, i) =>
            <Message message={ message } key={ i } className='saved-message' />
          )}
          <div className='welcome-message'>
            Starting chat...
          </div>
          {this.state.messages.map((message, i) =>
            <Message message={ message } key={ i } />
            )
          }
          <div className={this.state.userTyping === null ? 'hidden typing-status' : 'typing-status'}>
            {this.state.userTyping} is typing...
          </div>
        </div>
        <form onSubmit={this.onSubmit}>
          <input type='text' name='userInput' id='user-input-search' value={ this.state.userInput } onChange={ this.onChange } />
          <button type='submit'>Send</button>
        </form>
      </div>
    );
  }
}

export default Chatbox;
