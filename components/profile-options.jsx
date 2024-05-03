"use client";
import { useState } from "react";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Transition from "./transition";
import { AnimatePresence } from "framer-motion";

export default function ProfileOptions() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="relative">
        <button
          className="mr-4 size-10 text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Image
            src="/vercel.svg"
            width={32}
            height={32}
            className="rounded-full border border-slate-600 size-full"
            alt="Profile Icon"
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <Transition
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
            >
              <div className="p-2">
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <UserCircleIcon className="size-7 p-1 text-slate-900" />
                  Profile
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeftStartOnRectangleIcon className="size-7 p-1 text-slate-900" />
                  Sign out
                </a>
              </div>
            </Transition>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
