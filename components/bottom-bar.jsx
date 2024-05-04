"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  HomeIcon,
  MapIcon,
  BuildingStorefrontIcon,
  BookmarkSquareIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as SolidHomeIcon,
  MapIcon as SolidMapIcon,
  BuildingStorefrontIcon as SolidBuildingStorefrontIcon,
  BookmarkSquareIcon as SolidBookmarkSquareIcon,
  CogIcon as SolidCogIcon,
} from "@heroicons/react/24/solid";

export default function BottomBar() {
  const pathname = usePathname();
  return (
    <div className="fixed inset-x-0 bottom-0 bg-white shadow sm:hidden">
      <div className="flex justify-around py-1">
        <Link
          href="/"
          className=" hover:text-gray-500 h-12 flex-grow flex justify-center items-center"
        >
          <span className="sr-only">Home</span>
          {pathname === "/" ? <SolidHomeIcon className="size-10 p-1 text-slate-900" /> : <HomeIcon className="size-10 p-1 text-slate-700" />}
        </Link>
        <Link
          href="/explore"
          className=" hover:text-gray-500 h-12 flex-grow flex justify-center items-center"
        >
          <span className="sr-only">Explore</span>
          {pathname === "/explore" ? <SolidMapIcon className="size-10 p-1 text-slate-900" /> : <MapIcon className="size-10 p-1 text-slate-700" />}        </Link>
        <Link
          href="/market"
          className=" hover:text-gray-500 h-12 flex-grow flex justify-center items-center"
        >
          <span className="sr-only">Market</span>
          {pathname === "/market" ? <SolidBuildingStorefrontIcon className="size-10 p-1 text-slate-900" /> : <BuildingStorefrontIcon className="size-10 p-1 text-slate-700" />}        </Link>
        <Link
          href="/saved"
          className=" hover:text-gray-500 h-12 flex-grow flex justify-center items-center"
        >
          <span className="sr-only">Saved</span>
          {pathname === "/saved" ? <SolidBookmarkSquareIcon className="size-10 p-1 text-slate-900" /> : <BookmarkSquareIcon className="size-10 p-1 text-slate-700" />}        </Link>
        <Link
          href="settings"
          className=" hover:text-gray-500 h-12 flex-grow flex justify-center items-center"
        >
          <span className="sr-only">Settings</span>
          {pathname === "/settings" ? <SolidCogIcon className="size-10 p-1 text-slate-900" /> : <CogIcon className="size-10 p-1 text-slate-700" />}        </Link>
      </div>
    </div>
  );
}
