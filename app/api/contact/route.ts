import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// HTML email template for client confirmation
function getClientConfirmationHTML(name: string, message: string) {
  // Replace with your actual contact details
  const calendarUrl = "https://cal.com/driplare";
  const whatsappNumber = "+8801305792949";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); color: white; padding: 30px 20px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 800;">✓ Message Received!</h1>
        </div>
        
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; padding: 30px 20px;">
          <p>Hi <strong>${name}</strong>,</p>
          
          <p>Thanks for reaching out to Driplare! We've received your inquiry and we're excited to help you automate your business.</p>
          
          <div style="background: #f9fafb; border-left: 4px solid #7c3aed; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <strong>Your Message:</strong>
            <p style="margin: 10px 0 0 0; color: #4b5563;">${message.substring(0, 200)}${message.length > 200 ? "..." : ""}</p>
          </div>
          
          <div style="background: #f0f9ff; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #3b82f6; margin-top: 0;">📅 What Happens Next?</h3>
            <ol style="margin: 10px 0; padding-left: 20px;">
              <li style="margin: 8px 0;"><strong>We review your message</strong> (usually within 2 hours)</li>
              <li style="margin: 8px 0;"><strong>We'll reply via email</strong> with initial thoughts and questions</li>
              <li style="margin: 8px 0;"><strong>Book a discovery call</strong> to dive deeper into your needs</li>
            </ol>
          </div>
          
          <div style="text-align: center; margin: 20px 0;">
            <a href="${calendarUrl}" style="display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
              📅 Book Your Discovery Call Now
            </a>
          </div>
          
          <div style="background: #f9fafb; border-radius: 8px; padding: 15px; margin: 20px 0;">
            <p style="margin: 8px 0;"><strong>Questions in the meantime?</strong></p>
            <p style="margin: 8px 0;">📧 Email: <a href="mailto:hello@driplare.com" style="color: #7c3aed; text-decoration: none;">hello@driplare.com</a></p>
            <p style="margin: 8px 0;">💬 WhatsApp: <a href="https://wa.me/${whatsappNumber}" style="color: #10b981; text-decoration: none;">${whatsappNumber}</a></p>
            <p style="margin: 8px 0;">⏰ Response time: Usually within 2 hours (GMT+6)</p>
          </div>
          
          <p style="margin-top: 30px;">Looking forward to working with you!</p>
          <p style="margin: 5px 0;"><strong>— The Driplare Team</strong></p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 14px;">
          <p>Driplare — AI Automation for Bangladesh & Beyond</p>
          <p>
            <a href="https://driplare.com" style="color: #7c3aed; text-decoration: none;">Visit our website</a> · 
            <a href="https://driplare.com/case-studies" style="color: #7c3aed; text-decoration: none; margin-left: 8px;">See our work</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// HTML email template for admin notification
function getAdminNotificationHTML(
  name: string,
  email: string,
  phone: string,
  company: string,
  service: string,
  message: string,
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #ef4444; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0;">🔥 New Contact Form Lead</h2>
        </div>
        <div style="border: 2px solid #ef4444; border-top: none; padding: 20px; border-radius: 0 0 8px 8px;">
          <div style="margin: 15px 0; padding: 10px; background: #f9fafb; border-radius: 6px;">
            <strong style="color: #1f2937; display: block; margin-bottom: 5px;">Name:</strong>
            <span>${name}</span>
          </div>
          
          <div style="margin: 15px 0; padding: 10px; background: #f9fafb; border-radius: 6px;">
            <strong style="color: #1f2937; display: block; margin-bottom: 5px;">Email:</strong>
            <a href="mailto:${email}" style="color: #7c3aed;">${email}</a>
          </div>
          
          <div style="margin: 15px 0; padding: 10px; background: #f9fafb; border-radius: 6px;">
            <strong style="color: #1f2937; display: block; margin-bottom: 5px;">Phone:</strong>
            <span>${phone || "Not provided"}</span>
          </div>
          
          <div style="margin: 15px 0; padding: 10px; background: #f9fafb; border-radius: 6px;">
            <strong style="color: #1f2937; display: block; margin-bottom: 5px;">Company:</strong>
            <span>${company || "Not provided"}</span>
          </div>
          
          <div style="margin: 15px 0; padding: 10px; background: #f9fafb; border-radius: 6px;">
            <strong style="color: #1f2937; display: block; margin-bottom: 5px;">Service Interest:</strong>
            <span style="background: #ddd6fe; color: #5b21b6; padding: 4px 12px; border-radius: 999px; font-weight: 600; display: inline-block;">${service}</span>
          </div>
          
          <div style="background: #fff7ed; border-left: 4px solid #f59e0b; padding: 15px; margin-top: 15px;">
            <strong style="display: block; margin-bottom: 10px;">Message:</strong>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="margin-top: 20px;"><strong>Received:</strong> ${new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })} (Dhaka time)</p>
          
          <a href="mailto:${email}?subject=Re: Your inquiry to Driplare" style="background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 15px;">Reply to ${name}</a>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, service, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 },
      );
    }

    // 1. Save to database
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || "",
        company: company || "",
        service,
        message,
        status: "new",
        source: "contact_page",
      },
    });

    // 2. Send confirmation email to client
    const clientEmailHtml = getClientConfirmationHTML(name, message);

    await resend.emails.send({
      from: "Driplare <hello@driplare.com>",
      to: email,
      subject: "We got your message — here's what's next",
      html: clientEmailHtml,
    });

    // 3. Send notification email to admin
    const adminEmailHtml = getAdminNotificationHTML(
      name,
      email,
      phone,
      company,
      service,
      message,
    );

    await resend.emails.send({
      from: "Driplare Notifications <no-reply@driplare.com>",
      to: process.env.ADMIN_NOTIFICATION_EMAIL || "lead@driplare.com",
      subject: `🔥 New Lead: ${name} — ${service}`,
      html: adminEmailHtml,
    });

    return NextResponse.json({
      success: true,
      submissionId: submission.id,
    });
  } catch (error: any) {
    console.error("Contact form API error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error.message || "Failed to submit contact form. Please try again.",
      },
      { status: 500 },
    );
  }
}
