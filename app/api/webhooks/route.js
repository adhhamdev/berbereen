export async function POST(req) {
  try {
    const text = await request.text();
    console.log(text);
  } catch (error) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }

  return new Response("Success!", {
    status: 200,
  });
}
