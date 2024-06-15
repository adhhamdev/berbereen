import { createAdminClient } from "@/lib/server/appwrite-admin";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const userId = request.nextUrl.searchParams.get("userId");
  const secret = request.nextUrl.searchParams.get("secret");

  try {
    const { account } = createAdminClient();
    const session = await account.createSession(userId, secret);
    
    cookies().set("user-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    console.log(request)
    return redirect(request.url);
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
