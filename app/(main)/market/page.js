import { BuildingStorefrontIcon } from '@heroicons/react/24/solid';

export const metadata = {
  title: 'Market',
  description: 'Sell & Buy Goods',
};

export default function Page() {
  return (
    <div>
      <h1 className='flex items-center m-4 text-lg font-bold text-slate-700'>
        <BuildingStorefrontIcon className='mr-1 size-6' /> Market
      </h1>
    </div>
  );
}
