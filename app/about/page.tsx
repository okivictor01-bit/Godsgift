import Footer from '@/components/Footer';

export default function About() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '1rem' }}>About God'sGift Essence</h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280', fontStyle: 'italic' }}>
          "Scented by Grace, Made to Leave a Mark"
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#d4af37', fontSize: '1.8rem', marginBottom: '1rem' }}>Our Story</h2>
        <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1.05rem' }}>
          God'sGift Essence was born out of a deep passion for fragrance and a desire to bring premium, 
          long-lasting scents to everyone. We believe that the right fragrance doesn't just smell good — 
          it tells a story, boosts confidence, and leaves a lasting impression wherever you go.
        </p>
        <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1.05rem', marginTop: '1rem' }}>
          From luxurious perfumes to refreshing body sprays and quality skincare, every product in our 
          collection is carefully selected to ensure excellence, affordability, and authenticity.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#d4af37', fontSize: '1.8rem', marginBottom: '1rem' }}>Our Mission</h2>
        <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1.05rem' }}>
          To provide high-quality fragrances and body care products that make our customers feel confident, 
          elegant, and truly special — without breaking the bank.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#d4af37', fontSize: '1.8rem', marginBottom: '1rem' }}>Why Choose Us?</h2>
        <ul style={{ lineHeight: '2', color: '#374151', fontSize: '1.05rem', paddingLeft: '1.5rem' }}>
          <li>✅ <strong>100% Authentic Products</strong> — We source only genuine fragrances</li>
          <li>✅ <strong>Affordable Luxury</strong> — Premium quality at fair prices</li>
          <li>✅ <strong>Fast Delivery</strong> — Nationwide shipping across Nigeria</li>
          <li>✅ <strong>Excellent Customer Service</strong> — We're here for you on WhatsApp</li>
          <li>✅ <strong>Long-Lasting Scents</strong> — Fragrances that stay with you all day</li>
        </ul>
      </section>

      <section style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
        <h2 style={{ color: '#1a1a1a', marginBottom: '1rem' }}>Get in Touch</h2>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
          Have questions? We'd love to hear from you!
        </p>
        <a 
          href="/contact" 
          style={{ 
            display: 'inline-block', 
            padding: '0.75rem 2rem', 
            backgroundColor: '#25D366', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '8px', 
            fontWeight: 'bold' 
          }}
        >
          Contact Us
        </a>
      </section>

    
    </main>
  );
}
