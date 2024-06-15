"use client";

import { createProfile } from "@/lib/server/actions";

const StartForm = ({ user }) => {
  return (
    <div>
      <form action={createProfile} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your name"
            autoComplete="name"
            enterKeyHint="next"
            maxLength={32}
            minLength={5}
            defaultValue={user?.name || ""}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="bio" className="block text-gray-700 font-bold mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your bio"
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
