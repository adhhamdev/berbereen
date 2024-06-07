"use server";

import { createAdminClient } from "./appwrite-admin";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";

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
