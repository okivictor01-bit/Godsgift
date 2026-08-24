import Footer from '@/components/Footer';

export default function Privacy() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '1rem' }}>Privacy Policy</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Last updated: August 2026</p>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#d4af37', fontSize: '1.5rem', marginBottom: '0.75rem' }}>1. Information We Collect</h2>
        <p style={{ lineHeight: '1.8', color: '#374151' }}>
          We collect information you provide directly, such as your name, email address, phone number, 
          and delivery address when you place an order. We also automatically collect certain information 
          about your device when you visit our website.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#d4af37', fontSize: '1.5rem', marginBottom: '0.75rem' }}>2. How We Use Your Information</h2>
        <ul style={{ lineHeight: '1.8', color: '#374151', paddingLeft: '1.5rem' }}>
          <li>To process and deliver your orders</li>
          <li>To communicate with you about your orders</li>
          <li>To send promotional offers (with your consent)</li>
          <li>To improve our website and services</li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#d4af37', fontSize: '1.5rem', marginBottom: '0.75rem' }}>3. Payment Information</h2>
        <p style={{ lineHeight: '1.8', color: '#374151' }}>
          All payments are processed securely through Paystack. We do not store your credit card details 
          on our servers. Paystack is PCI-DSS compliant and uses industry-standard encryption.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#d4af37', fontSize: '1.5rem', marginBottom: '0.75rem' }}>4. Data Sharing</h2>
        <p style={{ lineHeight: '1.8', color: '#374151' }}>
          We do not sell, trade, or rent your personal information to third parties. We may share your 
          information with delivery partners solely to fulfill your orders.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#d4af37', fontSize: '1.5rem', marginBottom: '0.75rem' }}>5. Cookies</h2>
        <p style={{ lineHeight: '1.8', color: '#374151' }}>
          Our website uses cookies to enhance your browsing experience, remember your cart items, and 
          analyze site traffic. You can control cookie settings in your browser.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#d4af37', fontSize: '1.5rem', marginBottom: '0.75rem' }}>6. Your Rights</h2>
        <p style={{ lineHeight: '1.8', color: '#374151' }}>
          You have the right to access, update, or delete your personal information at any time. 
          Contact us via WhatsApp or email to make such requests.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#d4af37', fontSize: '1.5rem', marginBottom: '0.75rem' }}>7. Contact Us</h2>
        <p style={{ lineHeight: '1.8', color: '#374151' }}>
          If you have questions about this Privacy Policy, please contact us at:<br />
          <strong>Email:</strong> info@godsgift.site<br />
          <strong>WhatsApp:</strong> Click the WhatsApp button on our website
        </p>
      </section>

      <Footer />
    </main>
  );
}
