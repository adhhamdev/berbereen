"use server";
import {
  Client,
  Account,
  Users,
  Databases,
  Avatars,
  Storage,
} from "node-appwrite";
import { cookies } from "next/headers";

async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);
  const session = cookies().get("user-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }
  client.setSession(session.value);
  return client;
}

async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(process.env.NEXT_APPWRITE_KEY);
  return client;
}

export async function createAccount(type) {
  let account;
  if (type == "admin") {
    account = new Account(createAdminClient());
  } else {
    account = new Account(createSessionClient());
  }
  return account;
}

export async function createUsers(type) {
  const users = new Users(
    type == "admin" ? createAdminClient() : createSessionClient()
  );
  return users;
}

export async function createDatabases(type) {
  const database = new Databases(
    type == "admin" ? createAdminClient() : createSessionClient()
  );
  return database;
}

export async function createStorage(type) {
  const storage = new Storage(
    type == "admin" ? createAdminClient() : createSessionClient()
  );
  return storage;
}

export async function createAvatars() {
  const avatar = new Avatars(createSessionClient());
  return avatar;
}

export async function getLoggedInUser() {
  try {
    const account = createAccount();
    return await account.get();
  } catch (error) {
    return null;
  }
}
