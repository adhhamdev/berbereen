'use client';
import { logOut } from '@/lib/server/actions';
import {
  ArrowLeftStartOnRectangleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Transition from './transition';

export default function ProfileOptions({ avatar }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className='relative' onBlur={() => setIsOpen(false)}>
        <Transition layoutId='profileIcon'>
          <button
            className='flex justify-center mr-2 text-gray-600 rounded-lg shadow-lg itemse-center size-10 hover:text-gray-800'
            onClick={() => setIsOpen((prev) => !prev)}
            title='Account'>
            <Image
              src={avatar || ''}
              width={40}
              height={40}
              className='rounded-lg size-full'
              alt='Avatar Icon'
            />
          </button>
        </Transition>
        <AnimatePresence>
          {isOpen && (
            <Transition
              className='absolute z-20 w-48 bg-white rounded-lg shadow-xl right-2'
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 16, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}>
              <div className='p-2'>
                <Link
                  href='/account'
                  className='flex items-center px-4 py-2 text-base text-gray-700 rounded-lg size-full sm:py-1 hover:bg-gray-100'>
                  <UserCircleIcon className='p-1 size-8 text-slate-900' />
                  Profile
                </Link>
                <button
                  onClick={async () => await logOut()}
                  className='flex items-center px-4 py-2 text-base rounded-lg size-full sm:py-1 text-rose-600 hover:bg-gray-100'>
                  <ArrowLeftStartOnRectangleIcon className='p-1 size-8 text-rose-600' />
                  Log out
                </button>
              </div>
            </Transition>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
