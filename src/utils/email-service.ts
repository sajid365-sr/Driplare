
import { Resend } from 'resend';
import { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import { NewsletterConfirmationEmail } from '@/components/emails/NewsletterConfirmationEmail';
import { ContactConfirmationEmail } from '@/components/emails/ContactConfirmationEmail';

// Initialize Resend with API key from environment variable
const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export const sendNewsletterConfirmation = async (name: string, email: string) => {
  try {
    const emailComponent = <NewsletterConfirmationEmail name={name} />;
    const emailHtml = renderToString(emailComponent as ReactElement);
    
    const data = await resend.emails.send({
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
  try {
    const emailComponent = <ContactConfirmationEmail name={name} message={message} />;
    const emailHtml = renderToString(emailComponent as ReactElement);
    
    const data = await resend.emails.send({
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
  try {
    const adminEmailComponent = (
      <div>
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Company:</strong> {company}</p>
        <p><strong>Service Interest:</strong> {serviceInterest}</p>
        <p><strong>Message:</strong> {message}</p>
      </div>
    );
    
    const adminEmailHtml = renderToString(adminEmailComponent as ReactElement);
    
    const data = await resend.emails.send({
      from: 'Driplare Website <no-reply@driplare.com>',
      to: 'info@driplare.com', // Your admin email
      subject: 'New Contact Form Submission',
      html: adminEmailHtml,
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
  try {
    // Create form data rows
    const formDataRows = Object.entries(formData).map(
      ([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`
    );

    const genericEmailComponent = (
      <div>
        <h2>New Form Submission: {formType}</h2>
        <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody dangerouslySetInnerHTML={{ __html: formDataRows.join('') }} />
        </table>
        <p>This submission was received on {new Date().toLocaleString()}</p>
      </div>
    );
    
    const genericEmailHtml = renderToString(genericEmailComponent as ReactElement);
    
    const data = await resend.emails.send({
      from: 'Driplare Website <no-reply@driplare.com>',
      to: 'info@driplare.com', // Your admin email
      subject: `New ${formType} Submission`,
      html: genericEmailHtml,
    });

    console.log('Generic form submission email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send generic form submission:', error);
    return { success: false, error };
  }
};
