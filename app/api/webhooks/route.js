import { NextResponse } from "next/server";

export const POST = (req) => {
    const {nextUrl} = req;
    console.log(nextUrl)
    return NextResponse.json({"message": "Webhook request recieved!"})
}