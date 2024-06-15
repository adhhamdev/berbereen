'use client';

import { createProfile } from '@/lib/server/actions';
import { getUserLocation } from '@/lib/utils';
import { useEffect } from 'react';
import { useState } from 'react';

const StartForm = ({ user }) => {
  const [location, setLocation] = useState({});
  useEffect(() => {
    getUserLocation().then((loc) => setLocation(loc));
  }, []);
  return (
    <div>
      <form className='space-y-4' action={createProfile}>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'>
            Name
          </label>
          <input
            id='name'
            name='name'
            type='text'
            placeholder='Enter your name'
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent'
            minLength={5}
            required
            autoComplete='name'
            enterKeyHint='next'
            defaultValue={user?.name}
          />
        </div>
        <div>
          <label
            htmlFor='username'
            className='block text-sm font-medium text-gray-700'>
            Username (ID)
          </label>
          <input
            id='username'
            name='username'
            type='text'
            placeholder='Enter a unique username'
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent'
            minLength={5}
            required
            autoComplete='additional-name'
            enterKeyHint='done'
          />
        </div>
        <div>
          <label
            htmlFor='username'
            className='block text-sm font-medium text-gray-700'>
            Location
          </label>
          <input
            id='location'
            name='location'
            type='text'
            placeholder='Enter your location'
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent'
            minLength={5}
            required
            autoComplete='street-address'
            enterKeyHint='done'
            defaultValue={
              (location?.city || '---') + ', ' + (location?.country || '---')
            }
          />
        </div>
        <button
          type='submit'
          className='w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in shadow-md rounded-3xl bg-slate-800 hover:bg-slate-600 focus:ring-slate-500 focus:ring-offset-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2'>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default StartForm;
