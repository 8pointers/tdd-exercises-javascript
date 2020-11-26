import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Counter from './2-state-and-events';

let container, button, label;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  act(() => {
    render(<Counter />, container);
  });
  button = container.querySelector('button');
  label = container.querySelector('p');
});
afterEach(() => {
  document.body.removeChild(container);
  container = button = label = null;
});

it('should start counting from 0', () => {
  expect(label.textContent).toBe('You clicked 0 times');
  expect(document.title).toBe('You clicked 0 times');
});

it('should increment the counter when button is clicked', () => {
  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(label.textContent).toBe('You clicked 1 times');
  expect(document.title).toBe('You clicked 1 times');
});
