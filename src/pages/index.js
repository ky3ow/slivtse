import { useEffect, useState } from 'react';

import { Input } from '@/components/Input';
import { useRouter } from 'next/router';
import { Game } from '@/components/Game';
import Link from 'next/link';

export default function Home({ pb }) {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [leadersVisible, setLeadersVisible] = useState(false);

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
    <div className='bg-slate-200 flex flex-col min-h-screen p-8'>
      <div className='flex justify-between'>
        <button
          onClick={handleLogin}
          className={`px-16 py-4 text-lg rounded-lg ${
            loggedIn ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          {loggedIn ? 'Вийти' : 'Логін'}
        </button>
        <Link href='leaders'>
          <button className={`px-8 py-4 text-lg rounded-lg bg-amber-300`}>
            Таблиця лідерів
          </button>
        </Link>
      </div>
      <Game pb={pb} />
    </div>
  );
}
