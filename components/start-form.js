'use client';

import { createProfile } from '@/lib/server/actions';
import { getUserLocation } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import logoIcon from '/public/icon-192.png';

const StartForm = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(logoIcon);
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');
  const genders = ['Male', 'Female', 'None'];

  const handleSelect = (gender) => {
    setGender(gender);
    setIsOpen(false);
  };

  useEffect(() => {
    const profilePictureBtn = document.getElementById('profile-picture-btn');
    const profilePictureInput = document.getElementById(
      'profile-picture-input'
    );
    profilePictureBtn.addEventListener('click', () =>
      profilePictureInput.click()
    );
    profilePictureInput.addEventListener('change', (ev) => {
      const file = ev.target.files[0];
      setProfilePicture(URL.createObjectURL(file));
    });
    getUserLocation().then((loc) =>
      setLocation(loc?.city + ', ' + loc?.country)
    );
  }, []);

  return (
    <div>
      <form
        className='gap-5 space-y-4 md:grid md:grid-cols-2'
        action={createProfile}>
        <div className='py-8 mx-auto text-center md:col-span-2'>
          <label
            htmlFor='profilePicture'
            className='block text-sm font-medium text-gray-700'>
            Profile Picture
          </label>
          <div className='flex flex-col items-center'>
            <div></div>
            <Image
              src={profilePicture}
              width={200}
              height={200}
              alt='Profile Picture'
              className='object-cover my-5 rounded-full shadow-2xl size-24'
            />
            <button
              id='profile-picture-btn'
              type='button'
              className='px-4 py-2 font-medium text-white rounded-full bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2'>
              <i className='mr-2 fas fa-camera'></i>
              Edit Picture
            </button>
            <input
              type='file'
              name='profile-picture'
              id='profile-picture-input'
              defaultValue={profilePicture}
              hidden
              aria-hidden='true'
              accept='image/*'
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
            max={100}
            min={12}
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
            name='phone-number'
            type='tel'
            placeholder='+## ### ####'
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
            />
          </div>
        </div>
        <button
          type='submit'
          className='w-full px-4 py-3 text-base font-semibold text-center text-white transition duration-200 ease-in shadow-md md:col-span-2 rounded-3xl bg-slate-800 hover:bg-slate-600 focus:ring-slate-500 focus:ring-offset-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2'>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default StartForm;
