import { createDatabaseClient } from "@/lib/appwrite";

export const POST = async (req) => {
  try {
    const { $id } = await req.json();
    const { database } = await createDatabaseClient();
    await database.deleteDocument("primary", "user", $id);
  } catch (error) {
    throw new Error(error.message);
  }
  return Response.json("", { status: 200 });
};
