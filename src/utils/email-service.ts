
import { Resend } from 'resend';
import { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import { NewsletterConfirmationEmail } from '@/components/emails/NewsletterConfirmationEmail';
import { ContactConfirmationEmail } from '@/components/emails/ContactConfirmationEmail';
import { toast } from 'sonner';
import { getResendApiKey } from './api-key-manager';

const createResendInstance = () => {
  const apiKey = getResendApiKey();
  return apiKey ? new Resend(apiKey) : null;
};

// Helper function to check if Resend is properly initialized
const isResendConfigured = () => {
  const resend = createResendInstance();
  if (!resend) {
    console.error("Resend API key is missing. Email functionality is disabled.");
    toast.error("Email service is not configured. Please set your API key.");
    return false;
  }
  return true;
};

export const sendNewsletterConfirmation = async (name: string, email: string) => {
  if (!isResendConfigured()) {
    return { success: false, error: "Email service not configured" };
  }

  try {
    const emailComponent = NewsletterConfirmationEmail({ name });
    const emailHtml = renderToString(emailComponent as ReactElement);
    
    const data = await resend!.emails.send({
      from: 'Driplare <hello@driplare.com>',
      to: email,
      subject: 'Welcome to the Driplare Newsletter!',
      html: emailHtml,
    });

    console.log('Newsletter confirmation email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send newsletter confirmation:', error);
    return { success: false, error };
  }
};

export const sendContactFormConfirmation = async (
  name: string,
  email: string,
  message: string
) => {
  if (!isResendConfigured()) {
    return { success: false, error: "Email service not configured" };
  }

  try {
    const emailComponent = ContactConfirmationEmail({ name, message });
    const emailHtml = renderToString(emailComponent as ReactElement);
    
    const data = await resend!.emails.send({
      from: 'Driplare <hello@driplare.com>',
      to: email,
      subject: 'We received your message - Driplare',
      html: emailHtml,
    });

    console.log('Contact form confirmation email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send contact confirmation:', error);
    return { success: false, error };
  }
};

export const sendContactNotificationToAdmin = async (
  name: string,
  email: string,
  company: string,
  serviceInterest: string,
  message: string
) => {
  if (!isResendConfigured()) {
    return { success: false, error: "Email service not configured" };
  }

  try {
    const adminEmailContent = `
      <div>
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Service Interest:</strong> ${serviceInterest}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
    `;
    
    const data = await resend!.emails.send({
      from: 'Driplare Website <no-reply@driplare.com>',
      to: 'info@driplare.com', // Your admin email
      subject: 'New Contact Form Submission',
      html: adminEmailContent,
    });

    console.log('Admin notification email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    return { success: false, error };
  }
};

export const sendGenericFormSubmissionToAdmin = async (
  formType: string,
  formData: Record<string, string>
) => {
  if (!isResendConfigured()) {
    return { success: false, error: "Email service not configured" };
  }

  try {
    // Create form data rows
    const formDataRows = Object.entries(formData).map(
      ([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`
    ).join('');

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
    
    const data = await resend!.emails.send({
      from: 'Driplare Website <no-reply@driplare.com>',
      to: 'info@driplare.com', // Your admin email
      subject: `New ${formType} Submission`,
      html: genericEmailContent,
    });

    console.log('Generic form submission email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send generic form submission:', error);
    return { success: false, error };
  }
};
