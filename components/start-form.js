'use client';

import { createProfile } from '@/lib/server/actions';
import { getUserLocation } from '@/lib/utils';
import { useEffect } from 'react';
import { useState } from 'react';

const StartForm = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: '',
    phoneNumber: '',
    location: '',
    gender: "",
    age: "",
    profilePicture: "",
    coverPhoto: "",
  })

  const genders = ["Male", "Female", "None", ]

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (gender) => {
    setFormData(prev => ({ ...prev, gender }));
    setIsOpen(false);
  };

  useEffect(() => {
    getUserLocation().then((loc) => setFormData(prev => ({ ...prev, location: (loc?.city || '---') + ', ' + (loc?.country || '---') })));
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
            onChange={ev => setFormData(prev => ({ ...prev, name: ev.target.value }))}
            value={formData.name}
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
            onChange={ev => setFormData(prev => ({ ...prev, email: ev.target.value }))}
            value={formData.email}
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
            onChange={ev => setFormData(prev => ({ ...prev, location: ev.target.value }))}
            value={formData.location}
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
            inputMode="numeric"
            placeholder='Enter your age'
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent'
            maxLength={5}
            required
            enterKeyHint='done'
            onChange={ev => setFormData(prev => ({ ...prev, age: ev.target.value }))}
            value={formData.age}
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
            placeholder='###-###-####'
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent'
            minLength={12}
            maxLength={12}
            required
            autoComplete="mobile tel"
            enterKeyHint="next"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            onChange={ev => setFormData(prev => ({ ...prev, phoneNumber: ev.target.value }))}
            value={formData.phoneNumber}
          />
        </div>
        <div>
          <label
            htmlFor='gender'
            className='block text-sm font-medium text-gray-700'>
            Gender
          </label>
          <div className="relative">
            <button
              id='gender'
              type="button"
              className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-500"
              onClick={() => setIsOpen(prev => !prev)}
            >
              {formData.gender ? (
                <span>{formData.gender}</span>
              ) : (
                <span>Select Gender</span>
              )}
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isOpen && (
              <div
                className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md"
                role="listbox"
              >
                {genders.map((gender) => (
                  <button

                    key={gender}
                    className="block w-full px-4 py-2 text-sm font-medium text-left text-gray-700 hover:bg-gray-100"
                    role="radio"
                    aria-checked="false"
                    onClick={() => handleSelect(gender)}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            )}
          </div>
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
