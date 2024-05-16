import {
  createDatabasesClient,
  createStorageClient,
  createAvatarsClient,
  createUsersClient,
} from "@/lib/server/appwrite";
import { InputFile } from "node-appwrite";

export const createUserEvent = async (user) => {
  try {
    const { databases } = await createDatabasesClient();
    console.log("db")
    const { avatars } = await createAvatarsClient();
    console.log("av")
    const iconBuffer = await avatars.getInitials();
    console.log("iconBuffer")
    const { storage } = await createStorageClient();
    console.log("storage")
    
    const file = InputFile.fromStream(iconBuffer, "avatar")
    const uploadedFile = await storage.createFile(
      "primary",
      crypto.randomUUID(),
      file
    );
    console.log(uploadedFile);
    const createdUser = await databases.createDocument(
      "primary",
      "user",
      user.$id || crypto.randomUUID(),
      { profilePicture: uploadedFile }
    );
    console.log("User created:", createdUser);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

const deleteUserEvent = async (user) => {
  console.log("user delete event running");
  const { databases } = await createDatabasesClient();
  await databases.deleteDocument("primary", "user", user.$id);
  console.log("User deleted!");
};

const createSessionEvent = async (sessionUser) => {
  console.log("user create session event running");
  const { userId, provider } = sessionUser;
  if (provider === "email") {
    return;
  }
  const { users } = await createUsersClient();
  const oauthUser = await users.get(userId);
  const { databases } = await createDatabasesClient();
  const createdUser = await databases.createDocument(
    "primary",
    "user",
    oauthUser.$id,
    { profilePicture: "" }
  );
  console.log("User created from Google:", createdUser);
};
const deleteSessionEvent = async (user) => {
  console.log("Session deleted", user);
};

const updateUserEvent = async (user, attribute) => {
  console.log("user update user event running");
  const { databases } = await createDatabasesClient();
  const updatedUser = await databases.updateDocument(
    "primary",
    "user",
    user.$id,
    {
      attribute: user[attribute],
    }
  );
  console.log(`User ${attribute} updated:`, updatedUser);
};

export async function POST(req) {
  try {
    const user = await req.json();
    const events = req.headers.get("x-appwrite-webhook-events").split(",");
    console.log("Events:", events);

    for (let i = 1; i < events.length; i += 2) {
      const event = events[i];
      switch (event) {
        case "users.*.create":
          await createUserEvent(user);
          break;
        case "users.*.delete":
          await deleteUserEvent(user);
          break;
        case "users.*.sessions.*.create":
          await createSessionEvent(user);
          break;
        case "users.*.sessions.*.delete":
          await deleteSessionEvent(user);
          break;
        case "users.*.update.email":
          await updateUserEvent(user, "email");
          break;
        case "users.*.update.name":
          await updateUserEvent(user, "name");
          break;
        case "users.*.update.password":
          await updateUserEvent(user, "passwordUpdate");
          break;
        case "users.*.update.status":
          await updateUserEvent(user, "status");
          break;
        case "users.*.update.prefs":
          await updateUserEvent(user, "prefs");
          break;
        default:
          break;
      }
    }
  } catch (error) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }

  return new Response("Success!", {
    status: 200,
  });
}
