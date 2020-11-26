import React from 'react';
import { render } from 'react-dom';
import GameOfLife from './game-of-life';

render(
  <GameOfLife n={10} width={20} height={20} />,
  document.getElementById('root-ex-1')
);
