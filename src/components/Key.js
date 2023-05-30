import React from 'react';

function Key({ keycode, word, guesses }) {
  function simulateKeyPress() {
    const event = new KeyboardEvent('keydown', {key: keycode})
    document.dispatchEvent(event);
  }
  return (
    <div onClick={simulateKeyPress} className='cursor-pointer select-none relative p-6 outline-2 bg-slate-100 outline-slate-400 outline'>
      <p className='uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        {keycode}
      </p>
    </div>
  );
}

function WideKey({ size = 8, keycode, word, guesses }) {
  function simulateKeyPress() {
    const event = new KeyboardEvent('keydown', {key: keycode})
    document.dispatchEvent(event);
  }
  return (
    <div onClick={simulateKeyPress}
      className={`cursor-pointer select-none relative py-6 px-${size} outline-2 outline-slate-400 bg-slate-100 outline`}
    >
      <p className='uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        {keycode}
      </p>
    </div>
  );
}

export { Key, WideKey };
