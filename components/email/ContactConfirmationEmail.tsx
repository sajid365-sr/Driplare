// components/email/ContactConfirmationEmail.tsx

interface ContactConfirmationEmailProps {
  name: string;
  message: string;
}

export function ContactConfirmationEmail({
  name,
  message,
}: ContactConfirmationEmailProps) {
  // Replace these with your actual contact details
  const calendarUrl = "https://cal.com/driplare/30min";
  const whatsappNumber = "+8801305792929";

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)', color: 'white', padding: '30px 20px', borderRadius: '12px 12px 0 0', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800 }}>✓ Message Received!</h1>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '30px 20px' }}>
        <p>Hi <strong>{name}</strong>,</p>

        <p>Thanks for reaching out to Driplare! We've received your inquiry and we're excited to help you automate your business.</p>

        <div style={{ background: '#f9fafb', borderLeft: '4px solid #7c3aed', padding: '15px', margin: '20px 0', borderRadius: '4px' }}>
          <strong>Your Message:</strong>
          <p style={{ margin: '10px 0 0 0', color: '#4b5563' }}>{message.substring(0, 200)}{message.length > 200 ? '...' : ''}</p>
        </div>

        <div style={{ background: '#f0f9ff', borderRadius: '8px', padding: '20px', margin: '20px 0' }}>
          <h3 style={{ color: '#3b82f6', marginTop: 0 }}>📅 What Happens Next?</h3>
          <ol style={{ margin: '10px 0', paddingLeft: '20px' }}>
            <li style={{ margin: '8px 0' }}><strong>We review your message</strong> (usually within 2 hours)</li>
            <li style={{ margin: '8px 0' }}><strong>We'll reply via email</strong> with initial thoughts and questions</li>
            <li style={{ margin: '8px 0' }}><strong>Book a discovery call</strong> to dive deeper into your needs</li>
          </ol>
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <a href={calendarUrl} style={{ display: 'inline-block', background: '#7c3aed', color: 'white', padding: '12px 24px', textDecoration: 'none', borderRadius: '8px', fontWeight: 600 }}>
            📅 Book Your Discovery Call Now
          </a>
        </div>

        <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '15px', margin: '20px 0' }}>
          <p style={{ margin: '8px 0' }}><strong>Questions in the meantime?</strong></p>
          <p style={{ margin: '8px 0' }}>📧 Email: <a href="mailto:hello@driplare.com" style={{ color: '#7c3aed', textDecoration: 'none' }}>hello@driplare.com</a></p>
          <p style={{ margin: '8px 0' }}>💬 WhatsApp: <a href={`https://wa.me/${whatsappNumber}`} style={{ color: '#10b981', textDecoration: 'none' }}>{whatsappNumber}</a></p>
          <p style={{ margin: '8px 0' }}>⏰ Response time: Usually within 2 hours (GMT+6)</p>
        </div>

        <p style={{ marginTop: '30px' }}>Looking forward to working with you!</p>
        <p style={{ margin: '5px 0' }}><strong>— The Driplare Team</strong></p>
      </div>

      <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280', fontSize: '14px' }}>
        <p>Driplare — AI Automation for Bangladesh & Beyond</p>
        <p>
          <a href="https://driplare.com" style={{ color: '#7c3aed', textDecoration: 'none' }}>Visit our website</a> ·
          <a href="https://driplare.com/case-studies" style={{ color: '#7c3aed', textDecoration: 'none', marginLeft: '8px' }}>See our work</a>
        </p>
      </div>
    </div>
  );
}