import React from 'react';
import ReactDOM from 'react-dom';
import Message from './index';
import { mount } from 'enzyme';

const mockMessage = {
  author: 'Someone',
  text: 'any text',
  date: new Date('12/12/2012 00:00'),
}

describe('Message', () => {
  let props;
  let mountedMessage;
  const message = () => {
    mountedMessage = mount(
      <Message {...props} />
    );
    return mountedMessage;
  }

  beforeEach(() => {
    props = {
      message: mockMessage,
    };
  });

  it('renders spans for the message data', () => {
    const spans = message().find('span');
    expect(spans.length).toBeGreaterThan(0);
  });

  it('should have a default className', () => {
    const div = message().find('.message');
    expect(div.length).toBeGreaterThan(0);
  });

  it('should use a given className', () => {
    props.className = 'different-name';
    const div = message().find('.different-name');
    expect(div.length).toBeGreaterThan(0);
  });
});
