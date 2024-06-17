import BackNavBtn from '@/components/back-nav-btn';
import { deleteCurrentUser, getAvatar } from '@/lib/server/actions';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Transition from '../../components/transition';

export const metadata = {
  title: 'Profile',
  description: 'User Profile',
};

export default async function Page() {
  const user = await getLoggedInUser();
  const avatar = await getAvatar(512);
  const followersBrief = [
    'https://randomuser.me/api/portraits/women/21.jpg',
    'https://randomuser.me/api/portraits/women/22.jpg',
    'https://randomuser.me/api/portraits/women/23.jpg',
    'https://randomuser.me/api/portraits/women/24.jpg',
    'https://randomuser.me/api/portraits/women/25.jpg',
    'https://randomuser.me/api/portraits/women/26.jpg',
  ];

  return (
    <div>
      <header className='flex items-center justify-between border-b lg:px-4'>
        <div className='flex items-center'>
          <BackNavBtn text='Profile' />
        </div>
      </header>

      <div className='max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg'>
        <div className='px-4 py-6 border-b'>
          <div className='object-cover w-full h-44 bg-slate-600 rounded-xl'></div>
          {/* <Image
            src=""
            width={100}
            height={100}
            alt="Profile Cover"
            className="object-cover w-full h-44 rounded-xl"
          /> */}
          <div className='relative my-4 -mt-20 text-center'>
            <Transition layoutId='profileIcon'>
              <Image
                className='mx-auto my-4 bg-white border-8 border-white rounded-full size-32'
                src={avatar || ''}
                alt='Avatar'
                width={40}
                height={40}
              />
            </Transition>
            <div className='py-2'>
              <h3 className='mb-1 text-2xl font-bold text-gray-800 dark:text-white'>
                {user?.name}
              </h3>
              <div className='inline-flex items-center text-gray-700 dark:text-gray-300'>
                <EnvelopeIcon className='mr-2 size-4' />
                {user?.email}
              </div>
            </div>
          </div>
          <div className='flex gap-2 px-2'>
            <button className='flex-1 px-4 py-2 antialiased font-bold text-white bg-blue-600 rounded-full dark:bg-blue-800 dark:text-white hover:bg-blue-800 dark:hover:bg-blue-900'>
              Edit
            </button>
            <form action={deleteCurrentUser}>
              <button className='flex-1 px-4 py-2 font-semibold text-black border-2 border-gray-400 rounded-full dark:border-gray-700 dark:text-white'>
                Delete Account
              </button>
            </form>
          </div>
        </div>
        <div className='px-4 py-4'>
          <div className='flex items-center gap-2 mb-4 text-gray-800 dark:text-gray-300'>
            <svg
              className='w-6 h-6 text-gray-600 dark:text-gray-400'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='24'
              height='24'>
              <path
                className=''
                d='M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z'
              />
            </svg>
            <span>
              <strong className='text-black dark:text-white'>12</strong>{' '}
              Followers you know
            </span>
          </div>
          <div className='flex'>
            <div className='flex justify-end mr-2'>
              {followersBrief.map((follower, index) => {
                return (
                  <Image
                    className='w-10 h-10 -mr-2 border-2 border-white rounded-full dark:border-gray-800'
                    src={follower}
                    alt=''
                    width={40}
                    height={40}
                    key={index}
                  />
                );
              })}
              <span className='flex items-center justify-center w-10 h-10 text-sm font-semibold text-gray-800 bg-white border-2 border-gray-200 rounded-full dark:bg-gray-800 dark:text-white dark:border-gray-700'>
                +12
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
