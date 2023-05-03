import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faAdd,
  faEdit,
  faDeleteLeft,
} from '@fortawesome/free-solid-svg-icons';

const UserRow = ({ user }) => {
  return (
    <div className='flex '>
      <div className='p-5 grow border-zinc-400 border-b-2 border-r-2 border-solid border-collapse bg-zinc-900 text-center basis-1/4'>
        {user.username}
      </div>
      <div className='p-5 grow border-zinc-400 border-b-2 border-r-2 border-solid border-collapse bg-zinc-600 text-center basis-1/4'>
        {user.email}
      </div>
      <div className='p-5 grow border-zinc-400 border-b-2 border-r-2 border-solid border-collapse bg-zinc-900 text-center basis-1/4'>
        {user.name}
      </div>
      <div className='p-5 flex justify-center border-zinc-400 border-b-2 border-r-2 border-solid border-collapse bg-zinc-800 basis-1/12'>
        <button>
          <FontAwesomeIcon icon={faEdit} className='text-sky-300' size={'2x'} />
        </button>
      </div>
      <div className='p-5 flex justify-center border-zinc-400 border-b-2 border-solid border-collapse bg-zinc-800 basis-1/12'>
        <button>
          <FontAwesomeIcon
            icon={faDeleteLeft}
            className='text-rose-300'
            size={'2x'}
          />
        </button>
      </div>
    </div>
  );
};

export { UserRow };
