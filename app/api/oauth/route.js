import { createAdminClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET(request) {
  const userId = request.nextUrl.searchParams.get("userId");
  const secret = request.nextUrl.searchParams.get("secret");

  const { account } = await createAdminClient();
  const session = await account.createSession(userId, secret);

  cookies().set("user-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  return Response.redirect(`${request.nextUrl.origin}/signup`);
}
