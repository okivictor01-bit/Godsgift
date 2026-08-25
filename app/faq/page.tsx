'use client';
import { useState } from 'react';

const faqs = [
  {
    question: 'How do I place an order?',
    answer: 'Browse our products, add items to your cart, and proceed to checkout. You can pay securely using Paystack with your card or bank transfer.'
  },
  {
    question: 'Do you deliver nationwide?',
    answer: 'Yes! We deliver to all states in Nigeria. Delivery fees and timelines vary by location.'
  },
  {
    question: 'How long does delivery take?',
    answer: 'Lagos deliveries typically take 1-3 business days. Other states may take 3-7 business days depending on location.'
  },
  {
    question: 'Are your products authentic?',
    answer: 'Absolutely! We source only 100% authentic and original products from trusted suppliers.'
  },
  {
    question: 'How do I track my order?',
    answer: 'Visit our Order Tracking page and enter the email address you used during checkout to see your order status.'
  },
  {
    question: 'What is your return policy?',
    answer: 'Due to the nature of fragrance products, we only accept returns for unopened, sealed items within 7 days of delivery. Contact us on WhatsApp for assistance.'
  },
  {
    question: 'How do I contact customer support?',
    answer: 'You can reach us via WhatsApp (click the green button on any page), email, or through our Contact page.'
  },
  {
    question: 'Do you offer discounts for bulk orders?',
    answer: 'Yes! We offer special pricing for bulk and wholesale orders. Contact us on WhatsApp to discuss.'
  },
  {
    question: 'Is my payment information secure?',
    answer: 'Yes. All payments are processed securely through Paystack, a trusted and PCI-compliant payment gateway.'
  },
  {
    question: 'Can I change or cancel my order?',
    answer: 'You can cancel or modify your order within 1 hour of placement. After that, please contact us immediately for assistance.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '1rem' }}>
        Frequently Asked Questions
      </h1>
      <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '3rem', fontSize: '1.1rem' }}>
        Find answers to common questions about our products and services
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            style={{ 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px', 
              overflow: 'hidden',
              backgroundColor: openIndex === index ? '#f9fafb' : 'white'
            }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              style={{
                width: '100%',
                padding: '1.2rem',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '1.05rem',
                fontWeight: 'bold',
                color: '#1a1a1a'
              }}
            >
              {faq.question}
              <span style={{ fontSize: '1.5rem', color: '#d4af37', marginLeft: '1rem' }}>
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div style={{ padding: '0 1.2rem 1.2rem', color: '#4b5563', lineHeight: '1.7' }}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
        <h3 style={{ color: '#1a1a1a', marginBottom: '0.5rem' }}>Still have questions?</h3>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>We're here to help!</p>
        <a href="/contact" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>
          Contact Us →
        </a>
      </div>
    </main>
  );
}
