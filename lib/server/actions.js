"use server";
import { ID, ImageGravity, InputFile } from "node-appwrite";
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

    await createUser(session);

  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during sign up. Please try again later.");
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
    throw new Error("An error occurred while signing out. Please try again later.");
  }
  redirect("/signup");
};

export async function deleteUser(user) {
  console.log("Deleting user:", user);
  try {
    const currentUser = await getLoggedInUser();
    if (currentUser) {
      const { databases } = await createDatabasesClient();
      const { storage } = await createStorageClient();
      const userDoc = await databases.getDocument("primary", "user", currentUser.$id);
      await storage.deleteFile("primary", userDoc.avatar);
      await databases.deleteDocument("primary", "user", currentUser.$id);
      const { users } = await createUsersClient();
      cookies().delete("user-session");
      await users.deleteSessions(currentUser.$id);
      await users.delete(currentUser.$id);
      console.log("User Data deleted!");
    } else {
      redirect("/signup");
    }
  } catch (error) {
    console.error(error);
  }
  redirect("/signup");
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
    return null;
  } catch (error) {
    console.error("Error getting avatar:", error);
    return null;
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
    throw new Error(
      "An error occurred while retrieving the image. Please try again later."
    );
  }
};

export const createUser = async (user) => {
  try {
    const { avatars } = await createAvatarsClient();
    const { storage } = await createStorageClient();
    const { databases } = await createDatabasesClient();
    const initialsAvatar = await avatars.getInitials(user.name);
    const iconBuffer = Buffer.from(initialsAvatar, "base64");
    const file = InputFile.fromBuffer(iconBuffer, "avatar");
    const uploadedFile = await storage.createFile("primary", ID.unique(), file);
    const createdUser = await databases.createDocument(
      "primary",
      "user",
      user.$id,
      { avatar: uploadedFile.$id }
    );
    console.log("User created:", createdUser);
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(
      "An error occurred while creating your account. Please try again later."
    );
  }
};

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