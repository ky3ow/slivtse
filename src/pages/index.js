import { UserRow } from '@/components/UserRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faAdd, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@/components/Input';

export default function Home() {
  const users = [
    { username: 'користувач1', email: 'пошта1', name: "ім'я1" },
    { username: 'користувач2', email: 'пошта2', name: "ім'я2" },
    { username: 'користувач3', email: 'пошта3', name: "ім'я3" },
    { username: 'користувач4', email: 'пошта4', name: "ім'я4" },
    { username: 'користувач5', email: 'пошта5', name: "ім'я5" },
    { username: 'користувач6', email: 'пошта6', name: "ім'я6" },
    { username: 'користувач7', email: 'пошта7', name: "ім'я7" },
    { username: 'користувач8', email: 'пошта8', name: "ім'я8" },
    { username: 'користувач9', email: 'пошта9', name: "ім'я9" },
    { username: 'користувач10', email: 'пошта10', name: "ім'я10" },
    { username: 'користувач11', email: 'пошта11', name: "ім'я11" },
    { username: 'користувач12', email: 'пошта12', name: "ім'я12" },
  ];
  return (
    <>
      <main className={`flex min-h-screen p-24`}>
        <div className='grow border-zinc-400 border-solid border-2'>
          <div className='flex'>
            <div className='p-5 grow border-zinc-400 border-b-2 border-r-2 border-solid border-collapse bg-zinc-800 text-center basis-1/4'>
              Ім&apos;я користувача
            </div>
            <div className='p-5 grow border-zinc-400 border-b-2 border-r-2 border-solid border-collapse bg-zinc-800 text-center basis-1/4'>
              Пошта
            </div>
            <div className='p-5 grow border-zinc-400 border-b-2 border-r-2 border-solid border-collapse bg-zinc-800 text-center basis-1/4'>
              Повне Ім&apos;я
            </div>
            <div className='p-5 border-zinc-400 border-b-2 border-r-2 border-solid border-collapse bg-sky-800 text-center basis-1/12'></div>
            <div className='p-5 border-zinc-400 border-b-2 border-solid border-collapse bg-rose-950 text-center basis-1/12'></div>
          </div>
          {users.map((user) => (
            <UserRow user={user} key={user.username} />
          ))}
        </div>
      </main>
      <div className='fixed top-0 bottom-0 w-1/3 bg-zinc-900'>
        <Input label='hello' type='text' />
      </div>
      <button className='fixed bottom-16 right-8 bg-white rounded-full p-8 text-black hover:bg-black hover:text-white border-solid border-white border-2'>
        <FontAwesomeIcon icon={faAdd} size={'2x'} />
      </button>
    </>
  );
}
