import { XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Transition from "./transition";

const Popup = ({ params, searchParams }) => {
  if (!searchParams.action) return;
  const actions = {
    "logged-out": {
      message: "You have successfully logged out.",
      accent: "green",
    },
    "signed-up": {
      message: "You have successfully signed up.",
      accent: "green",
    },
    "log-in": {
      message: "You have successfully logged in.",
      accent: "green",
    },
    "not-logged-in": {
      message: "You are not logged in.",
      accent: "red",
    },
    "profile-complete": {
      message: "Your profile is created.",
      accent: "green",
    },
  };

  let action = actions[searchParams?.action];

  return (
    <Transition
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
    >
      <div
        className={`fixed top-0 right-0 m-4 py-2 px-4 flex items-center justify-between bg-white shadow-lg rounded-md border-b-4 border-${action?.accent}-500`}
      >
        <div>
          <p>{action?.message}</p>
        </div>
        <Link href={params} className={`text-${action?.accent}-500`}>
          <XCircleIcon className="size-6 ml-4" />
        </Link>
      </div>
    </Transition>
  );
};

export default Popup;
