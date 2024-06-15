"use client";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Transition from "./transition";

export default function CardOptions() {
  const [optionsVisible, setOptionsVisible] = useState(false);
  return (
    <div onBlur={() => setOptionsVisible(false)}>
      <button
        onClick={() => setOptionsVisible((prev) => !prev)}
        className="p-1 rounded-md hover:bg-slate-200"
      >
        <EllipsisHorizontalIcon className="size-5" />
      </button>
      <AnimatePresence>
        {optionsVisible && (
          <Transition
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className="absolute z-10 p-2 bg-white rounded-lg shadow-lg right-2"
          >
            <div>
              <button className="flex items-center px-4 py-2 rounded-md size-full hover:bg-slate-200">
                <PencilSquareIcon className="mr-2 size-5" /> Edit
              </button>
              <button className="flex items-center px-4 py-2 rounded-md size-full hover:bg-slate-200">
                <TrashIcon className="mr-2 size-5" /> Delete
              </button>
            </div>
          </Transition>
        )}
      </AnimatePresence>
    </div>
  );
}
