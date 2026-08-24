import Footer from '@/components/Footer';

export default function Terms() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '1rem' }}>Terms & Conditions</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Last updated: August 2026</p>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#d4af37', fontSize: '1.5rem', marginBottom: '0.75rem' }}>1. Acceptance of Terms</h2>
        <p style={{ lineHeight: '1.8', color: '#374151' }}>
          By accessing and using godsgift.site, you agree to be bound by these Terms & Conditions. 
          If you do not agree, please do not use our website.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#d4af37', fontSize: '1.5rem', marginBottom: '0.75rem' }}>2. Products & Pricing</h2>
        <p style={{ lineHeight: '1.8', color: '#374151' }}>
          All products are subject to availability. We reserve the right to modify prices at any time 
          without prior notice. Prices displayed are in Nigerian Naira (₦) and include VAT where applicable.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#d4af37', fontSize: '1.5rem', marginBottom: '0.75rem' }}>3. Orders & Payment</h2>
        <ul style={{ lineHeight: '1.8', color: '#374151', paddingLeft: '1.5rem' }}>
          <li>All orders are subject to acceptance and availability</li>
          <li>Payment must be completed before order processing</li>
          <li>We accept payments via Paystack (cards, bank transfers, USSD)</li>
          <li>We reserve the right to cancel any order suspected of fraud</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#d4af37', fontSize: '1.5rem', marginBottom: '0.75rem' }}>4. Shipping & Delivery</h2>
        <p style={{ lineHeight: '1.8', color: '#374151' }}>
          Delivery times are estimates and not guaranteed. We are not liable for delays caused by 
          courier services, weather, or circumstances beyond our control. Shipping fees are calculated 
          at checkout based on your location.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#d4af37', fontSize: '1.5rem', marginBottom: '0.75rem' }}>5. Returns & Refunds</h2>
        <p style={{ lineHeight: '1.8', color: '#374151' }}>
          Due to hygiene reasons, opened or used fragrance products cannot be returned. Unopened, 
          sealed items may be returned within 7 days of delivery. Contact us on WhatsApp to initiate 
          a return. Refunds are processed within 5-10 business days after approval.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#d4af37', fontSize: '1.5rem', marginBottom: '0.75rem' }}>6. Intellectual Property</h2>
        <p style={{ lineHeight: '1.8', color: '#374151' }}>
          All content on this website, including text, images, logos, and designs, is the property of 
          God'sGift Essence and is protected by copyright laws.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#d4af37', fontSize: '1.5rem', marginBottom: '0.75rem' }}>7. Limitation of Liability</h2>
        <p style={{ lineHeight: '1.8', color: '#374151' }}>
          God'sGift Essence shall not be liable for any indirect, incidental, or consequential damages 
          arising from the use of our website or products. Our liability is limited to the purchase 
          price of the product in question.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#d4af37', fontSize: '1.5rem', marginBottom: '0.75rem' }}>8. Changes to Terms</h2>
        <p style={{ lineHeight: '1.8', color: '#374151' }}>
          We reserve the right to update these Terms & Conditions at any time. Changes will be posted 
          on this page with an updated revision date.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#d4af37', fontSize: '1.5rem', marginBottom: '0.75rem' }}>9. Governing Law</h2>
        <p style={{ lineHeight: '1.8', color: '#374151' }}>
          These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes shall 
          be resolved in the courts of Nigeria.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#d4af37', fontSize: '1.5rem', marginBottom: '0.75rem' }}>10. Contact</h2>
        <p style={{ lineHeight: '1.8', color: '#374151' }}>
          For questions about these Terms, contact us at:<br />
          <strong>Email:</strong> info@godsgift.site<br />
          <strong>WhatsApp:</strong> Use the button on our website
        </p>
      </section>

      <Footer />
    </main>
  );
}
