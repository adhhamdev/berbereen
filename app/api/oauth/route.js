import { createAdminClient, createUsersClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    const secret = request.nextUrl.searchParams.get("secret");
    console.log(userId, secret);

    const { account } = await createAdminClient();
    const session = await account.createSession(userId, secret);
    console.log("from oauth handler:", session, session.providerAccessToken);
    const { users } = await createUsersClient();
    console.log(await users.get(session.userId));
    cookies().set("user-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return NextResponse.redirect(`${request.nextUrl.origin}/`);
  } catch (error) {
    console.error(error);
    return new NextResponse(
      "An error occurred. Please try again later or contact support if the issue persists.",
      {
        status: 500,
      }
    );
  }
}
