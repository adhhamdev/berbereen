import {
  createDatabasesClient,
  createStorageClient,
  createAvatarsClient,
} from "@/lib/server/appwrite";
import { GoogleAuth } from "google-auth-library";
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
    console.log("User deleted!");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

const createSessionEvent = async (sessionUser) => {
  // const { userId, provider } = sessionUser;
  // if (provider === "email") {
  //   return;
  // }
  console.log(sessionUser);
  
  // const client = new OAuth2Client(sessionUser.providerUid);
  // const ticket = await client.verifyIdToken({
  //   idToken: secret,
  //   audience: sessionUser.providerUid,
  // });
  // const payload = ticket.getPayload();
  // const userInfo = {
  //   name: payload.name,
  //   email: payload.email,
  //   picture: payload.picture,
  // };
  // console.log(userInfo);
  // const { databases } = await createDatabasesClient();
  // const createdUser = await databases.createDocument(
  //   "primary",
  //   "user",
  //   userId,
  //   { avatar: "" }
  // );
  // console.log("User created from Google:", createdUser);
};

const deleteSessionEvent = async (user) => {
  console.log("Session deleted", user);
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
      "users.*.create": createUserEvent,
      "users.*.delete": deleteUserEvent,
      "users.*.sessions.*.create": createSessionEvent,
      "users.*.sessions.*.delete": deleteSessionEvent,
      "users.*.update.email": () => updateUserEvent(user, "email"),
      "users.*.update.name": () => updateUserEvent(user, "name"),
      "users.*.update.password": () => updateUserEvent(user, "passwordUpdate"),
      "users.*.update.status": () => updateUserEvent(user, "status"),
      "users.*.update.prefs": () => updateUserEvent(user, "prefs"),
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
