'use client';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = '2348149189463';
    const text = `Hello God'sGift Essence!%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0A%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
    setSent(true);
  };

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '1rem' }}>
        Contact Us
      </h1>
      <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '3rem', fontSize: '1.1rem' }}>
        We'd love to hear from you! Reach out anytime.
      </p>

      <div style={{ display: 'grid', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></div>
            <h3 style={{ color: '#1a1a1a', marginBottom: '0.5rem' }}>WhatsApp</h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1rem' }}>Fastest response</p>
            <a 
              href="https://wa.me/2348149189463" 
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#25D366', textDecoration: 'none', fontWeight: 'bold' }}
            >
              Chat Now →
            </a>
          </div>

          <div style={{ padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📧</div>
            <h3 style={{ color: '#1a1a1a', marginBottom: '0.5rem' }}>Email</h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1rem' }}>For inquiries</p>
            <a 
              href="mailto:info@godsgift.site" 
              style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}
            >
              info@godsgift.site
            </a>
          </div>

          <div style={{ padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📍</div>
            <h3 style={{ color: '#1a1a1a', marginBottom: '0.5rem' }}>Location</h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1rem' }}>Based in</p>
            <p style={{ color: '#1a1a1a', fontWeight: 'bold' }}>Nigeria 🇳🇬</p>
          </div>
        </div>

        <div style={{ padding: '2rem', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
          <h2 style={{ color: '#1a1a1a', marginBottom: '1rem', textAlign: 'center' }}>Send Us a Message</h2>
          
          {sent ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h3 style={{ color: '#16a34a', marginBottom: '0.5rem' }}>Message Sent!</h3>
              <p style={{ color: '#6b7280' }}>We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem' }}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem' }}
              />
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', fontFamily: 'inherit' }}
              />
              <button
                type="submit"
                style={{
                  padding: '1rem',
                  backgroundColor: '#25D366',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                Send via WhatsApp
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
