import React from 'react';

function Cell({ value, word, offset }) {
  return (
    <div className='relative p-8 outline-2 outline-slate-400 outline'>
      <p className='uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        {value}
      </p>
    </div>
  );
}

export { Cell };
