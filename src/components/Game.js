import React, { useEffect, useState } from 'react';
import { Cell } from './Cell';

function Game() {
  const [grid, setGrid] = useState(
    Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ''))
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const chosenWord = 'abcde';

  useEffect(() => {
    function handleKeyPress(e) {
      const key = e.key;
      console.log(key);
      console.log(currentCol, currentRow);
      if (key === 'Enter') {
        setCurrentRow((i) => i + 1);
      } else {
        const newGrid = grid;
        if (key === 'Backspace') {
          grid[currentRow][currentCol - 1] = '';
          setCurrentCol((j) => j - 1);
          return;
        } else if (key.length > 1 || key === ' ' || currentCol >= 5) return;
        newGrid[currentRow][currentCol] = key;
        setCurrentCol((j) => j + 1);
        setGrid(newGrid);
      }
    }
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentCol, currentRow, grid]);
  return (
    <div className='flex flex-col p-16  items-center flex-grow'>
      <h1 className='text-3xl font-bold mb-4'>Слівце</h1>
      <div className='flex flex-col gap-4'>
        {grid.map((row, i) => (
          <div key={i} className='flex gap-4'>
            {row.map((cell, j) => (
              <Cell key={i * 6 + j} word={chosenWord} offset={j} value={cell} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export { Game };
