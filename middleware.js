import { NextResponse } from "next/server";
import { getLoggedInUser } from "./lib/server/appwrite";

export const dynamic = "force-dynamic";

export async function middleware(req) {
  const user = await getLoggedInUser();
  console.log(user)
  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (
    user.prefs.isProfileComplete != true &&
    req.nextUrl.pathname != "/start"
  ) {
    return NextResponse.redirect(new URL("/start", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/explore",
    "/market",
    "/saved",
    "/settings",
    "/account",
    "/start",
    "/api",
  ],
};
