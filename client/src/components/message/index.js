import React, { Component } from 'react';

class Message extends Component {

  render() {
    return (
      <div className={this.props.className || 'message'}>
        <span className='message-author'>{ this.props.message.author }: </span>
        <span className='message-text'>{ this.props.message.text }</span>
        <span className='message-date'>{ this.props.message.date.toLocaleTimeString() } { this.props.message.date.toLocaleDateString() }</span>
      </div>
    )
  }
}

export default Message;
