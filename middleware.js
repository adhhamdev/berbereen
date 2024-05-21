import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = req.cookies.get("user-session");
  if(!session) {
    return NextResponse.redirect("http://localhost:3000/signup");
  }
 return NextResponse.next();
}

export const config = {
  matcher: "/",
};
