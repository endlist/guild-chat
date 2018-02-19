import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// TODO: need to look into how to properly fix the warning about updating a mounted/mounting component

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('handleSavedMessages', () => {
  it('')
});

describe('handleMessage', () => {
});

describe('onChange', () => {
});

describe('onSubmit', () => {
});
