"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BookmarkSquareIcon,
  BuildingStorefrontIcon,
  CogIcon,
  MapIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import {
  BookmarkSquareIcon as SolidBookmarkSquareIcon,
  BuildingStorefrontIcon as SolidBuildingStorefrontIcon,
  CogIcon as SolidCogIcon,
  MapIcon as SolidMapIcon,
  RectangleStackIcon as SolidRectangleStackIcon,
} from "@heroicons/react/24/solid";

export default function BottomBar() {
  const pathname = usePathname();
  return (
    <div className="fixed inset-x-0 bottom-0 bg-white border-t-2 shadow sm:hidden border-slate-200">
      <div className="flex justify-around py-1">
        <Link
          href="/"
          className="flex items-center justify-center flex-grow h-12  hover:text-gray-500"
          scroll={false}
        >
          <span className="sr-only">Feed</span>
          {pathname === "/" ? (
            <SolidRectangleStackIcon className="p-1 size-10 text-slate-900" />
          ) : (
            <RectangleStackIcon className="p-1 size-10 text-slate-700" />
          )}
        </Link>
        <Link
          href="/explore"
          className="flex items-center justify-center flex-grow h-12  hover:text-gray-500"
          scroll={false}
        >
          <span className="sr-only">Explore</span>
          {pathname === "/explore" ? (
            <SolidMapIcon className="p-1 size-10 text-slate-900" />
          ) : (
            <MapIcon className="p-1 size-10 text-slate-700" />
          )}{" "}
        </Link>
        <Link
          href="/market"
          className="flex items-center justify-center flex-grow h-12  hover:text-gray-500"
          scroll={false}
        >
          <span className="sr-only">Market</span>
          {pathname === "/market" ? (
            <SolidBuildingStorefrontIcon className="p-1 size-10 text-slate-900" />
          ) : (
            <BuildingStorefrontIcon className="p-1 size-10 text-slate-700" />
          )}{" "}
        </Link>
        <Link
          href="/saved"
          className="flex items-center justify-center flex-grow h-12  hover:text-gray-500"
          scroll={false}
        >
          <span className="sr-only">Saved</span>
          {pathname === "/saved" ? (
            <SolidBookmarkSquareIcon className="p-1 size-10 text-slate-900" />
          ) : (
            <BookmarkSquareIcon className="p-1 size-10 text-slate-700" />
          )}{" "}
        </Link>
        <Link
          href="settings"
          className="flex items-center justify-center flex-grow h-12  hover:text-gray-500"
          scroll={false}
        >
          <span className="sr-only">Settings</span>
          {pathname === "/settings" ? (
            <SolidCogIcon className="p-1 size-10 text-slate-900" />
          ) : (
            <CogIcon className="p-1 size-10 text-slate-700" />
          )}{" "}
        </Link>
      </div>
    </div>
  );
}
