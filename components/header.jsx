import {
  RectangleStackIcon,
  MapIcon,
  BuildingStorefrontIcon,
  BookmarkSquareIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import ProfileOptions from "./profile-options";

import { Suspense } from "react";
import ProfileIconShimmer from "./skeletons/profile-icon-shimmer";
import { righteous } from "@/lib/fonts";
import { getAvatar } from "@/lib/server/actions";
import Image from "next/image";
import logoIcon from '/public/icon-72.png';

export default async function Header() {
  const profilePicture = await getAvatar();
  return (
    <div>
      <header className="flex items-center body-font shadow bg-white px-2">
        <div className="container mx-auto flex py-3 px-2">
          <Link
            href="/"
            className="flex title-font font-medium items-center text-gray-900"
scroll={false}
          >
            <Image src={logoIcon} alt="Berbereen Logo" className="w-10 rounded-full" />
            <span className={`${righteous.className} ml-2 text-2xl text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500`} translate="no">
              Berbereen.
            </span>
          </Link>
        </div>
        <nav className="hidden sm:flex">
          <div className="flex items-center px-4">
            <Link
              href="/"
              className="flex text-base items-center text-gray-900 px-6 py-1 rounded-lg  hover:bg-slate-200 transition-colors duration-300"
scroll={false}
            >
              <span className="sr-only">Feed</span>
              <RectangleStackIcon className="size-7 p-1 text-slate-700" />
              Feed
            </Link>
            <Link
              href="/explore"
              className="flex text-base items-center text-gray-900 px-6 py-1 rounded-lg  hover:bg-slate-200 transition-colors duration-300"
scroll={false}
            >
              <span className="sr-only">Explore</span>
              <MapIcon className="size-7 p-1 text-slate-700" />
              Explore
            </Link>
            <Link
              href="/market"
              className="flex text-base items-center text-gray-900 px-6 py-1 rounded-lg  hover:bg-slate-200 transition-colors duration-300"
scroll={false}
            >
              <span className="sr-only">Market</span>
              <BuildingStorefrontIcon className="size-7 p-1 text-slate-700" />
              Market
            </Link>
            <Link
              href="/saved"
              className="flex text-base items-center text-gray-900 px-6 py-1 rounded-lg  hover:bg-slate-200 transition-colors duration-300"
scroll={false}
            >
              <span className="sr-only">Saved</span>
              <BookmarkSquareIcon className="size-7 p-1 text-slate-700" />
              Saved
            </Link>
            <Link
              href="/settings"
              className="flex text-base items-center text-gray-900 px-6 py-1 rounded-lg  hover:bg-slate-200 transition-colors duration-300"
scroll={false}
            >
              <span className="sr-only">Settings</span>
              <CogIcon className="size-7 p-1 text-slate-700" />
              Settings
            </Link>
          </div>
        </nav>
        <Suspense fallback={<ProfileIconShimmer />}>
          <ProfileOptions profilePicture={profilePicture} />
        </Suspense>
      </header>
    </div>
  );
}
