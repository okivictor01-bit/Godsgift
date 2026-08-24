import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        
        {/* Simple Test Footer */}
        <div style={{ 
          backgroundColor: '#1a1a1a', 
          color: 'white', 
          padding: '2rem', 
          textAlign: 'center',
          marginTop: '2rem'
        }}>
          <h3>God'sGift Essence</h3>
          <p>Scented by Grace, Made to Leave a Mark</p>
          <p style={{ fontSize: '0.8rem', marginTop: '1rem', color: '#9ca3af' }}>
            © 2026 All Rights Reserved
          </p>
        </div>

        {/* Simple WhatsApp Button */}
        <a 
          href="https://wa.me/2348000000000" 
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
          <span style={{ color: 'white', fontSize: '2rem' }}></span>
        </a>
      </body>
    </html>
  );
}
