import {
  HomeIcon,
  MapIcon,
  BuildingStorefrontIcon,
  BookmarkSquareIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import ProfileOptions from "./profile-options";

import { Suspense } from "react";
import ProfileIconShimmer from "./skeletons/profile-icon-shimmer";

export default function Header() {
  return (
    <div>
      <header className="flex items-center body-font">
        <div className="container mx-auto flex p-4">
          <Link
            href="/"
            className="flex title-font font-medium items-center text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl" translate="no">
              Berbereen
            </span>
          </Link>
        </div>
        <nav className="hidden sm:flex">
          <div className="flex items-center px-4">
            <Link
              href="/"
              className="flex text-base items-center text-gray-900 px-6 py-1 rounded-lg  hover:bg-slate-200 transition-colors duration-300"
            >
              <span className="sr-only">Home</span>
              <HomeIcon className="size-7 p-1 text-slate-700" />
              Home
            </Link>
            <Link
              href="/explore"
              className="flex text-base items-center text-gray-900 px-6 py-1 rounded-lg  hover:bg-slate-200 transition-colors duration-300"
            >
              <span className="sr-only">Explore</span>
              <MapIcon className="size-7 p-1 text-slate-700" />
              Explore
            </Link>
            <Link
              href="/market"
              className="flex text-base items-center text-gray-900 px-6 py-1 rounded-lg  hover:bg-slate-200 transition-colors duration-300"
            >
              <span className="sr-only">Market</span>
              <BuildingStorefrontIcon className="size-7 p-1 text-slate-700" />
              Market
            </Link>
            <Link
              href="/saved"
              className="flex text-base items-center text-gray-900 px-6 py-1 rounded-lg  hover:bg-slate-200 transition-colors duration-300"
            >
              <span className="sr-only">Saved</span>
              <BookmarkSquareIcon className="size-7 p-1 text-slate-700" />
              Saved
            </Link>
            <Link
              href="/settings"
              className="flex text-base items-center text-gray-900 px-6 py-1 rounded-lg  hover:bg-slate-200 transition-colors duration-300"
            >
              <span className="sr-only">Settings</span>
              <CogIcon className="size-7 p-1 text-slate-700" />
              Settings
            </Link>
          </div>
        </nav>
        <Suspense fallback={<ProfileIconShimmer />}>
          <ProfileOptions />
        </Suspense>
      </header>
    </div>
  );
}
