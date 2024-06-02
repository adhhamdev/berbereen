"use server";
import { ID, ImageGravity, InputFile } from "node-appwrite";
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
import { createWebSessionClient, createWebStorageClient } from "../appwrite-web";

const updateUser = async (user, attribute) => {
  try {
    const { databases } = await createDatabasesClient();
    const updatedUser = await databases.updateDocument(
      "primary",
      "user",
      user.$id,
      { [attribute]: user[attribute] }
    );
    console.log(`User ${attribute} updated:`, updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export async function deleteCurrentUser() {
  console.log("Deleting current user:", user);
  try {
    const user = await getLoggedInUser();
    if (user) {
      const { databases } = await createDatabasesClient();
      const { storage } = await createStorageClient();
      const userDoc = await databases.getDocument("primary", "user", user.$id);
      await storage.deleteFile("primary", userDoc.avatar);
      await databases.deleteDocument("primary", "user", user.$id);
      const { users } = await createUsersClient();
      cookies().delete("user-session");
      await users.deleteSessions(user.$id);
      await users.delete(user.$id);
      console.log("Current User Data deleted!");
    } else {
      redirect("/signup");
    }
  } catch (error) {
    console.error(error);
  }
  redirect("/signup");
}

export const getAvatar = async () => {
  const account = createWebSessionClient();
  const prefs = await account.getPrefs();
  const storage = createWebStorageClient();
  const avatar = storage.getFileView("primary", prefs.avatar);
  return bufferToImage(avatar);
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
    throw new Error(
      "An error occurred while retrieving the image. Please try again later."
    );
  }
};
