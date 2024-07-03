import { CogIcon } from '@heroicons/react/24/solid';

export const metadata = {
  title: 'Settings',
  description: 'Set your preferences',
};

export default function Page() {
  return (
    <div>
      <h1 className='flex items-center m-4 text-lg font-bold text-slate-700'>
        <CogIcon className='mr-1 size-6' /> Settings
      </h1>
    </div>
  );
}
