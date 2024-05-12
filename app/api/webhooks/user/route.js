import {
  createDatabaseClient,
  createSessionClient,
  createUsersClient,
} from "@/lib/server/appwrite";

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
      accessedAt: user.accessedAt,
    };
    await database.createDocument("primary", "user", user.$id, data);
  } catch (error) {
    throw new Error(error.message)
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
          console.log("User deleted:", user);
          break;
        case "users.*.update.email":
          console.log("User email updated:", user);
          break;
        case "users.*.update.name":
          console.log("User name updated:", user);
          break;
        case "users.*.update.password":
          console.log("User password updated:", user);
          break;
        case "users.*.update.status":
          console.log("User status updated:", user);
          break;
        case "users.*.update.prefs":
          console.log("User preferences updated:", user);
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
