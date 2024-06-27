'use client';

import { createProfile } from '@/lib/server/actions';
import { getUserLocation } from '@/lib/utils';
import { CameraIcon, TrashIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const StartForm = ({ user, defaultAvatar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarIcon, setAvatarIcon] = useState(defaultAvatar);
  const [avatarSelected, setAvatarSelected] = useState(false);
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');
  const genders = ['Male', 'Female', 'None'];

  const handleSelect = (gender) => {
    setGender(gender);
    setIsOpen(false);
  };

  const resetAvatar = () => {
    setAvatarIcon(defaultAvatar);
    setAvatarSelected(false);
  };

  useEffect(() => {
    const avatarBtn = document.getElementById('avatar-btn');
    const avatarInput = document.getElementById('avatar-input');
    avatarBtn.addEventListener('click', () => avatarInput.click());
    avatarInput.addEventListener('change', (ev) => {
      const file = ev.target.files[0];
      setAvatarIcon(URL.createObjectURL(file));
      setAvatarSelected(true);
    });
    getUserLocation().then((loc) =>
      setLocation(
        loc?.city
          ? loc?.country
            ? `${loc.city}, ${loc.country}`
            : loc.city
          : loc?.country
          ? loc.country
          : ''
      )
    );
  }, []);

  return (
    <div>
      <form
        className='gap-5 space-y-4 md:space-y-0 md:grid md:grid-cols-2'
        action={createProfile}>
        <div className='py-8 mx-auto text-center md:col-span-2'>
          <label
            htmlFor='avatar'
            className='block text-sm font-medium text-gray-700'>
            Profile Picture
          </label>
          <div className='flex flex-col items-center'>
            <div className='flex items-center'>
              <div className='relative'>
                <Image
                  src={avatarIcon}
                  width={200}
                  height={200}
                  alt='Avatar'
                  className='object-cover my-5 rounded-full shadow-md size-24'
                />
                <button
                  id='avatar-btn'
                  type='button'
                  className='absolute bottom-0 right-0 flex items-center justify-center p-3 rounded-full shadow-lg bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2'>
                  <CameraIcon className='w-5 h-5 text-white' />
                </button>
              </div>
              {avatarSelected && (
                <button
                  type='button'
                  className='p-3 ml-3 text-sm border rounded-full focus:outline-none'
                  onClick={resetAvatar}>
                  <TrashIcon className='w-5 h-5 text-red-500' />
                </button>
              )}
            </div>
            <input
              name='avatarSelected'
              defaultValue={avatarSelected}
              hidden
              aria-hidden='true'
            />
            <input
              type='file'
              name='avatar'
              id='avatar-input'
              hidden
              aria-hidden='true'
              accept='image/png, image/jpeg, image/jpg'
              defaultValue={avatarIcon}
            />
          </div>
        </div>
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
            maxLength={32}
            required
            autoComplete='name'
            autoFocus
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
            maxLength={32}
            required
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
            defaultValue={location}
          />
        </div>
        <div>
          <label
            htmlFor='age'
            className='block text-sm font-medium text-gray-700'>
            Age
          </label>
          <input
            id='age'
            name='age'
            type='number'
            placeholder='Enter your age'
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent'
            min={12}
            max={100}
            required
            enterKeyHint='next'
          />
        </div>
        <div>
          <label
            htmlFor='phone-number'
            className='block text-sm font-medium text-gray-700'>
            Phone Number
          </label>
          <input
            id='phone-number'
            name='phoneNumber'
            type='tel'
            placeholder='+## ### #### / 0## ### ####'
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent'
            required
            maxLength={12}
            autoComplete='mobile tel'
            enterKeyHint='next'
            pattern='((\+94)|0)?[0-9]{9}'
          />
        </div>
        <div>
          <label
            htmlFor='gender'
            className='block text-sm font-medium text-gray-700'>
            Gender
          </label>
          <div className='relative'>
            <button
              type='button'
              className='flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-500'
              onClick={() => setIsOpen((prev) => !prev)}>
              {gender ? <span>{gender}</span> : <span>Select Gender</span>}
              <svg
                className='w-4 h-4 ml-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </button>
            {isOpen && (
              <div
                className='absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md'
                role='listbox'>
                {genders.map((gender) => (
                  <button
                    key={gender}
                    className='block w-full px-4 py-2 text-sm font-medium text-left text-gray-700 hover:bg-gray-100'
                    role='radio'
                    aria-checked='false'
                    onClick={() => handleSelect(gender)}>
                    {gender}
                  </button>
                ))}
              </div>
            )}
            <input
              name='gender'
              id='gender'
              defaultValue={gender}
              hidden
              aria-hidden='true'
              required
              onInvalid={() => alert('Please select a Gender!')}
            />
          </div>
        </div>
        <button
          type='submit'
          className='w-full px-4 py-3 text-base font-semibold text-center text-white transition duration-200 ease-in shadow-md md:col-span-2 rounded-3xl bg-slate-800 hover:bg-slate-600 focus:ring-slate-500 focus:ring-offset-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2'>
          Complete
        </button>
      </form>
    </div>
  );
};

export default StartForm;
