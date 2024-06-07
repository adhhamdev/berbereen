"use client";

import { XCircleIcon } from "@heroicons/react/24/outline";
import Transition from "./transition";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const dynamic = "force-dynamic";

const Popup = ({ params, searchParams }) => {
  const [isVisibile, setIsVisible] = useState(searchParams.action);
  const actions = {
    "logged-out": {
      message: "You have successfully logged out.",
      accent: "green",
    },
    "signed-up": {
      message: "You have successfully signed up.",
      accent: "green",
    },
    "logged-in": {
      message: "You have successfully logged in.",
      accent: "green",
    },
    "not-logged-in": {
      message: "You are not logged in.",
      accent: "red",
    },
    "profile-completed": {
      message: "Your profile is created.",
      accent: "green",
    },
    "account-deleted": {
      message: "Your account is successfully deleted.",
      accent: "green",
    },
  };

  const handleClick = () => {
    router.replace(path);
    setIsVisible(false)
  }

  const router = useRouter();
  const path = usePathname();
  console.log(path);

  let action = actions[searchParams.action];

  if (isVisibile) {
    return (
      <Transition
        initial={{ x: 10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
        className={`fixed bottom-0 right-0 m-6 py-2 px-4 flex items-center justify-between bg-slate-950 border-2 shadow-lg rounded-md`}
      >
        <div>
          <p className={`text-${action.accent}-500`}>{action.message}</p>
        </div>
        <button onClick={handleClick} className="text-white">
          <XCircleIcon className="size-6 ml-4" />
        </button>
      </Transition>
    );
  } else {
    return null;
  }
};

export default Popup;
