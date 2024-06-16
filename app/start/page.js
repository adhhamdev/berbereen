import StartForm from '@/components/start-form';
import { getLoggedInUser } from '@/lib/server/appwrite';
import Image from 'next/image';
import logoIcon from '/public/icon-192.png';

export const metadata = {
  title: 'Get Started',
  description: 'Create your profile',
};

const page = async () => {
  const user = await getLoggedInUser();

  return (
    <div className='flex flex-col items-center justify-center h-screen md:flex-row'>
      <div className='text-center md:py-20 md:h-full md:w-1/2 md:px-20 md:from-slate-800 md:to-slate-800 md:bg-gradient-to-t md:text-left md:flex md:flex-col md:justify-between md:rounded-r-lg'>
        <div className='items-center hidden md:flex'>
          <Image
            className='w-20 rounded-full'
            src={logoIcon}
            alt='Berbereen Logo'
            priority
          />
        </div>
        <div>
          <h1 className='mb-0 text-3xl font-bold md:mb-2 md:text-white'>
            Create Your Profile
          </h1>
          <h3 className='mb-4 font-semibold text-gray-500 md:text-white'>
            Complete your profile to move on.
          </h3>
        </div>
      </div>
      <div className='w-full md:w-1/2'>
        <div className='max-w-md p-8 mx-auto'>
          <StartForm user={user} />
        </div>
      </div>
    </div>
  );
};

export default page;
