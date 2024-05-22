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
};

export const signOut = async () => {
  const { account } = await createSessionClient();

  cookies().delete("user-session");
  await account.deleteSession("current");

  redirect("/signup");
};

export async function deleteUser() {
  const currentUser = await getLoggedInUser();
  if (currentUser) {
    const { users } = await createUsersClient();
    cookies().delete("user-session");
    const [_, deletedUser] = await Promise.all([
      users.deleteSessions(currentUser.$id),
      users.delete(currentUser.$id),
    ]);
    if (deletedUser) {
      redirect("/signup");
    }
  }
}

export const getAvatar = async (size) => {
  const session = await getLoggedInUser();
  if (!session) return null;

  const { databases } = await createDatabasesClient();
  const { storage } = await createStorageClient();

  const user = await databases.getDocument("primary", "user", session.$id);
  if (!user.avatar) return null;

  const filePreview = await storage.getFilePreview(
    "primary",
    user.avatar,
    size,
    size,
    ImageGravity.Center
  );

  return bufferToImage(filePreview);
};

export const getImage = async (id) => {
  const { storage } = await createStorageClient();
  const file = await storage.getFilePreview(
    "primary",
    id,
    500,
    500,
    ImageGravity.Center
  );
  return bufferToImage(file);
};
