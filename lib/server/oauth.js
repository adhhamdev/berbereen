import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";
import { createAccount } from "./appwrite";

export async function signUpWithGoogle() {
  "use server";
  try {
    const account = createAccount("admin");

    const origin = headers().get("origin");

    const redirectUrl = await account.createOAuth2Token(
      OAuthProvider.Google,
      `${origin}/api/oauth`,
      `${origin}/`
    );

    return redirect(redirectUrl);
  } catch (error) {
    console.error("Error signing up with Google:", error);
  }
}
