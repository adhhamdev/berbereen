"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { OAuthProvider } from "node-appwrite";
import { createAdminClient } from "./appwrite-admin";

export async function signUpWithGoogle() {
  const { account } = createAdminClient();

  const origin = headers().get("origin");
  let redirectUrl;
  try {
    redirectUrl = await account.createOAuth2Token(
      OAuthProvider.Google,
      `${origin}/api/oauth`,
      `${origin}/`
    );
  } catch (error) {
    console.log(error);
  }
  return redirect(redirectUrl);
}
