'use client';

import { signInWithEmail } from '@/lib/server/actions';

const LoginForm = () => {
  return (
    <div>
      <form className='space-y-4' action={signInWithEmail}>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='Enter your email'
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent'
            autoFocus
            autoComplete='email'
            required
          />
        </div>
        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'>
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            placeholder='Enter your password'
            minLength={8}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent'
            autoComplete='current-password'
            required
          />
        </div>
        <button
          type='submit'
          className='w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in rounded-lg shadow-md bg-slate-800 hover:bg-slate-600 focus:ring-slate-500 focus:ring-offset-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2'>
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
