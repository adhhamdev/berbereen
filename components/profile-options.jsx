"use client";
import Link from "next/link";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Transition from "./transition";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ProfileOptions() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="relative" onBlur={() => setIsOpen(false)}>
        <button
          className="flex justify-center itemse-center mr-4 size-10 text-gray-600 hover:text-gray-800 focus:outline-none "
          onClick={() => setIsOpen(prev => !prev)}
        >
          <Image
            src="/profile.jpg"
            width={40}
            height={40}
            className="rounded-full size-full"
            alt="Profile Icon"
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <Transition
              className="absolute right-2 w-48 bg-white rounded-lg shadow-lg z-20"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
            >
              <div className="p-2">
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 sm:py-1 text-base text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <UserCircleIcon className="size-8 p-1 text-slate-900" />
                  Profile
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 sm:py-1 text-base text-rose-600 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeftStartOnRectangleIcon className="size-8 p-1 text-rose-600" />
                  Sign out
                </Link>
              </div>
            </Transition>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
