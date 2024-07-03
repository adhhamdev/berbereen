import { MapIcon } from '@heroicons/react/24/solid';

export const metadata = {
  title: 'Explore',
  description: 'Find anything in Beruwala',
};

export default function Page() {
  return (
    <div>
      <h1 className='flex items-center m-4 text-lg font-bold text-slate-700'>
        <MapIcon className='mr-1 size-6' /> Explore
      </h1>
    </div>
  );
}
