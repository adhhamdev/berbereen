"use server";
import { Client, Account } from "appwrite";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";

const createWebClient = async () => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

  return {
    get web() {
      return new Account(client);
    },
  };
};

export async function signUpWithGoogle() {
  const { web } = await createWebClient();

  const origin = headers().get("origin");

  const redirectUrl = web.createOAuth2Session(
    OAuthProvider.Google,
    `${origin}/api/oauth`,
    `${origin}/`
  );

  console.log(redirectUrl)

  return redirect(redirectUrl);
}
