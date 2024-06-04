import { NextResponse } from "next/server";
import { getLoggedInUser } from "./lib/server/appwrite";

export async function middleware(req) {
  const user = await getLoggedInUser();
  if (!user) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }
  if (!user.prefs.isProfileComplete) {
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
    "/api",
  ],
};
