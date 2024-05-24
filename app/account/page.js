import { getLoggedInUser } from "@/lib/server/appwrite";
import { deleteUser, getAvatar } from "@/lib/server/actions";
import Image from "next/image";
import Transition from "../../components/transition";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import BackNavBtn from "@/components/back-nav-btn";

export const metadata = {
  title: "Profile",
  description: "User Profile",
};

export default async function Page() {
  const user = await getLoggedInUser();
  const profilePicture = await getAvatar(100);
  const followersBrief = [
    "https://randomuser.me/api/portraits/women/21.jpg",
    "https://randomuser.me/api/portraits/women/22.jpg",
    "https://randomuser.me/api/portraits/women/23.jpg",
    "https://randomuser.me/api/portraits/women/24.jpg",
    "https://randomuser.me/api/portraits/women/25.jpg",
    "https://randomuser.me/api/portraits/women/26.jpg",
  ];

  return (
    <div>
      <header className="flex items-center justify-between border-b lg:px-4">
        <div className="flex items-center">
          <BackNavBtn text="Profile" />
        </div>
      </header>

      <div className="max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg">
        <div className="border-b px-4 py-6">
          <div className="h-44 w-full bg-slate-600 object-cover rounded-xl"></div>
          {/* <Image
            src=""
            width={100}
            height={100}
            alt="Profile Cover"
            className="h-44 w-full object-cover rounded-xl"
          /> */}
          <div className="relative text-center my-4 -mt-20">
            <Transition layoutId="profileIcon">
              {profilePicture && (
                <Image
                  className="size-32 mx-auto my-4 bg-white rounded-full border-8 border-white"
                  src={profilePicture}
                  alt="Profile Picture"
                  width={40}
                  height={40}
                />
              )}
            </Transition>
            <div className="py-2">
              <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                {user?.name}
              </h3>
              <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                <EnvelopeIcon className="size-4 mr-2" />
                {user?.email}
              </div>
            </div>
          </div>
          <div className="flex gap-2 px-2">
            <button className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
              Edit
            </button>
            <form action={deleteUser}>
              <button className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
                Delete Account
              </button>
            </form>
          </div>
        </div>
        <div className="px-4 py-4">
          <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
            <svg
              className="h-6 w-6 text-gray-600 dark:text-gray-400"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                className=""
                d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
              />
            </svg>
            <span>
              <strong className="text-black dark:text-white">12</strong>{" "}
              Followers you know
            </span>
          </div>
          <div className="flex">
            <div className="flex justify-end mr-2">
              {followersBrief.map((follower, index) => {
                return (
                  <Image
                    className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
                    src={follower}
                    alt=""
                    width={40}
                    height={40}
                    key={index}
                  />
                );
              })}
              <span className="flex items-center justify-center bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white font-semibold border-2 border-gray-200 dark:border-gray-700 rounded-full h-10 w-10">
                +12
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
