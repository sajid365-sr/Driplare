import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, userId } = await req.json();

    // n8n Webhook URL
    const N8N_WEBHOOK_URL =
      "https://n8n.driplare.com/webhook-test/driplare-chat";

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        userId,
        timestamp: new Date().toISOString(),
      }),
    });

    // রেসপন্স চেক করা
    if (!response.ok) {
      const errorText = await response.text();
      console.error("n8n Error Response:", errorText);
      throw new Error("n8n connection failed");
    }

    // বডি খালি কিনা চেক করা (SyntaxError এড়াতে)
    const text = await response.text();
    if (!text) {
      return NextResponse.json({
        text: "I'm processing your request, please wait...",
      });
    }

    const data = JSON.parse(text);
    console.log("DATA FROM N8N:", data);

    // n8n থেকে আসা ডাটা ফ্রন্টএন্ডে পাঠানো
    // n8n-এ আমরা 'output' কি (key) ব্যবহার করছি, তাই এখানে data.output হবে
    return NextResponse.json({
      text: data.output || data.response || "Driplare AI is ready to help!",
    });
  } catch (error) {
    console.error("Chat API Error Details:", error);
    return NextResponse.json(
      { error: "I'm having trouble connecting to my brain. Please try again." },
      { status: 500 }
    );
  }
}
