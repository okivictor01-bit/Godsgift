import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1a1a1a',
      color: 'white',
      padding: '3rem 1rem 1.5rem',
      marginTop: '3rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Brand */}
        <div>
          <h3 style={{ color: '#d4af37', marginBottom: '1rem', fontSize: '1.3rem' }}>
            God'sGift Essence
          </h3>
          <p style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Scented by Grace, Made to Leave a Mark. Premium fragrances and body care products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ marginBottom: '1rem', color: '#d4af37' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link href="/" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.9rem' }}>
                Home
              </Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link href="/about" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.9rem' }}>
                About Us
              </Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link href="/contact" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.9rem' }}>
                Contact
              </Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link href="/faq" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.9rem' }}>
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 style={{ marginBottom: '1rem', color: '#d4af37' }}>Legal</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link href="/privacy" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.9rem' }}>
                Privacy Policy
              </Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link href="/terms" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.9rem' }}>
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ marginBottom: '1rem', color: '#d4af37' }}>Contact Us</h4>
          <p style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: '1.8' }}>
            📧 info@godsgift.site<br />
             WhatsApp: +234 XXX XXX XXXX<br />
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
  );
}
