"use server";

import { ID, OAuthProvider } from "node-appwrite";
import { createAdminClient } from "@/lib/appwrite";
import { createSessionClient } from "@/lib/appwrite";
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

  redirect("/account");
}

export async function signOut() {
  const { account } = await createSessionClient();

  cookies().delete("my-custom-session");
  await account.deleteSession("current");

  redirect("/signup");
}

// AUTHENTICATION
export async function signUpWithGithub() {
	const { account } = await createAdminClient();

  const origin = headers().get("origin");
  
	const redirectUrl = await account.createOAuth2Token(
		OAuthProvider.Github,
		`${origin}/oauth`,
		`${origin}/signup`,
	);

	return redirect(redirectUrl);
};
