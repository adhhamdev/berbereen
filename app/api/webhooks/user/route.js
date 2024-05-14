import {
  createDatabases,
  createUsers,
  createAvatars,
  createStorage,
} from "@/lib/server/appwrite";
import { InputFile } from "node-appwrite";

export const createUserEvent = async (user) => {
  console.log("user event running...")
  try {
    const database = createDatabases();
    const avatar = createAvatars();
    const iconBuffer = await avatar.getInitials();
    const storage = createStorage();
    const file = InputFile.fromBuffer(iconBuffer, "avatar-icon");
    const uploadedFile = await storage.createFile("primary", "", file);
    console.log(uploadedFile);
    const createdUser = await database.createDocument(
      "primary",
      "user",
      user.$id,
      { profilePicture: uploadedFile }
    );
    console.log("User created:", createdUser);
  } catch (error) {
    console.log(error);
  }
};

const deleteUserEvent = async (user) => {
  try {
    const databases = createDatabases();
    await databases.deleteDocument("primary", "user", user.$id);
    console.log("User deleted!");
  } catch (error) {
    console.log(error);
  }
};

const createSessionEvent = async (sessionUser) => {
  const { userId, provider } = sessionUser;
  if (provider === "email") {
    return;
  }
  const users = createUsers();
  const oauthUser = await users.get(userId);
  const databases = createDatabases();
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
  try {
    const database = createDatabases();
    const updatedUser = await database.updateDocument(
      "primary",
      "user",
      user.$id,
      {
        attribute: user[attribute],
      }
    );
    console.log(`User ${attribute} updated:`, updatedUser);
  } catch (error) {
    console.log(error);
  }
};

export async function POST(req) {
  try {
    const user = await req.json();
    const events = req.headers.get("x-appwrite-webhook-events").split(",");
    console.log("Events:", events)

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
