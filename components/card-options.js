"use client";
import { useState } from "react";
import Transition from "./transition";
import { AnimatePresence } from "framer-motion";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

export default function CardOptions() {
  const [optionsVisible, setOptionsVisible] = useState(false);
  return (
    <div onBlur={() => setOptionsVisible(false)}>
      <button onClick={() => setOptionsVisible(prev => !prev)} className="p-1 rounded-md hover:bg-slate-200">
        <EllipsisHorizontalIcon className="size-5" />
      </button>
      <AnimatePresence>
        {optionsVisible && (
          <Transition
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
          >
            <div className="absolute right-2 p-2 bg-white shadow-lg z-10 rounded-lg">
              <button className="flex items-center p-2 hover:bg-slate-200 rounded-md">
                Edit
              </button>
              <button className="flex items-center p-2 hover:bg-slate-200 rounded-md">
                Delete
              </button>
            </div>
          </Transition>
        )}
      </AnimatePresence>
    </div>
  );
}
