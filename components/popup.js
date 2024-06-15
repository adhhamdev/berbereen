"use client";

export const dynamic = "force-dynamic";

import {
  CheckIcon,
  NoSymbolIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import Transition from "./transition";

const Popup = ({ searchParams }) => {
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
      icon: <CheckIcon className="mr-2 text-green-500 size-6" />,
    },
    "signed-up": {
      message: "You have successfully signed up.",
      accent: "green",
      icon: <CheckIcon className="mr-2 text-green-500 size-6" />,
    },
    "logged-in": {
      message: "You have successfully logged in.",
      accent: "green",
      icon: <CheckIcon className="mr-2 text-green-500 size-6" />,
    },
    "not-logged-in": {
      message: "You are not logged in.",
      accent: "red",
      icon: <NoSymbolIcon className="mr-2 text-red-500 size-6" />,
    },
    "profile-completed": {
      message: "Your profile is created.",
      accent: "green",
      icon: <CheckIcon className="mr-2 text-green-500 size-6" />,
    },
    "account-deleted": {
      message: "Your account is successfully deleted.",
      accent: "green",
      icon: <CheckIcon className="mr-2 text-green-500 size-6" />,
    },
  };

  let action = actions[searchParams.action];

  return (
    <Transition
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      className={`fixed bottom-0 right-0 m-6 py-2 px-4 flex items-center justify-between backdrop-blur-2xl shadow-lg rounded-md`}
      style={{ borderColor: action?.accent, borderWidth: "2px" }}
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
        <XCircleIcon className="ml-4 size-6" />
      </button>
    </Transition>
  );
};

export default Popup;
