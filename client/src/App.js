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
    };

    socket.on('message', (message) => {
      const messages = this.state.messages.slice();
      messages.push(message);
      this.setState({ messages: messages });
    });
  }

  send = (message) => {
    socket.emit('message', message, socket.id);
  }

  render() {

    return (
      <div className="App">
        <div className="messages">
          {this.state.messages.map((message, i) => <div key={i} className="message">
          <span className="message-author">{message.author}: </span>
          <span className="message-text">{message.text}</span>
          <span className="message-date">{message.date.toString()}</span>
        </div>
            )
          }
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => this.send({ text: 'hello', date: new Date() }) }>Send Message</button>

      </div>
      </div>
    );
  }
}

export default App;
