import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = req.cookies.get("user-session");
  if(!session) {
    return redirect("/signup");
  }
  return NextResponse.next();
}
