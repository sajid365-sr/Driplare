"use client";

import { Resend } from "resend";
import { ReactElement } from "react";
import { renderToString } from "react-dom/server";
import { toast } from "sonner";
import { getResendApiKey } from "./api-key-manager";
import { NewsletterConfirmationEmail } from "@/components/email/NewsletterConfirmationEmail";
import { ContactConfirmationEmail } from "@/components/email/ContactConfirmationEmail";

// Create a resend instance based on available API key
const createResendInstance = () => {
  const apiKey = getResendApiKey() || "Test Key";
  return new Resend(apiKey);
};

export const sendNewsletterConfirmation = async (
  name: string,
  email: string,
) => {
  try {
    const resendInstance = createResendInstance();
    const emailComponent = NewsletterConfirmationEmail({ name });
    const emailHtml = renderToString(emailComponent as ReactElement);

    const data = await resendInstance.emails.send({
      from: "Driplare <hello@driplare.com>",
      to: email,
      subject: "Welcome to the Driplare Newsletter!",
      html: emailHtml,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });

    console.log("Newsletter confirmation email sent:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send newsletter confirmation:", error);
    return { success: false, error };
  }
};

export const sendContactFormConfirmation = async (
  name: string,
  email: string,
  message: string,
) => {
  try {
    const resendInstance = createResendInstance();
    const emailComponent = ContactConfirmationEmail({ name, message });
    const emailHtml = renderToString(emailComponent as ReactElement);

    const data = await resendInstance.emails.send({
      from: "Driplare <hello@driplare.com>",
      to: email,
      subject: "We received your message - Driplare",
      html: emailHtml,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });

    console.log("Contact form confirmation email sent:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send contact confirmation:", error);
    return { success: false, error };
  }
};

export const sendContactNotificationToAdmin = async (
  name: string,
  email: string,
  company: string,
  serviceInterest: string,
  message: string,
) => {
  try {
    const resendInstance = createResendInstance();
    const adminEmailContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
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
            <strong style="color: #1f2937; display: block; margin-bottom: 5px;">Company:</strong>
            <span>${company}</span>
          </div>
          
          <div style="margin: 15px 0; padding: 10px; background: #f9fafb; border-radius: 6px;">
            <strong style="color: #1f2937; display: block; margin-bottom: 5px;">Service Interest:</strong>
            <span style="background: #ddd6fe; color: #5b21b6; padding: 4px 12px; border-radius: 999px; font-weight: 600; display: inline-block;">${serviceInterest}</span>
          </div>
          
          <div style="background: #fff7ed; border-left: 4px solid #f59e0b; padding: 15px; margin-top: 15px;">
            <strong style="display: block; margin-bottom: 10px;">Message:</strong>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="margin-top: 20px;"><strong>Received:</strong> ${new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })} (Dhaka time)</p>
          
          <a href="mailto:${email}?subject=Re: Your inquiry to Driplare" style="background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 15px;">Reply to ${name}</a>
        </div>
      </div>
    `;

    const data = await resendInstance.emails.send({
      from: "Driplare Notifications <no-reply@driplare.com>",
      to: "info@driplare.com", // Your admin email
      subject: `🔥 New Lead: ${name} — ${serviceInterest}`,
      html: adminEmailContent,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });

    console.log("Admin notification email sent:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send admin notification:", error);
    return { success: false, error };
  }
};

export const sendGenericFormSubmissionToAdmin = async (
  formType: string,
  formData: Record<string, string>,
) => {
  try {
    const resendInstance = createResendInstance();
    // Create form data rows
    const formDataRows = Object.entries(formData)
      .map(([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`)
      .join("");

    const genericEmailContent = `
      <div>
        <h2>New Form Submission: ${formType}</h2>
        <table border="1" cellPadding="5" style="border-collapse: collapse">
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            ${formDataRows}
          </tbody>
        </table>
        <p>This submission was received on ${new Date().toLocaleString()}</p>
      </div>
    `;

    const data = await resendInstance.emails.send({
      from: "Driplare Website <no-reply@driplare.com>",
      to: "info@driplare.com", // Your admin email
      subject: `New ${formType} Submission`,
      html: genericEmailContent,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });

    console.log("Generic form submission email sent:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send generic form submission:", error);
    return { success: false, error };
  }
};

// Helper function to check and set API key status
export const checkApiKeyStatus = async () => {
  const apiKey = getResendApiKey();
  if (!apiKey || apiKey === "Test Key") {
    toast.warning(
      "Email functionality is limited. Please set a valid Resend API key.",
    );
    return false;
  }
  return true;
};
