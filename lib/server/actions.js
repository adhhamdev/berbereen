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

    redirect("/");
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during sign up. Please try again later.");
  }
};

export const signOut = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("user-session");
    await account.deleteSession("current");

    redirect("/signup");
  } catch (error) {
    console.error("Error signing out:", error);
    throw new Error("An error occurred while signing out. Please try again later.");
  }
};

export async function deleteUser() {
  try {
    const currentUser = await getLoggedInUser();
    if (currentUser) {
      const { users } = await createUsersClient();
      cookies().delete("user-session");
      await users.deleteSessions(currentUser.$id);
      const deletedUser = await users.delete(currentUser.$id);
      if (deletedUser) {
        redirect("/signup");
      } else {
        throw new Error("Failed to delete Account!");
      }
    } else {
      throw new Error("You are not logged in!");
    }
  } catch (error) {
    console.error(error);
    alert(
      "An error occurred while deleting your account. Please try again later."
    );
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
