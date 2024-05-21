import { NextResponse } from "next/server";

export function middleware(req) {
  const session = req.cookies.get("user-session");
  console.log("session: ", session)
  if(!session) {
    return NextResponse.redirect(new URL('/signup', req.url));
  }
 return NextResponse.next();
}
