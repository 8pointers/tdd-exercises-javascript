import React, { useState } from 'react';
import classnames from 'classnames';
import './game-of-life.css';

// prettier-ignore
const deltas = Array.from({ length: 9 }, (_, i) => [Math.floor(i / 3) - 1, (i % 3) - 1, i === 4 ? 0 : 1]);
const cellKey = (row, col) => `${row}_${col}`;

const GameOfLife = ({ n, width, height }) => {
  const [isAlive, setIsAlive] = useState({});
  const isCellAlive = (row, col) => isAlive[cellKey(row, col)];
  const toggleCellState = (row, col) =>
    setIsAlive((isAlive) => {
      const key = cellKey(row, col);
      const { [key]: isCellAlive, ...result } = isAlive;
      return isCellAlive ? result : { [key]: [row, col], ...result };
    });
  // prettier-ignore
  const tick = () =>
    setIsAlive(isAlive  => {
      const neighbours = Object.values(isAlive)
        .flatMap(([row, col]) => deltas.map(([r, c, n]) => [cellKey(row + r, col + c), row + r, col + c, n]))
        .reduce((acc, [k, r, c, dn]) => ({ ...acc, [k]: [((acc[k] && acc[k][0]) || 0) + dn, r, c] }), {});
      return Object.entries(neighbours)
        .filter(([k, [n]]) => (isAlive[k] && n === 2) || n === 3)
        .reduce((isAlive, [k, [_, r, c]]) => ({ ...isAlive, [k]: [r, c] }), {});
    });
  return (
    <div style={{ width: n * width, height: n * height }}>
      <div>
        {Array.from({ length: n * n })
          .map((_, i) => ({ row: Math.floor(i / n), column: i % n }))
          .map(({ row, column }, i) => (
            <div
              key={i}
              className={classnames({
                cell: true,
                alive: isCellAlive(row, column),
              })}
              style={{ top: 20 * row, left: 20 * column, width, height }}
              onClick={() => toggleCellState(row, column)}
            />
          ))}
      </div>
      <button onClick={tick}>Tick</button>
    </div>
  );
};

export default GameOfLife;
