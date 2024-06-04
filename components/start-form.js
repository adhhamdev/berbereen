"use client";

import { createProfile } from "@/lib/server/actions";

const StartForm = ({user}) => {
  return (
    <div>
      <form className="w-full max-w-md" action={createProfile}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-xl"
            placeholder="Enter your name"
            autoComplete="name"
            enterKeyHint="next"
            maxLength={32}
            minLength={5}
            defaultValue={user?.name || ""}
            required
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 sm:mb-0"
            type="submit"
          >
            Create Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default StartForm;
