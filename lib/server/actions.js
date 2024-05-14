"use server";
import { ID } from "node-appwrite";
import {
  createAdminClient,
  createSessionClient,
  createUsersClient,
  getLoggedInUser,
} from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUpWithEmail(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  const { account } = await createAdminClient();

  await account.create(ID.unique(), email, password, name);
  const session = await account.createEmailPasswordSession(email, password);

  cookies().set("user-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  redirect("/");
}

export async function signOut() {
  const { account } = await createSessionClient();

  cookies().delete("user-session");
  await account.deleteSession("current");

  redirect("/signup");
}

export async function deleteUser() {
  const currentUser = await getLoggedInUser();
  const { users } = await createUsersClient();

  cookies().delete("user-session");
  await users.deleteSessions(currentUser.$id);
  await users.delete(currentUser.$id);
  redirect("/signup");
}
