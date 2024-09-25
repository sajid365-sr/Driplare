import { Resend } from "resend";

const resend = new Resend("re_YOUR_API_KEY");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    try {
      // Save the email to your database here

      // Send a confirmation email
      await resend.emails.send({
        from: "Your Company <onboarding@resend.dev>",
        to: email,
        subject: "Thanks for subscribing!",
        html: "<p>We'll keep you updated on our progress.</p>",
      });

      res.status(200).json({ message: "Subscribed successfully" });
    } catch (error) {
      console.error("Subscription error:", error);
      res.status(500).json({ error: "Failed to subscribe" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
