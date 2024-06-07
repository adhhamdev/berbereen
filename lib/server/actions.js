"use server";
import { ID } from "node-appwrite";
import {
  createSessionClient,
  createDatabasesClient,
  createStorageClient,
  createAvatarsClient,
  getLoggedInUser,
} from "@/lib/server/appwrite";
import { createAdminClient, usersAdmin } from "./appwrite-admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signUpWithEmail = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  try {
    const { account } = createAdminClient();

    const userId = ID.unique();
    await account.create(userId, email, password, name);

    const session = await account.createEmailPasswordSession(
      email,
      password
    );

    cookies().set("user-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const { databases } = createDatabasesClient();
    const createdUserDoc = await databases.createDocument(
      "primary",
      "user",
      userId,
      {
        post: [],
        like: [],
      }
    );
    console.log("User created:", createdUserDoc);
  } catch (error) {
    console.error(error);
  }
  redirect("/?action=signed-up");
};

export const signInWithEmail = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const { account } = createAdminClient();
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
  redirect("/?action=logged-in");
};

export const updateCurrentUser = async (attributes) => {
  try {
    const user = await getLoggedInUser();
    const { databases } = createDatabasesClient();
    const updatedUser = await databases.updateDocument(
      "primary",
      "user",
      user.$id,
      attributes
    );
    console.log(`User updated:`, updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const updateUser = async (user, attributes) => {
  try {
    const { databases } = createDatabasesClient();
    const updatedUser = await databases.updateDocument(
      "primary",
      "user",
      user.$id,
      attributes
    );
    console.log(`User ${user.$Id} updated:`, updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const updatePrefs = async (changes) => {
  try {
    const { account } = createSessionClient();
    const prefs = await account.getPrefs();
    const updatedPrefs = await account.updatePrefs({ ...prefs, ...changes });
    console.log(`User updated:`, updatedPrefs);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const createProfile = async (formData) => {
  const { account } = createSessionClient();
  const { avatars } = createAvatarsClient();
  const { storage } = createStorageClient();
  await account.updateName(formData.get("name"));
  const user = await getLoggedInUser();
  const arrayBuffer = await avatars.getInitials(user.name);
  const avatarFile = new File([arrayBuffer], "avatar", {
    type: "image/png",
  });
  const createdFile = await storage.createFile(
    "profile",
    ID.unique(),
    avatarFile,
    [],
    (progress) => console.log("Avatar FIle: progress: ", progress)
  );
  await storage.deleteFile("profile", user.prefs.avatar);
  await updatePrefs({
    avatar: createdFile.$id,
    isProfileComplete: true,
  });
  redirect("/?action=profile-completed");
};

export async function deleteCurrentUser() {
  try {
    const user = await getLoggedInUser();
    console.log("Current User Data:", user);
    if (user) {
      const { databases } = createDatabasesClient();
      const { storage } = createStorageClient();
      await storage.deleteFile("profile", user.avatar);
      await databases.deleteDocument("primary", "user", user.$id);
      cookies().delete("user-session");
      await usersAdmin.deleteSessions(user.$id);
      await usersAdmin.delete(user.$id);
      console.log("Current User Data deleted!");
    } else {
      console.log("No user logged in!");
    }
  } catch (error) {
    console.error(error);
  }
  redirect("/login?action=account-deleted");
}

export async function deleteUser(user) {
  try {
    if (user) {
      const { databases } = createStorageClient();
      const { storage } = createStorageClient();
      await storage.deleteFile("profile", user.avatar);
      await databases.deleteDocument("primary", "user", user.$id);
      const { users } = createUsersClient();
      cookies().delete("user-session");
      await users.deleteSessions(user.$id);
      await users.delete(user.$id);
      console.log("Current User Data deleted!");
    } else {
      console.log("No user logged in!");
    }
  } catch (error) {
    console.error(error);
  }
}

export const logOut = async () => {
  try {
    const { account } = createSessionClient();
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error signing out:", error);
    throw new Error(
      "An error occurred while signing out. Please try again later."
    );
  }
  redirect("/login?action=logged-out");
};