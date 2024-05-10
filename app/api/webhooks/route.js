import { NextResponse } from "next/server";

export const POST = (req) => {
    const {nextUrl} = req;
    console.log(nextUrl.options)
    return NextResponse.json({})
}