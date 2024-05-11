"use server";

import { ID, OAuthProvider } from "node-appwrite";
import { createAdminClient, getLoggedInUser } from "@/lib/appwrite";
import { createSessionClient, createUsersClient } from "@/lib/appwrite";
import { cookies, headers } from "next/headers";
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

// AUTHENTICATION

export async function loginWithEmail(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const { account } = await createAdminClient();
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

export async function signUpWithGoogle() {
  const { account } = await createAdminClient();

  const origin = headers().get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/api/oauth`,
    `${origin}`
  );

  redirect(redirectUrl);
}

export async function deleteAccount() {
  const currentUser = await getLoggedInUser();
  const { users } = await createUsersClient();
  await users.delete(currentUser.$id);
  cookies().delete("user-session");

  redirect("/signup");
}

// DATABASE
