"use client";
import Link from "next/link";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Transition from "./transition";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileOptions({ profilePicture }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const signOut = async () => {
    try {
      const account = createWebSessionClient();
      await account.deleteSession("current");
    } catch (error) {
      console.error("Error signing out:", error);
      throw new Error(
        "An error occurred while signing out. Please try again later."
      );
    }
    router.push("/signup");
  };

  return (
    <div>
      <div className="relative" onBlur={() => setIsOpen(false)}>
        <Transition layoutId="profileIcon">
          <button
            className="flex justify-center itemse-center mr-2 size-10 text-gray-600 hover:text-gray-800 shadow-lg rounded-lg"
            onClick={() => setIsOpen((prev) => !prev)}
            title="Account"
          >
            <Image
              src={profilePicture || ""}
              width={40}
              height={40}
              className="rounded-lg size-full"
              alt="Profile Icon"
            />
          </button>
        </Transition>
        <AnimatePresence>
          {isOpen && (
            <Transition
              className="absolute right-2 w-48 bg-white rounded-lg shadow-xl z-20"
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 16, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
            >
              <div className="p-2">
                <Link
                  href="/account"
                  className="flex size-full items-center px-4 py-2 sm:py-1 text-base text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <UserCircleIcon className="size-8 p-1 text-slate-900" />
                  Profile
                </Link>
                <button
                  onClick={signOut}
                  className="flex size-full items-center px-4 py-2 sm:py-1 text-base text-rose-600 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeftStartOnRectangleIcon className="size-8 p-1 text-rose-600" />
                  Sign out
                </button>
              </div>
            </Transition>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
