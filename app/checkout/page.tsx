'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PaystackButton } from 'react-paystack';
import { supabase } from '../../lib/supabaseClient';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
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
  const router = useRouter();

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

  const config = {
    reference: (new Date()).getTime().toString(),
    email: formData.email,
    amount: totalAmount * 100, // Paystack expects amount in kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
  };

  const handlePaystackSuccessAction = async (reference: any) => {
    setIsProcessing(true);
    try {
      // 1. Save order to Supabase 'orders' table
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            customer_name: formData.name,
            customer_email: formData.email,
            customer_phone: formData.phone,
            customer_address: formData.address,
            total_amount: totalAmount,
            payment_reference: reference.reference,
            status: 'paid'
          }
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Save items to 'order_items' table
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

      if (itemsError) throw itemsError;

      // 3. Clear cart and redirect
      localStorage.removeItem('cart');
      alert('Payment successful! Thank you for your order.');
      router.push('/');
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Payment was successful, but there was an error saving your order. Please contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaystackCloseAction = () => {
    console.log('Payment closed');
  };

  const componentProps = {
    ...config,
    text: isProcessing ? 'Processing...' : `Pay ₦${totalAmount.toLocaleString()}`,
    onSuccess: (reference: any) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading checkout...</div>;
  }

  if (cart.length === 0) {
    return null; 
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Checkout</h1>
      
      {/* Order Summary */}
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

      {/* Checkout Form */}
      <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Full Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email Address</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Phone Number</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Delivery Address</label>
          <textarea
            required
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '8px', boxSizing: 'border-box', minHeight: '80px' }}
          />
        </div>
        
        <PaystackButton
          {...componentProps}
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        />
      </form>
    </main>
  );
}
