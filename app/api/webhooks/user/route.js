import { createDatabaseClient } from "@/lib/server/appwrite";

const createUserEvent = async (user) => {
  try {
    const { database } = await createDatabaseClient();
    const data = {
      name: user.name,
      registration: user.registration,
      status: user.status,
      passwordUpdate: user.passwordUpdate,
      email: user.email,
      phone: user.phone,
      emailVerification: user.emailVerification,
      phoneVerification: user.phoneVerification,
      mfa: user.mfa,
      createdAt: user.$createdAt,
      updatedAt: user.$updatedAt,
      accessedAt: user.accessedAt,
    };
    const createdUser = await database.createDocument(
      "primary",
      "user",
      user.$id,
      data
    );
    console.log("User created:", createdUser);
  } catch (error) {
    console.log(error);
  }
};

const deleteUserEvent = async (user) => {
  try {
    const { database } = await createDatabaseClient();
    const deletedUser = await database.deleteDocument(
      "primary",
      "user",
      user.$id
    );
    console.log("User deleted!");
  } catch (error) {
    console.log(error);
  }
};

const createSessionEvent = (user) => {
  console.log("Session created", user);
};
const deleteSessionEvent = (user) => {
  console.log("Session deleted", user);
};

const updateUserEvent = async (user, attribute) => {
  try {
    const { database } = await createDatabaseClient();
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
          createSessionEvent(user);
          break;
        case "users.*.sessions.*.delete":
          deleteSessionEvent(user);
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
          console.log(`Other event: ${event}`);
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
