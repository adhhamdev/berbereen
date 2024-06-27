import StartForm from '@/components/start-form';
import { getAvatar, setAvatar } from '@/lib/server/actions';
import { getLoggedInUser } from '@/lib/server/appwrite';
import Image from 'next/image';
import logoIcon from '/public/icon-192.png';

export const metadata = {
  title: 'Get Started',
  description: 'Create your profile',
};

const page = async () => {
  const user = await getLoggedInUser();
  await setAvatar(user);
  const avatarUrl = await getAvatar(512);
  console.log(avatarUrl);

  return (
    <div className='flex flex-col items-center justify-center py-10 md:py-0 md:flex-row'>
      <div className='text-center md:py-12 md:h-screen md:w-1/2 md:px-20 md:from-slate-800 md:to-slate-800 md:bg-gradient-to-t md:text-left md:flex md:flex-col md:justify-between md:rounded-r-lg'>
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
      <div className='w-full md:h-screen md:flex md:items-center md:w-1/2'>
        <div className='max-w-md p-8 mx-auto md:max-w-xl'>
          <StartForm user={user} defaultAvatar={avatarUrl} />
        </div>
      </div>
    </div>
  );
};

export default page;
