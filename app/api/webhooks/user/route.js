import {
  createDatabasesClient,
  createStorageClient,
  createAvatarsClient,
  createUsersClient,
} from "@/lib/server/appwrite";
import { ID, InputFile } from "node-appwrite";

export const createUserEvent = async (user) => {
  try {
    const { avatars } = await createAvatarsClient();
    const { storage } = await createStorageClient();
    const { databases } = await createDatabasesClient();
    const initialsAvatar = await avatars.getInitials(user.name);
    const iconBuffer = Buffer.from(initialsAvatar, "base64");
    const file = InputFile.fromBuffer(iconBuffer, "avatar");
    const uploadedFile = await storage.createFile("primary", ID.unique(), file);
    const createdUser = await databases.createDocument(
      "primary",
      "user",
      user.$id,
      { avatar: uploadedFile.$id }
    );
    console.log("User created:", createdUser);
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(
      "An error occurred while creating your account. Please try again later."
    );
  }
};

const deleteUserEvent = async (user) => {
  try {
    const { databases } = await createDatabasesClient();
    const { storage } = await createStorageClient();
    const userDoc = await databases.getDocument("primary", "user", user.$id);
    await storage.deleteFile("primary", userDoc.avatar);
    await databases.deleteDocument("primary", "user", user.$id);
    console.log("User Data deleted!");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

const createSessionEvent = async (userSession) => {
  const { provider, $id } = userSession;
  if (provider === "email") {
    return;
  }
  try {
    console.log(userSession);
    const { users } = await createUsersClient();
    const user = await users.console.log(user);
    const { avatars } = await createAvatarsClient();
    const { storage } = await createStorageClient();
    const { databases } = await createDatabasesClient();
    const initialsAvatar = await avatars.getInitials(user.name);
    const iconBuffer = Buffer.from(initialsAvatar, "base64");
    const file = InputFile.fromBuffer(iconBuffer, "avatar");
    const uploadedFile = await storage.createFile("primary", ID.unique(), file);
    const createdUser = await databases.createDocument("primary", "user", $id, {
      avatar: uploadedFile.$id,
    });
    if (!createdUser) {
      throw new Error(
        "An error occurred while creating your account. Please try again."
      );
    }
    console.log("User created:", createdUser);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteSessionEvent = async (userSession) => {
  console.log("Session deleted", userSession);
};

const updateUserEvent = async (user, attribute) => {
  try {
    const { databases } = await createDatabasesClient();
    const updatedUser = await databases.updateDocument(
      "primary",
      "user",
      user.$id,
      { [attribute]: user[attribute] }
    );
    console.log(`User ${attribute} updated:`, updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export async function POST(req) {
  try {
    const user = await req.json();
    const events = req.headers.get("x-appwrite-webhook-events").split(",");

    const eventHandlers = {
      "users.*.create": (user) => createUserEvent(user),
      "users.*.delete": (user) => deleteUserEvent(user),
      "users.*.sessions.*.create": (user) => createSessionEvent(user),
      "users.*.sessions.*.delete": (user) => deleteSessionEvent(user),
      "users.*.update.email": (user) => updateUserEvent(user, "email"),
      "users.*.update.name": (user) => updateUserEvent(user, "name"),
      "users.*.update.password": (user) => updateUserEvent(user, "passwordUpdate"),
      "users.*.update.status": (user) => updateUserEvent(user, "status"),
      "users.*.update.prefs": (user) => updateUserEvent(user, "prefs"),
    };

    for (const event of events) {
      const handler = eventHandlers[event];
      if (handler) {
        try {
          await handler(user);
        } catch (error) {
          console.error(`Webhook error for event ${event}:`, error);
          return new Response(
            "An error occurred while processing the request. Please try again later.",
            {
              status: 500,
            }
          );
        }
      }
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      "An error occurred while processing the request. Please try again later.",
      {
        status: 500,
      }
    );
  }

  return new Response("Success!", {
    status: 200,
  });
}
