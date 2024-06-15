"use client";

import { createProfile } from "@/lib/server/actions";

const StartForm = ({ user }) => {
  return (
    <div>
      <form className="space-y-4" action={createProfile}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            
            placeholder="Enter your name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            autoComplete="name"
            enterKeyHint="done"
            
            value={user?.name}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default StartForm;
