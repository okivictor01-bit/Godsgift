'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: any) => any;
    };
  }
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paystackReady, setPaystackReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.PaystackPop) {
      setPaystackReady(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => setPaystackReady(true);
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      router.push('/cart');
    }
    setLoading(false);
  }, [router]);

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';

  const onSuccess = async (reference: any) => {
    setIsProcessing(true);
    try {
      const orderDataToInsert: any = {
        total_amount: totalAmount,
        paystack_reference: reference.reference,
        status: 'paid',
        shipping_address: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          email: formData.email
        }
      };

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([orderDataToInsert])
        .select()
        .single();

      if (orderError) {
        console.error('Order error:', orderError);
        throw new Error(`Order failed: ${orderError.message}`);
      }
      
      if (!orderData) {
        throw new Error('No order data returned');
      }

      try {
        const orderItems = cart.map(item => ({
          order_id: orderData.id,
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          price: item.price
        }));

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);

        if (itemsError) {
          console.warn('Order items save failed (non-critical):', itemsError);
        }
      } catch (itemsError) {
        console.warn('Order items error (non-critical):', itemsError);
      }

      localStorage.removeItem('cart');
      alert('Payment successful! Thank you for your order. Ref: ' + reference.reference);
      router.push('/');
    } catch (error: any) {
      console.error('Critical save error:', error);
      alert(`Payment was processed (Ref: ${reference.reference}) but there was an issue. Please contact support.`);
      localStorage.removeItem('cart');
      setTimeout(() => router.push('/'), 3000);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePay = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill in all fields');
      return;
    }
    if (!publicKey) {
      alert('Payment system not configured');
      return;
    }
    if (!paystackReady || !window.PaystackPop) {
      alert('Paystack is still loading. Please wait.');
      return;
    }

    try {
      const paystack = window.PaystackPop.setup({
        key: publicKey,
        email: formData.email,
        amount: totalAmount * 100,
        currency: 'NGN',
        ref: '' + Math.floor((Math.random() * 1000000000) + 1),
        callback: function(response: any) {
          onSuccess(response);
        },
        onClose: function() {
          console.log('Payment closed');
        }
      });
      paystack.openIframe();
    } catch (error: any) {
      alert(`Payment error: ${error.message || 'Please try again'}`);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  if (cart.length === 0) return null;

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Checkout</h1>
      <div style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
        <h2 style={{ marginTop: 0, fontSize: '1.2rem' }}>Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
            <span>{item.name} x {item.quantity}</span>
            <span>₦{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
          <span>Total</span>
          <span style={{ color: '#2563eb' }}>₦{totalAmount.toLocaleString()}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Full Name</label>
          <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '8px', boxSizing: 'border-box' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email Address</label>
          <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '8px', boxSizing: 'border-box' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Phone Number</label>
          <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '8px', boxSizing: 'border-box' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Delivery Address</label>
          <textarea required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '8px', boxSizing: 'border-box', minHeight: '80px' }} />
        </div>

        <button
          onClick={handlePay}
          disabled={isProcessing || !paystackReady}
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: (isProcessing || !paystackReady) ? '#9ca3af' : '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: (isProcessing || !paystackReady) ? 'not-allowed' : 'pointer',
            marginTop: '1rem'
          }}
        >
          {!paystackReady ? 'Loading Paystack...' : isProcessing ? 'Processing...' : `Pay ₦${totalAmount.toLocaleString()}`}
        </button>
      </div>
    </main>
  );
}
