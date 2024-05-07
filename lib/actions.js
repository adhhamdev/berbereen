"use server";

import { ID, OAuthProvider, Databases  } from "node-appwrite";
import { createAdminClient } from "@/lib/appwrite";
import { createSessionClient } from "@/lib/appwrite";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signUpWithEmail(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  try {
    const { account } = await createAdminClient();

    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("user-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
  } catch (error) {
    throw new Error(error.message);
  }

  redirect("/");
}

// AUTHENTICATION

export async function loginWithEmail(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("user-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
  } catch (error) {
    throw new Error(error.message);
  }

  redirect("/");
}

export async function signOut() {
  const { account } = await createSessionClient();

  cookies().delete("user-session");
  await account.deleteSession("current");

  redirect("/login");
}

export async function signUpWithGoogle() {
  const { account } = await createAdminClient();

  const origin = headers().get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/api/oauth`,
    `${origin}/login`
  );

  return redirect(redirectUrl);
}

// DATABASE

// export async function likeAndUnlikePost(likeId) {
//   const { account } = await createSessionClient();
//   const database = new Databases(account.client);
//   const res = await database.deleteDocument("primary", "post", likeId);
//   // console.log(res)
// }