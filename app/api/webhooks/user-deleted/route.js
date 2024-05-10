import { createDatabaseClient } from "@/lib/appwrite";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { $id } = await req.json();
    const { database } = await createDatabaseClient();
    await database.deleteDocument($id);
  } catch (error) {
    throw new Error(error.message);
  }
  return Response.json("", { status: 200 });
};
