export async function POST(req) {
  try {
    const user = await req.json();
    const events = req.headers.get("x-appwrite-webhook-events").split(",");

    for (let i = 1; i <= events.length; i += 2) {
      const event = events[i];
      switch (event) {
        case "users.*.create":
          console.log("User created:", user);
          break;
        case "users.*.delete":
          console.log("User deleted:", user);
          break;
        case "users.*.sessions.*.create":
          console.log("User session created:", user);
          break;
        case "users.*.sessions.*.delete":
          console.log("User session deleted:", user);
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
          console.log(`Unhandled event: ${event}`);
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
