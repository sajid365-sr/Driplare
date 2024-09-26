import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req, {}) {
  const { email } = await req.json();

  // console.log(email);
  return NextResponse.json("Test Successful");
}
