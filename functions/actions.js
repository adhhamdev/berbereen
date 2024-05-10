import { Client, Databases } from "node-appwrite";

export async function createDatabaseClient() {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);
  
    return {
      get database() {
        return new Databases(client);
      },
    };
  }