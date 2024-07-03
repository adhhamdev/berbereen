import {
  BookmarkSquareIcon,
  BuildingStorefrontIcon,
  CogIcon,
  MapIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import ProfileOptions from './profile-options';

import { righteous } from '@/lib/fonts';
import { getAvatar } from '@/lib/server/actions';
import Image from 'next/image';
import { Suspense } from 'react';
import ProfileIconShimmer from './skeletons/profile-icon-shimmer';
import logoIcon from '/public/icon-192.png';

export default async function Header() {
  const avatar = await getAvatar(64);
  return (
    <div>
      <header className='flex items-center px-2 bg-white shadow body-font'>
        <div className='container flex px-2 py-3 mx-auto'>
          <Link
            href='/'
            className='flex items-center font-medium text-gray-900 title-font'
            scroll={false}>
            <div className='flex items-center'>
              <Image
                className='w-10 mx-auto rounded-full md:mx-0'
                src={logoIcon}
                alt='Berbereen Logo'
                priority
              />
              <span
                className={`${righteous.className} ml-4 text-2xl text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 md:hidden`}
                translate='no'>
                Berbereen.
              </span>
            </div>
          </Link>
        </div>
        <nav className='hidden sm:flex'>
          <div className='flex items-center px-4'>
            <Link
              href='/'
              className='flex items-center px-6 py-1 text-base text-gray-900 transition-colors duration-300 rounded-lg hover:bg-slate-200'
              scroll={false}>
              <span className='sr-only'>Feed</span>
              <RectangleStackIcon className='p-1 size-7 text-slate-700' />
              Feed
            </Link>
            <Link
              href='/explore'
              className='flex items-center px-6 py-1 text-base text-gray-900 transition-colors duration-300 rounded-lg hover:bg-slate-200'
              scroll={false}>
              <span className='sr-only'>Explore</span>
              <MapIcon className='p-1 size-7 text-slate-700' />
              Explore
            </Link>
            <Link
              href='/market'
              className='flex items-center px-6 py-1 text-base text-gray-900 transition-colors duration-300 rounded-lg hover:bg-slate-200'
              scroll={false}>
              <span className='sr-only'>Market</span>
              <BuildingStorefrontIcon className='p-1 size-7 text-slate-700' />
              Market
            </Link>
            <Link
              href='/saved'
              className='flex items-center px-6 py-1 text-base text-gray-900 transition-colors duration-300 rounded-lg hover:bg-slate-200'
              scroll={false}>
              <span className='sr-only'>Saved</span>
              <BookmarkSquareIcon className='p-1 size-7 text-slate-700' />
              Saved
            </Link>
            <Link
              href='/settings'
              className='flex items-center px-6 py-1 text-base text-gray-900 transition-colors duration-300 rounded-lg hover:bg-slate-200'
              scroll={false}>
              <span className='sr-only'>Settings</span>
              <CogIcon className='p-1 size-7 text-slate-700' />
              Settings
            </Link>
          </div>
        </nav>
        <Suspense fallback={<ProfileIconShimmer />}>
          <ProfileOptions avatar={avatar} />
        </Suspense>
      </header>
    </div>
  );
}
