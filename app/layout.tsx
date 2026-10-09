import { Inter } from 'next/font/google';
import Script from 'next/script';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "God'sGift Essence",
  description: 'Scented by Grace, Made to Leave a Mark',
  manifest: '/manifest.json',
  themeColor: '#1a1a1a',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: "God'sGift Essence",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#1a1a1a" />
        <Script src="https://js.paystack.co/v1/inline.js" strategy="beforeInteractive" />
      </head>
      <body className={inter.className} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', margin: 0, backgroundColor: '#ffffff' }}>
        
        {/* Top Logo Bar */}
        <div style={{ backgroundColor: 'white', padding: '1rem', textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>
          <img 
            src="/logo.png" 
            alt="God'sGift Essence Logo" 
            style={{ height: '60px', width: 'auto', maxWidth: '100%' }} 
          />
        </div>

        {/* Main Content */}
        <div style={{ flex: 1 }}>{children}</div>

        {/* Full Footer */}
        <footer style={{ backgroundColor: '#1a1a1a', color: 'white', padding: '3rem 1rem 1rem 1rem', marginTop: 'auto' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem' }}>
            
            {/* Brand Section */}
            <div style={{ flex: '1 1 250px' }}>
              <h3 style={{ color: '#fbbf24', marginBottom: '1rem', fontSize: '1.2rem' }}>God'sGift Essence</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.5' }}>Scented by Grace, Made to Leave a Mark.</p>
            </div>

            {/* Quick Links */}
            <div style={{ flex: '1 1 150px' }}>
              <h4 style={{ color: '#fbbf24', marginBottom: '1rem', fontSize: '1rem' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem' }}>Home</Link>
                <Link href="/about" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</Link>
                <Link href="/contact" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem' }}>Contact</Link>
                <Link href="/faq" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem' }}>FAQ</Link>
              </div>
            </div>

            {/* Legal */}
            <div style={{ flex: '1 1 150px' }}>
              <h4 style={{ color: '#fbbf24', marginBottom: '1rem', fontSize: '1rem' }}>Legal</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link href="/privacy" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</Link>
                <Link href="/terms" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem' }}>Terms & Conditions</Link>
              </div>
            </div>

            {/* Contact Info */}
            <div style={{ flex: '1 1 200px' }}>
              <h4 style={{ color: '#fbbf24', marginBottom: '1rem', fontSize: '1rem' }}>Contact Us</h4>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>info@godsgift.site</p>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: 0 }}>Nigeria</p>
            </div>
          </div>
          
          {/* Bottom Copyright */}
          <div style={{ borderTop: '1px solid #374151', marginTop: '2rem', paddingTop: '1rem', textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>
              © {new Date().getFullYear()} God'sGift Essence. All rights reserved.
            </p>
          </div>
        </footer>

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/2348149189463"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'fixed', bottom: '20px', right: '20px', width: '60px', height: '60px',
            backgroundColor: '#25D366', borderRadius: '50%', display: 'flex',
            alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 1000, textDecoration: 'none'
          }}
        >
          <span style={{ color: 'white', fontSize: '2rem' }}>💬</span>
        </a>

      </body>
    </html>
  );
}
