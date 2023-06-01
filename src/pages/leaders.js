import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function Login({ pb }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (pb) {
pb.collection('users')
  .getFullList({ sort: '+score' })
  .then((data) => {
    const allUsers = data;
    const currUser = data.find(
      (el) => el.id === pb.authStore.baseModel?.id
    );
    setUsers(allUsers.slice(0, 5));
    setCurrentUser(currUser);
  }).catch(e => console.log(e));
        
    }
  }, [pb]);
  return (
  <div className='bg-slate-200 min-h-screen flex flex-col items-center justify-center'>
      <Head>
        <title>Лідери</title>
        <meta property='og:title' content="Лідери" key='title' />
      </Head>
    <Link href='/'>
      <button
        className={`px-14 py-4 text-lg rounded-lg fixed top-8 right-8 bg-blue-500`}
      >
        Назад
      </button>
    </Link>
    <h1 className=' mb-36 text-3xl font-bold'>Список лідерів</h1>
    <div className='w-1/2'>
      <div className='flex bg-amber-300 p-4 justify-between'>
        <p className='basis-1/3 text-center text-xl'>Користувач</p>
        <p className='basis-1/3 text-center text-xl'>Найкраща серія</p>
        <p className='basis-1/3 text-center text-xl'>Рахунок</p>
      </div>
      {users.map((usr, i) => (
        <div
          key={usr.id}
          className={`flex p-4 ${
            i % 2 === 0 ? 'bg-red-100' : 'bg-red-300'
          }  justify-between`}
        >
          <p className='basis-1/3 text-center text-xl'>{usr.username}</p>
          <p className='basis-1/3 text-center text-xl'>{usr.personal_best}</p>
          <p className='basis-1/3 text-center text-xl'>{usr.score}</p>
        </div>
      ))}
      {currentUser && (
        <div
          key={currentUser.id}
          className={`flex p-4 bg-sky-300 mt-8 justify-between relative`}
        >
          <p className='basis-1/3 text-center text-xl'>
            {currentUser.username}
          </p>
          <p className='basis-1/3 text-center text-xl'>
            {currentUser.personal_best}
          </p>
          <p className='basis-1/3 text-center text-xl'>{currentUser.score}</p>
          <p className='absolute left-2 text-xl'>Ви</p>
        </div>
      )}
    </div>
  </div>
  );
}
