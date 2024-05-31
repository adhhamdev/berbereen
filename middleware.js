import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = req.cookies.get("user-session");
  console.log("middleware session:", session)
  if (!session) {
    return NextResponse.redirect(new URL("/signup", req.url));
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
    "/api"
  ],
};
