import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(res) {
  try {
    await resend.emails.send({
      from: "Your Company <onboarding@resend.dev>",
      to: res.body.email,
      subject: "Thanks for subscribing!",
      html: "<p>We'll keep you updated on our progress.</p>",
    });

    NextResponse.json({ message: "Subscribed successfully" });
  } catch (error) {
    console.error("Subscription error:", error);
    NextResponse.json({ error: "Failed to subscribe" });
  }
}