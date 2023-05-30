import React from 'react';
import { Key, WideKey } from './Key';

function Keyboard({ grid, word }) {
  return (
    <div className='flex flex-col items-center mt-12'>
      <div className='flex gap-2 mb-2'>
        {'йцукенгшщзхї'.split('').map((letter) => (
          <Key keycode={letter} key={letter} guesses={grid} word={word} />
        ))}
      </div>
      <div className='flex gap-2 mb-2'>
        {'фівапролджє'.split('').map((letter) => (
          <Key keycode={letter} key={letter} guesses={grid} word={word} />
        ))}
      </div>
      <div className='flex gap-2 mb-2'>
        {'ячсмитьбю'.split('').map((letter) => (
          <Key keycode={letter} key={letter} guesses={grid} word={word} />
        ))}
      </div>
      <div className='flex gap-2'>
        <WideKey keycode='Backspace' size={14} guesses={grid} word={word} />
        <WideKey keycode='Enter' guesses={grid} word={word} />
      </div>
    </div>
  );
}

export { Keyboard };
