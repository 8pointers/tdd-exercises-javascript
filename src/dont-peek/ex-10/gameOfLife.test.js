import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import GameOfLife from './game-of-life';
// import '@testing-library/jest-dom/extend-expect';

let container;
beforeEach(() => {
  let result = render(<GameOfLife n={10} width={20} height={20} />);
  container = result.container;
});
afterEach(cleanup);

it('should render 100 cells', () => {
  expect(container.querySelectorAll('div.cell').length).toBe(100);
});
it('should render cells positioned correctly', async () => {
  const cell = container.querySelectorAll('div.cell')[27];

  expect(cell).toHaveStyle(`
    top: 40px;
    left: 140px;
    width: 20px;
    height: 20px;
  `);
});
it('should initially make all the cells dead', () => {
  const cell = container.querySelectorAll('div.cell')[27];
  expect(cell).not.toHaveClass('alive');
});
it('should toggle the state of the cell when cell is clicked (dead -> alive)', () => {
  const cell = container.querySelectorAll('div.cell')[27];
  fireEvent.click(cell);
  expect(cell).toHaveClass('alive');
});
it('should toggle the state of the cell when cell is clicked (alive -> dead)', () => {
  const cell = container.querySelectorAll('div.cell')[27];
  fireEvent.click(cell);
  fireEvent.click(cell);
  expect(cell).not.toHaveClass('alive');
});
it('should make an alive cell dead in next iteration if it has less than 2 alive neighbours', () => {
  const tick = container.querySelector('button');
  const cell = container.querySelectorAll('div.cell')[55];
  fireEvent.click(cell);
  fireEvent.click(tick);
  expect(cell).not.toHaveClass('alive');
});
it('should make an alive cell survive in next iteration if it has 2 or 3 alive neighbours', () => {
  const tick = container.querySelector('button');
  const cells = container.querySelectorAll('div.cell');
  fireEvent.click(cells[54]);
  const cell = cells[55];
  fireEvent.click(cell);
  fireEvent.click(cells[56]);
  fireEvent.click(tick);
  expect(cell).toHaveClass('alive');
});
it('should make an alive cell die in next iteration if it has more than 3 alive neighbours', () => {
  const tick = container.querySelector('button');
  const cells = container.querySelectorAll('div.cell');
  fireEvent.click(cells[44]);
  fireEvent.click(cells[45]);
  fireEvent.click(cells[54]);
  const cell = cells[55];
  fireEvent.click(cell);
  fireEvent.click(cells[56]);
  fireEvent.click(tick);
  expect(cell).not.toHaveClass('alive');
});
