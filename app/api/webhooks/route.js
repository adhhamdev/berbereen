import { NextResponse } from "next/server";

export const POST = (req) => {
    const headers = req.headers;
    console.log(headers)
    return NextResponse.json({})
}