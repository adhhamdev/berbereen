import {
  Account,
  Avatars,
  Databases,
  Users,
  Client,
  Storage,
} from "node-appwrite";

export function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(process.env.NEXT_APPWRITE_KEY);

  return {
    get account() {
      return new Account(client);
    },
  };
}

// ADMIN CLIENTS
let client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
  .setKey(process.env.NEXT_APPWRITE_KEY);

export const usersAdmin = new Users(client);
export const databasesAdmin = new Databases(client);
export const storageAdmin = new Storage(client);
export const avatarsAdmin = new Avatars(client);
