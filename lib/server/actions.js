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
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  try {
    const { account: adminAccount } = await createAdminClient();

    const userId = ID.unique();
    const createdUser = await adminAccount.create(
      userId,
      email,
      password,
      name
    );

    const session = await adminAccount.createEmailPasswordSession(
      email,
      password
    );

    cookies().set("user-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const { account } = await createSessionClient();
    const { avatars } = await createAvatarsClient();
    const { databases } = await createDatabasesClient();
    const { storage } = await createStorageClient();
    const createdUserDoc = await databases.createDocument(
      "primary",
      "user",
      userId,
      {
        post: [],
        like: [],
      }
    );
    const arrayBuffer = await avatars.getInitials(createdUser.name);
    const avatarFile = new File([arrayBuffer], "avatar", {
      type: "image/png",
    });
    const createdFile = await storage.createFile(
      "primary",
      ID.unique(),
      avatarFile,
      [],
      (progress) => console.log("Avatar FIle: progress: ", progress)
    );
    await account.updatePrefs({
      avatar: createdFile.$id,
      isProfileComplete: false,
    });
    console.log("User created:", createdUserDoc);
  } catch (error) {
    console.error(error);
  }
  redirect("/");
};

export const signInWithEmail = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const { account } = await createSessionClient();
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
  redirect("/", "replace");
};

export const updateCurrentUser = async (attributes) => {
  try {
    const user = await getLoggedInUser();
    const { databases } = await createDatabasesClient();
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
    const { databases } = await createDatabasesClient();
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
    const { account } = await createSessionClient();
    const prefs = await account.getPrefs();
    const updatedPrefs = await account.updatePrefs({ ...prefs, ...changes });
    console.log(`User updated:`, updatedPrefs);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const createProfile = async (formData) => {
  const { account } = await createSessionClient();
  const { avatars } = await createAvatarsClient();
  const { storage } = await createStorageClient();
  await account.updateName(formData.get("name"));
  const user = await getLoggedInUser();
  const arrayBuffer = await avatars.getInitials(user.name);
  const avatarFile = new File([arrayBuffer], "avatar", {
    type: "image/png",
  });
  const createdFile = await storage.createFile(
    "primary",
    ID.unique(),
    avatarFile,
    [],
    (progress) => console.log("Avatar FIle: progress: ", progress)
  );
  await storage.deleteFile("primary", user.prefs.avatar);
  await updatePrefs({
    avatar: createdFile.$id,
    isProfileComplete: true,
  });
  redirect("/");
};

export async function deleteCurrentUser() {
  try {
    const user = await getLoggedInUser();
    console.log("Current User Data:", user);
    if (user) {
      const { account } = await createSessionClient();
      const { databases } = await createDatabasesClient();
      const { storage } = await createStorageClient();
      const prefs = await account.getPrefs();
      await storage.deleteFile("primary", prefs.avatar);
      await databases.deleteDocument("primary", "user", user.$id);
      const { users } = await createUsersClient();
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
  redirect("/login");
}

export async function deleteUser(user) {
  try {
    if (user) {
      const { account } = await createSessionClient();
      const { databases } = await createDatabasesClient();
      const { storage } = await createStorageClient();
      const prefs = await account.getPrefs();
      await storage.deleteFile("primary", prefs.avatar);
      await databases.deleteDocument("primary", "user", user.$id);
      const { users } = await createUsersClient();
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
    const { account } = await createSessionClient();
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error signing out:", error);
    throw new Error(
      "An error occurred while signing out. Please try again later."
    );
  }
  redirect("/login");
};

export const getAvatar = async () => {
  const { account } = await createSessionClient();
  const { storage } = await createStorageClient();
  const prefs = await account.getPrefs();
  const avatar = await storage.getFileView("primary", prefs.avatar);
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
