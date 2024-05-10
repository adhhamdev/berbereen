import { createDatabaseClient } from "@/lib/appwrite";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { $id, name, email, password, emailVerification } = req.json();
    const data = { name, email, password, emailVerified: emailVerification };
    const { database } = await createDatabaseClient();
    database.createDocument("primary", "users", $id, data);
    NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    NextResponse.json({ error: error.message }, { status: 500 })
  }
};
