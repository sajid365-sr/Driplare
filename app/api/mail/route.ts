import { NextResponse } from "next/server";
import { Resend } from "resend";
import { WelcomeEmail } from "@/emails/index";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: Request, res: Response) {
  const { email, userFirstName } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "Driplare <customer@driplare.com>",
      to: [email],
      subject: "Thank You",
      react: WelcomeEmail({ userFirstName }),
    });

    if (error) {
      console.log(error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
