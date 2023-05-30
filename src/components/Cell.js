import React from 'react';

function Cell({ value, word, offset, shown, current, hide }) {
  const indexes = [...word.matchAll(new RegExp(value, 'gi'))].map(el => el.index)
  let color;
  if(hide) {
    color = 'red'
  } else if(!shown || value === '') {
    color = 'white'
  } else if(indexes.includes(offset)) {
    color = 'green';
  } else if(indexes.length) {
    color = 'yellow';
  } else {
    color = 'gray'
  }
  return (
    <div
      className={`relative p-8 outline-2 ${current? 'outline-amber-500' : 'outline-slate-400'} outline ${
        color === 'red' ? 'bg-rose-500' : color === 'white'
          ? 'bg-white'
          : color === 'green'
          ? 'bg-green-300'
          : color === 'yellow'
          ? 'bg-yellow-300'
          : color === 'gray'
          ? 'bg-slate-300'
          : ''
      }`}
    >
      <p className='uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        {value}
      </p>
    </div>
  );
}

export { Cell };
