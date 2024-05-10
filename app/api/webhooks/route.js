import { NextResponse } from "next/server";

export const POST = (req) => {
    const {method, body, url, nextUrl, cookies} = req;
    console.log(method, body, url, nextUrl, cookies)
    return NextResponse.json({"message": "Webhook request recieved!"})
}