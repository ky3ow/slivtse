import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { Cell } from './Cell';
import { Keyboard } from './Keyboard';
import { isValidWord, getRandomWord } from '@/randomWord';
const MAX_SCORE = 250;
const SCORE_DECREMENT = 15;
function generateRandomIndecies() {
  const arr = Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => '')
  );
  for (let i = 0; i < 5; i++) {
    const hideIndex1 = Math.floor(Math.random() * 5);
    const hideIndex2 = (hideIndex1 + 1) % 5;
    arr[i][hideIndex1] = 'x';
    arr[i][hideIndex2] = 'x';
  }
  return arr;
}

function getScore(turn, end) {
  if (end === -1) {
    return -MAX_SCORE;
  }
  return MAX_SCORE - SCORE_DECREMENT * (turn - 1);
}

function Game({ pb }) {
  const [grid, setGrid] = useState(
    Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ''))
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [popupVisible, setPopupVisible] = useState();
  const [gameEnd, setGameEnd] = useState(0); // 0 - progress, 1 - win, -1 lose
  const [chosenWord, setChosenWord] = useState(getRandomWord());
  const [difficulty, setDifficulty] = useState(0); // 0 - normal, 1 - hard
  const [randomIndecies, setRandomIndecies] = useState(generateRandomIndecies);
  useEffect(() => console.log(chosenWord), [chosenWord]);

  function triggerPopup(text) {
    setPopupVisible(text);
    setTimeout(() => setPopupVisible(''), 1500);
  }

  function newGame() {
    setChosenWord(getRandomWord());
    setCurrentRow(0);
    setCurrentCol(0);
    setGameEnd(0);
    setGrid(
      Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ''))
    );
    setRandomIndecies(generateRandomIndecies);
  }

  function changeDifficulty() {
    if (currentRow !== 0) return;
    if (difficulty === 1) {
      setDifficulty(0);
    } else {
      setDifficulty(1);
    }
  }

  useEffect(() => {
    async function updateUserWin() {
      const user = await pb
        .collection('users')
        .getOne(pb.authStore.baseModel.id);
      const wins = user.consequtive_wins + 1;
      const data = {
        consequtive_wins: wins,
        score: user.score + getScore(currentRow, 1),
      };
      if (user.consequtive_wins >= user.personal_best)
        data.personal_best = wins;
      pb.collection('users').update(user.id, data);
    }
    async function updateUserLose() {
      const user = await pb
        .collection('users')
        .getOne(pb.authStore.baseModel.id);
      const data = {
        consequtive_wins: 0,
        score: user.score + getScore(currentRow, -1),
      };
      pb.collection('users').update(user.id, data);
    }
    function handleKeyPress(e) {
      if (gameEnd) {
        return;
      }
      const key = e.key;
      if (key === 'Enter') {
        const word = grid[currentRow].join('');
        if (word === chosenWord) {
          if (pb?.authStore?.baseModel) updateUserWin();
          setGameEnd(1);
        }
        if (!isValidWord(word)) {
          triggerPopup('Слова нема в словнику');
        } else {
          setCurrentRow((i) => i + 1);
          setCurrentCol(0);
          if (currentRow === 5) {
            setGameEnd(-1);
            triggerPopup('Загадане слово: ' + chosenWord)
            if (pb?.authStore?.baseModel) updateUserLose();
          }
        }
      } else {
        const newGrid = grid;
        if (key === 'Backspace') {
          grid[currentRow][currentCol - 1] = '';
          setCurrentCol((j) => j - 1);
          return;
        } else if (key.length > 1 || key === ' ' || currentCol >= 5) return;
        newGrid[currentRow][currentCol] = key.toLowerCase();
        setCurrentCol((j) => j + 1);
        setGrid(newGrid);
      }
    }
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentCol, currentRow, grid, gameEnd, chosenWord, pb]);
  return (
    <div className='flex flex-col p-16  items-center flex-grow'>
      <div
        className={`absolute top-24 text-3xl transition-all duration-250 ${
          popupVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {popupVisible}
      </div>
      <div className='flex relative'>
        <h1
          onClick={changeDifficulty}
          className={`text-3xl group peer font-bold mb-4 cursor-pointer`}
        >
          <FontAwesomeIcon
            icon={faFire}
            className={`px-1 ${
              difficulty === 1
                ? 'group-hover:text-orange-500 text-rose-600'
                : 'group-hover:text-rose-600 text-orange-500'
            } `}
          />
          Слівце
        </h1>
        {!!gameEnd && (
          <span
            className={`px-1 text-xl font-bold ${
              gameEnd === 1 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {getScore(currentRow, gameEnd)}
          </span>
        )}
      </div>
      <div className='flex flex-col gap-4'>
        {grid.map((row, i) => {
          return (
            <div key={i} className='flex gap-4'>
              {row.map((cell, j) => (
                <Cell
                  key={i * 6 + j}
                  word={chosenWord}
                  offset={j}
                  value={cell}
                  shown={currentRow > i}
                  current={i === currentRow}
                  hide={difficulty === 1 && randomIndecies[i][j] === 'x'}
                />
              ))}
            </div>
          );
        })}
      </div>
      <button
        onClick={newGame}
        className={`mt-8 px-8 py-2 text-lg rounded-lg bg-green-300 ${
          gameEnd ? 'block' : 'hidden'
        }`}
      >
        Нове слово
      </button>
      <Keyboard grid={grid} word={chosenWord} />
    </div>
  );
}

export { Game };
