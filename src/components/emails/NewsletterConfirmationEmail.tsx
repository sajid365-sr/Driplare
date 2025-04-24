
import React from 'react';

interface NewsletterConfirmationEmailProps {
  name: string;
}

export const NewsletterConfirmationEmail: React.FC<NewsletterConfirmationEmailProps> = ({ 
  name 
}) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ background: 'linear-gradient(135deg, #1A1F2C 0%, #333B51 100%)', padding: '20px', textAlign: 'center', borderRadius: '8px 8px 0 0' }}>
        <h1 style={{ color: '#F88220', margin: '0' }}>Driplare Newsletter</h1>
      </div>
      
      <div style={{ padding: '20px', backgroundColor: '#f9f9f9', color: '#333' }}>
        <h2>Welcome to Our Community, {name}!</h2>
        <p>Thank you for subscribing to the Driplare newsletter.</p>
        <p>You'll now receive our latest updates on:</p>
        
        <ul style={{ paddingLeft: '20px' }}>
          <li>AI and web development trends</li>
          <li>Digital marketing insights</li>
          <li>Case studies and success stories</li>
          <li>Exclusive tips and tutorials</li>
        </ul>
        
        <p>We're excited to share our knowledge with you!</p>
        
        <div style={{ marginTop: '30px', backgroundColor: '#F88220', padding: '15px', textAlign: 'center', borderRadius: '5px' }}>
          <a href="https://driplare.com/insights" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
            CHECK OUT OUR LATEST INSIGHTS
          </a>
        </div>
        
        <p style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
          If you didn't subscribe to our newsletter, please disregard this email.
        </p>
      </div>
      
      <div style={{ backgroundColor: '#1A1F2C', color: 'white', padding: '15px', textAlign: 'center', borderRadius: '0 0 8px 8px' }}>
        <p style={{ margin: '0', fontSize: '14px' }}>
          © {new Date().getFullYear()} Driplare. All rights reserved.
        </p>
      </div>
    </div>
  );
};
