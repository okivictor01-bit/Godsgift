import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', margin: 0 }}>

        {/* Main Content Area */}
        <div style={{ flex: 1 }}>
          {children}
        </div>

        {/* Full Footer with Navigation Links */}
        <footer style={{
          backgroundColor: '#1a1a1a',
          color: 'white',
          padding: '3rem 1rem 1.5rem',
          marginTop: 'auto'
        }}>
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {/* Brand Section */}
            <div style={{ flex: '1 1 250px' }}>
              <h3 style={{ color: '#d4af37', marginBottom: '1rem', fontSize: '1.3rem' }}>God'sGift Essence</h3>
              <p style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Scented by Grace, Made to Leave a Mark. Premium fragrances and body care products.
              </p>
            </div>

            {/* Quick Links */}
            <div style={{ flex: '1 1 150px' }}>
              <h4 style={{ marginBottom: '1rem', color: '#d4af37' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}><Link href="/" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.9rem' }}>Home</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link href="/about" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link href="/contact" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.9rem' }}>Contact</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link href="/faq" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.9rem' }}>FAQ</Link></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div style={{ flex: '1 1 150px' }}>
              <h4 style={{ marginBottom: '1rem', color: '#d4af37' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}><Link href="/privacy" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link href="/terms" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.9rem' }}>Terms & Conditions</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div style={{ flex: '1 1 200px' }}>
              <h4 style={{ marginBottom: '1rem', color: '#d4af37' }}>Contact Us</h4>
              <p style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: '1.8' }}>
                📧 info@godsgift.site<br />
                📍 Nigeria
              </p>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid #374151',
            paddingTop: '1.5rem',
            textAlign: 'center',
            color: '#9ca3af',
            fontSize: '0.85rem'
          }}>
            © {new Date().getFullYear()} God'sGift Essence. All rights reserved.
          </div>
        </footer>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/2348149189463" 
          target="_blank"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            backgroundColor: '#25D366',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 1000,
            textDecoration: 'none'
          }}
        >
          <span style={{ color: 'white', fontSize: '2rem' }}>💬</span>
        </a>

      </body>
    </html>
  );
}
