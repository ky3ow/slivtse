import React from 'react';

const Input = (props) => {
  const { id, label, ...rest } = props;
  return (
    <div className='flex flex-col'>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...rest} />
    </div>
  );
};

export { Input };
