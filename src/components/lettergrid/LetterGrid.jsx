import React, { useEffect, useState } from 'react';
import './LetterGrid.css';

const alphabet = '1010100101010101010100101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const getRandomLetter = () => alphabet[Math.floor(Math.random() * alphabet.length)];

const generateInitialGrid = (rows, cols) => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(getRandomLetter());
    }
    grid.push(row);
  }
  return grid;
};

const LetterGrid = ({ rows, cols, interval }) => {
  const [grid, setGrid] = useState(generateInitialGrid(rows, cols));

  useEffect(() => {
    const changeRandomLetter = () => {
      const newGrid = [...grid];
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      newGrid[row][col] = getRandomLetter();
      setGrid(newGrid);

      const cell = document.getElementById(`cell-${row}-${col}`);
      if (cell) {
        cell.classList.add('flash');
        setTimeout(() => {
          cell.classList.remove('flash');
        }, 300);
      }
    };

    const intervalId = setInterval(changeRandomLetter, interval);
    return () => clearInterval(intervalId);
  }, [grid, rows, cols, interval]);

  return (
    <div className="letter-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="letter-row">
          {row.map((letter, colIndex) => (
            <span
              key={colIndex}
              id={`cell-${rowIndex}-${colIndex}`}
              className="letter-cell"
            >
              {letter}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LetterGrid;
