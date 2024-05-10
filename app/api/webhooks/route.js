import { NextResponse } from "next/server";

export const GET = (req) => {
    console.log(req);
    return NextResponse.json({"message": "Webhook request recieved!"})
}