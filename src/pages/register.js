import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { Input } from '@/components/Input';
import Link from 'next/link';

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Ім'я користувача обов'язкове"),
  email: Yup.string()
    .email('Неправильний формат')
    .required("Пошта обов'язкова"),
  password: Yup.string().required("Пароль обов'язковий"),
  passwordConfirm: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Паролі мають співпадати'),
});

const opts = { resolver: yupResolver(validationSchema) };

export default function Login({ pb }) {
  const router = useRouter();
  const { register, handleSubmit, setError, formState } = useForm(opts);
  const { errors } = formState;

  useEffect(() => {
    if (pb?.authStore.isValid) router.push('/');
  }, [pb, router]);

  async function onSubmit(data) {
    pb.collection('users')
      .create(data)
      .then(() => {
        pb.collection('users')
          .authWithPassword(data.username, data.password)
          .then(() => {
            document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
            router.push('/');
          });
      })
      .catch((e) => console.log(e));
  }

  return (
    <div className='bg-slate-200 min-h-screen flex items-center justify-center'>
      <Link href='/'>
        <button
          className={`px-14 py-4 text-lg rounded-lg fixed top-8 left-8 bg-blue-500`}
        >
          Назад
        </button>
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4 border-2 border-slate-800 px-40 py-32 h-1/2 rounded-2xl bg-slate-400 shadow-[10px_10px_0_rgba(0,0,0,1)]'
      >
        <Input
          name='username'
          type='text'
          label="Ім'я користувача"
          {...register('username')}
          error={errors.username?.message}
        />
        <Input
          name='email'
          type='text'
          label='Електронна пошта'
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          name='password'
          type='password'
          label='Пароль'
          {...register('password')}
          error={errors.password?.message}
        />
        <Input
          name='passwordConfirm'
          type='password'
          label='Повторіть пароль'
          {...register('passwordConfirm')}
          error={errors.passwordConfirm?.message}
        />
        <input
          type='submit'
          className='bg-green-300 cursor-pointer mt-auto p-4 text-3xl rounded'
          value='Зареєструватись'
        />
      </form>
    </div>
  );
}
