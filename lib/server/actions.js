"use server";
import { ID, ImageGravity } from "node-appwrite";
import {
  createAdminClient,
  createDatabasesClient,
  createSessionClient,
  createStorageClient,
  createUsersClient,
  getLoggedInUser,
} from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { bufferToImage } from "../utils";

export const signUpWithEmail = async (formData) => {
  try {
    const { email, password, name } = Object.fromEntries(formData);
    const { account } = await createAdminClient();

    const userId = ID.unique();
    await account.create(userId, email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("user-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
  } catch (error) {
    console.error(error);
  }
  redirect("/");
};

export const signOut = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("user-session");
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error signing out:", error);
  }
  redirect("/signup");
};

export async function deleteUser() {
  const user = await getLoggedInUser();
  if (user) {
    try {
      const { users } = await createUsersClient();
      cookies().delete("user-session");
      users.deleteSessions(user.$id);
      await users.delete(user.$id);
    } catch (error) {
      console.log(error);
    }
    redirect("/signup");
  } else {
    redirect("/signup");
  }
}

export const getAvatar = async (size) => {
  try {
    const session = await getLoggedInUser();
    if (session) {
      const { databases } = await createDatabasesClient();
      const { storage } = await createStorageClient();

      const user = await databases.getDocument("primary", "user", session.$id);

      const filePreview = await storage.getFilePreview(
        "primary",
        user.avatar,
        size,
        size,
        ImageGravity.Center
      );
      return bufferToImage(filePreview);
    }
  } catch (error) {
    console.error("Error getting avatar:", error);
  }
};

export const deleteAvatar = async (size) => {
  try {
    const session = await getLoggedInUser();
    if (session) {
      const { databases } = await createDatabasesClient();
      const { storage } = await createStorageClient();

      const user = await databases.getDocument("primary", "user", session.$id);

      const filePreview = await storage.getFilePreview(
        "primary",
        user.avatar,
        size,
        size,
        ImageGravity.Center
      );
      return bufferToImage(filePreview);
    }
  } catch (error) {
    console.error("Error getting avatar:", error);
  }
};

export const getImage = async (id) => {
  try {
    const { storage } = await createStorageClient();
    const file = await storage.getFilePreview(
      "primary",
      id,
      500,
      500,
      ImageGravity.Center
    );
    return bufferToImage(file);
  } catch (error) {
    console.error("Error getting Post image:", error);
  }
};
