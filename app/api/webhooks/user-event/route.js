import { createDatabaseClient } from "@/lib/appwrite";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { $id, name, email, password, emailVerification } = req.json();
    const data = { name, email, password, emailVerified: emailVerification };
    const { database } = await createDatabaseClient();
    database.createDocument("primary", "user", $id, data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ message: "User created successfully" }, { status: 200 });
};
