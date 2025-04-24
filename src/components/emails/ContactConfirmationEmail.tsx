
import React from 'react';

interface ContactConfirmationEmailProps {
  name: string;
  message: string;
}

export const ContactConfirmationEmail: React.FC<ContactConfirmationEmailProps> = ({ 
  name,
  message
}) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ background: 'linear-gradient(135deg, #1A1F2C 0%, #333B51 100%)', padding: '20px', textAlign: 'center', borderRadius: '8px 8px 0 0' }}>
        <h1 style={{ color: '#F88220', margin: '0' }}>Driplare</h1>
      </div>
      
      <div style={{ padding: '25px', backgroundColor: '#f9f9f9', color: '#333' }}>
        <h2>Thank You For Contacting Us, {name}!</h2>
        <p>We have received your message:</p>
        
        <div style={{ 
          backgroundColor: '#eee', 
          padding: '15px', 
          borderRadius: '5px',
          border: '1px solid #ddd',
          marginBottom: '20px',
          fontStyle: 'italic'
        }}>
          "{message}"
        </div>
        
        <p>Our team will review your inquiry and get back to you as soon as possible, typically within 24-48 business hours.</p>
        
        <p>In the meantime, feel free to explore our services and recent projects on our website.</p>
        
        <div style={{ marginTop: '30px', backgroundColor: '#F88220', padding: '15px', textAlign: 'center', borderRadius: '5px' }}>
          <a href="https://driplare.com/portfolio" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
            EXPLORE OUR PORTFOLIO
          </a>
        </div>
      </div>
      
      <div style={{ backgroundColor: '#1A1F2C', color: 'white', padding: '15px', textAlign: 'center', borderRadius: '0 0 8px 8px' }}>
        <p style={{ margin: '0', fontSize: '14px' }}>
          © {new Date().getFullYear()} Driplare. All rights reserved.
        </p>
      </div>
    </div>
  );
};
