import { NextResponse } from "next/server";

export const POST = (req) => {
    console.log(req);
    return NextResponse.json({"message": "Webhook request recieved!"})
}