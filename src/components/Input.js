import React, { forwardRef } from 'react';

function _Input(props, ref) {
  const { id, label, error, className, ...rest } = props;
  return (
    <div className='flex flex-col'>
      <label className='text-2xl' htmlFor={id}>
        {label}
      </label>
      <input
        className={`border-2 p-2 rounded bg-slate-300 ${
          error ? ' border-red-500' : 'border-slate-500'
        }`}
        id={id}
        ref={ref}
        {...rest}
      />
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
}

const Input = forwardRef(_Input);

export { Input };
