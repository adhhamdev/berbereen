"use client";

import {
  XCircleIcon,
  CheckIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import Transition from "./transition";
import { usePathname, useRouter } from "next/navigation";

const Popup = ({ params, searchParams }) => {
  const router = useRouter();
  const path = usePathname();

  setTimeout(() => {
    console.log("Popup timeout");
    router.replace(path);
    router.refresh();
  }, 5000);

  const actions = {
    "logged-out": {
      message: "You have successfully logged out.",
      accent: "green",
      icon: <CheckIcon className="size-6 text-green-500 mr-2" />,
    },
    "signed-up": {
      message: "You have successfully signed up.",
      accent: "green",
      icon: <CheckIcon className="size-6 text-green-500 mr-2" />,
    },
    "logged-in": {
      message: "You have successfully logged in.",
      accent: "green",
      icon: <CheckIcon className="size-6 text-green-500 mr-2" />,
    },
    "not-logged-in": {
      message: "You are not logged in.",
      accent: "red",
      icon: <NoSymbolIcon className="size-6 text-red-500 mr-2" />,
    },
    "profile-completed": {
      message: "Your profile is created.",
      accent: "green",
      icon: <CheckIcon className="size-6 text-green-500 mr-2" />,
    },
    "account-deleted": {
      message: "Your account is successfully deleted.",
      accent: "green",
      icon: <CheckIcon className="size-6 text-green-500 mr-2" />,
    },
  };

  let action = actions[searchParams.action];

  return (
    <Transition
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      className={`fixed bottom-0 right-0 m-6 py-2 px-4 flex items-center justify-between backdrop-blur-2xl shadow-lg rounded-md`}
      style={{borderColor: action?.accent, borderWidth: "2px"}}
    >
      <div className="flex items-center">
        {action?.icon}
        <p className={"text-" + action?.accent + "-500"}>{action?.message}</p>
      </div>
      <button
        onClick={() => {
          router.replace(path);
          router.refresh();
        }}
        className="text-slate-600"
      >
        <XCircleIcon className="size-6 ml-4" />
      </button>
    </Transition>
  );
};

export default Popup;
