"use client";

import { ID } from "appwrite";
import { useRouter } from "next/navigation";
import {
  createWebAvatarsClient,
  createWebSessionClient,
  createWebStorageClient,
  createWebDatabasesClient,
} from "@/lib/appwrite-web";
import { useState } from "react";

const Form = () => {
  const [fields, setFields] = useState({ email: "", password: "", name: "" });
  const router = useRouter();

  const signUpWithEmail = async (ev) => {
    ev.preventDefault();
    const { email, password, name } = fields;
    try {
      const account = createWebSessionClient();

      const userId = ID.unique();
      await account.create(userId, email, password, name);
      const session = await account.createEmailPasswordSession(email, password);

      const avatars = createWebAvatarsClient();
      const storage = createWebStorageClient();
      const databases = createWebDatabasesClient();
      const initialsAvatar = avatars.getInitials(session.name);
      console.log(initialsAvatar);
      const buffer = await (new Blob([initialsAvatar]).arrayBuffer());
      const file = new File([buffer], "avatar.png", {
        type: "image/png",
      });
      console.log("the blob file:", file);
      const uploadedFile = await storage.createFile(
        "primary",
        ID.unique(),
        file
      );
      const fileData = storage.getFileView("primary", uploadedFile.$id);
      account.updatePrefs({ avatar: fileData.href });
      const createdUser = await databases.createDocument(
        "primary",
        "user",
        userId,
        {
          post: [],
          like: [],
        }
      );
      console.log("User created:", createdUser);
      router.push("/");
    } catch (error) {
      console.error(error);
      throw new Error(
        "An error occurred during sign up. Please try again later."
      );
    }
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={signUpWithEmail}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            onChange={(ev) =>
              setFields((prev) => ({ ...prev, email: ev.target.value }))
            }
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            autoComplete="email"
            value={fields.email}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            onChange={(ev) =>
              setFields((prev) => ({ ...prev, password: ev.target.value }))
            }
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            minLength={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            autoComplete="new-password"
            value={fields.password}
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            onChange={(ev) =>
              setFields((prev) => ({ ...prev, name: ev.target.value }))
            }
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            autoComplete="name"
            value={fields.name}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Form;
