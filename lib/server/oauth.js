"use server"

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";
import { createAccount } from "./appwrite";

export async function signUpWithGoogle() {
	const account = createAccount("admin");

  const origin = headers().get("origin");
  
	const redirectUrl = await account.createOAuth2Token(
		OAuthProvider.Google,
		`${origin}/api/oauth`,
		`${origin}/`,
	);

	return redirect(redirectUrl);
};
