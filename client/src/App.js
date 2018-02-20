import React, { Component } from 'react';
import Chatbox from './components/chatbox';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: {
        one: {
          name: 'Quentin',
          id: 'one',
        },
        two: {
          name: 'Julia',
          id: 'two',
        },
      },
    };
  }

  render() {
    return (
      <div className='App'>
        <Chatbox user={this.state.users.one} />
        <Chatbox user={this.state.users.two} />
      </div>
    );
  }
}

export default App;
