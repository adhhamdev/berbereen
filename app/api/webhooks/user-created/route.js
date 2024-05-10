import { createDatabaseClient } from "@/lib/appwrite";

export const POST = async (req) => {
  try {
    const { $id, name, email, password, emailVerification } = await req.json();
    const { database } = await createDatabaseClient();
    const data = {
      name,
      email,
      password,
      emailVerified: emailVerification,
    };
    await database.createDocument("primary", "user", $id, data);
  } catch (error) {
    throw new Error(error.message);
  }
  return Response.json("", { status: 201 });
};
