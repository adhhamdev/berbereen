"use server";
import { ID, ImageGravity } from "node-appwrite";
import {
  createAdminClient,
  createAvatarsClient,
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
  const { email, password, name } = formData;
  try {
    const {account} = createSessionClient();

    const userId = ID.unique();
    await account.create(userId, email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    const avatars = createAvatarsClient();
    const databases = createDatabasesClient();
    const avatarUrl = avatars.getInitials(session.name);
    account.updatePrefs({ avatar: avatarUrl.href });
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
    redirect("/")
  } catch (error) {
    console.error(error);
    throw new Error(
      "An error occurred during sign up. Please try again later."
    );
  }
};

export const updateUser = async (user, attribute) => {
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
  const {account} = createSessionClient();
  const prefs = await account.getPrefs();
  return prefs.avatar;
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

export const signOut = async () => {
  try {
    const account = createSessionClient();
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error signing out:", error);
    throw new Error(
      "An error occurred while signing out. Please try again later."
    );
  }
  redirect("/signup");
};