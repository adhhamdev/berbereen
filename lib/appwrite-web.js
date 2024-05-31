import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const createWebSessionClient = () => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

  return new Account(client);
};

export const createWebDatabasesClient = () => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

  return new Databases(client);
};

export const createWebStorageClient = () => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

  return new Storage(client);
};

export const createWebAvatarsClient = () => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

  return new Avatars(client);
};

export const getWebLoggedInUser = async () => {
  const account = createWebSessionClient();
  return await account.get();
};