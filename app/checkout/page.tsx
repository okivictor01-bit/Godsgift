'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function Checkout() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) setCart(JSON.parse(storedCart));
    else router.push('/cart');
  }, [router]);

  const totalAmount = cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Temporary test to prove the page works
    alert(`Form submitted! Total: ₦${totalAmount.toLocaleString()}`);
    
    setLoading(false);
  };

  if (cart.length === 0) return <div style={{ padding: '2rem', textAlign: 'center' }}>Your cart is empty.</div>;

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Checkout</h1>
      
      <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>{item.name} x {item.quantity}</span>
            <span>₦{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '1rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
          <span>Total</span>
          <span>₦{totalAmount.toLocaleString()}</span>
        </div>
      </div>

      <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #d1d5db' }} />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #d1d5db' }} />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #d1d5db' }} />
        <textarea name="address" placeholder="Delivery Address" value={formData.address} onChange={handleInputChange} required rows={3} style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #d1d5db' }} />
        
        <button type="submit" disabled={loading} style={{ padding: '1rem', backgroundColor: loading ? '#9ca3af' : '#16a34a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem' }}>
          {loading ? 'Processing...' : `Pay ₦${totalAmount.toLocaleString()}`}
        </button>
      </form>
    </main>
  );
}
