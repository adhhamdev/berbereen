import { NextResponse } from "next/server";

export const POST = async (req) => {
  console.log(await req.json())
  return NextResponse.json({}, {status: 200});
};
