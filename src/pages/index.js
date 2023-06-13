import { useEffect, useState } from 'react';

import { Input } from '@/components/Input';
import { useRouter } from 'next/router';
import { Game } from '@/components/Game';
import Link from 'next/link';
import Head from 'next/head';

export default function Home({ pb }) {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  // const [a,b] = [1,2]
  // a - 1, b - 2
  const [tutorialVisible, setTutorialVisible] = useState(false);

function handleLogin(e) {
  if (loggedIn) {
    pb.authStore.clear();
    document.cookie = 'pb_auth= ; expires=Thu,18 Dec 2013 12:00:00 UTC';
    setLoggedIn(false);
  } else {
    router.push('login');
  }
}

  useEffect(() => {
    setLoggedIn(pb?.authStore.isValid);
  }, [pb?.authStore.isValid]);

  return (
    <div className='bg-slate-200 relative flex flex-col min-h-screen p-8'>
      <Head>
        <title>Слівце</title>
        <meta property='og:title' content="Слівце" key='title' />
      </Head>
      {tutorialVisible && (
        <div
          onClick={() => setTutorialVisible(false)}
          className='flex absolute items-center justify-center inset-0 bg-black/50 z-10'
        >
          <div className='flex flex-col bg-slate-100 p-8 w-1/2 h-1/2'>
            <h3 className='text-center text-3xl mb-4'>
              Правила гри <strong>Слівце</strong>
            </h3>
            <ol className='text-lg list-decimal'>
              <li>
                Гравець вводить свої варіанти слів в гральне поле та натискає{' '}
                <strong>Enter</strong> для відгадки слова
              </li>
              <li>
                Після кожної спроби гравець отримує підказку у вигляді різних
                кольорових позначень, які вказують на правильне або неправильне
                розташування літер у слові.
                <ul className='pl-4 list-disc'>
                  <li>
                    Зелений колір означає, що літера вгадана та знаходиться на
                    своєму місці в слові.
                  </li>
                  <li>
                    Жовтий колір означає, що літера вгадана, але знаходиться на
                    неправильному місці в слові.
                  </li>
                  <li>Сірий колір означає, що літера не входить до слова.</li>
                </ul>
              </li>
              <li>
                Гра Продовжується поки гравець не відгадає слово або не
                закінчаться спроби
              </li>
              <li>
                Якщо напочатку гри натиснути на назву гри{' '}
                <strong>Слівце</strong>, тоді активується ускладнена версія гри,
                в якій кожна спроба буде мати дві заблоковані(позначені
                червоним) клітинки, які приховують інші кольорові підказки
              </li>
            </ol>
          </div>
        </div>
      )}
      <div className='flex justify-between'>
        <button
          onClick={handleLogin}
          className={`px-16 py-4 text-lg rounded-lg ${
            loggedIn ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          {loggedIn ? 'Вийти' : 'Логін'}
        </button>
        <div className='flex gap-2'>
          <button
            onClick={() => setTutorialVisible(true)}
            className={`px-6 py-4 text-lg rounded-lg bg-cyan-400 font-bold`}
          >
            ?
          </button>
          <Link href='leaders'>
            <button className={`px-8 py-4 text-lg rounded-lg bg-amber-300`}>
              Таблиця лідерів
            </button>
          </Link>
        </div>
      </div>
      <Game pb={pb} />
    </div>
  );
}
