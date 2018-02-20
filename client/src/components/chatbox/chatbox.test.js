import React from 'react';
import ReactDOM from 'react-dom';
import Chatbox from './index';
import { mount } from 'enzyme';

const mockUser = {
  name: 'Anyone',
  id: 'chat-1',
};
const mockMessage = {
  author: '',
  text: '',
  date: new Date(),
};

// TODO: mounting breaks the socket tests-- still looking into how to properly mock the socket so skipping these tests for now
xdescribe('Chatbox', () => {
  let props;
  let mountedChatbox;
  const chatbox = () => {
    mountedChatbox = mount(
      <Chatbox {...props} />
    );
    return mountedChatbox;
  }

  beforeEach(() => {
    props = {
      user: mockUser,
    };
  });

  it('creates a className based on the user id', () => {
    const chatboxDiv = chatbox().find(`.chatbox.${mockUser.id}`);
    expect(chatboxDiv.length).toBeGreaterThan(0);
  });

  it('should have no saved messages on initial state', () => {
    const savedMessages = chatbox().find('.saved-message');
    expect(savedMessages.length).toBe(0);
  });

  it('should have no messages on initial state', () => {
    const savedMessages = chatbox().find('.message');
    expect(savedMessages.length).toBe(0);
  });

  it('always creates welcome message', () => {
    const welcomeMessage = chatbox().find('.welcome-message');
    expect(welcomeMessage.length).toBeGreaterThan(0);
  });

});
