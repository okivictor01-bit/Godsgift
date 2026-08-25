'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    // Load cart from local storage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    } else {
      // If cart is empty, redirect to home or cart page
      router.push('/cart');
    }
  }, [router]);

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Check if Paystack is loaded (using 'as any' to fix TypeScript error)
    if (typeof window !== 'undefined' && (window as any).PaystackPop) {
      const handler = (window as any).PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: formData.email,
        amount: totalAmount * 100, // Paystack expects amount in kobo
        currency: 'NGN',
        ref: 'GG_' + Math.floor(Math.random() * 1000000000 + 1), // Generate a unique reference
        metadata: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          cart_items: JSON.stringify(cart) // CRITICAL: This sends the cart to the webhook
        },
        callback: function (response: any) {
          // Payment successful
          alert('Payment successful! Reference: ' + response.reference);
          localStorage.removeItem('cart'); // Clear the cart
          router.push('/orders'); // Redirect to order tracking
        },
        onClose: function () {
          alert('Payment window closed.');
          setLoading(false);
        }
      });
      handler.openIframe();
    } else {
      alert('Payment system is loading. Please try again in a moment.');
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Your cart is empty.</div>;
  }

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Checkout</h1>

      {/* Order Summary */}
      <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <span>{item.name} x {item.quantity}</span>
            <span>₦{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '1rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
          <span>Total</span>
          <span>₦{totalAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Checkout Form */}
      <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          required
          style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem' }}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          required
          style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem' }}
        />
        <textarea
          name="address"
          placeholder="Delivery Address"
          value={formData.address}
          onChange={handleInputChange}
          required
          rows={3}
          style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', fontFamily: 'inherit' }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '1rem',
            backgroundColor: loading ? '#9ca3af' : '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '1rem'
          }}
        >
          {loading ? 'Processing...' : `Pay ₦${totalAmount.toLocaleString()}`}
        </button>
      </form>
    </main>
  );
}
