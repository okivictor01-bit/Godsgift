'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function Checkout() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    // Only check cart if payment is not complete
    if (!paymentComplete) {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      } else {
        router.push('/cart');
      }
    }
  }, [router, paymentComplete]);

  const totalAmount = cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveOrderToDatabase = async (reference: string) => {
    try {
      const { data: newOrder, error } = await supabase
        .from('orders')
        .insert({
          customer_email: formData.email,
          customer_name: formData.name,
          customer_phone: formData.phone,
          amount: totalAmount,
          status: 'paid',
          reference: reference,
          paid_at: new Date().toISOString(),
          delivery_address: formData.address
        })
        .select()
        .single();

      if (error) throw error;
      if (!newOrder) throw new Error('No order created');

      for (const item of cart) {
        await supabase.from('order_items').insert({
          order_id: newOrder.id,
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          price: item.price
        });

        const { data: product } = await supabase.from('products').select('stock').eq('id', item.id).single();
        if (product && product.stock !== null && product.stock >= item.quantity) {
          await supabase.from('products').update({ stock: product.stock - item.quantity }).eq('id', item.id);
        }
      }
      
      return true;
    } catch (error: any) {
      console.error('Save error:', error);
      return false;
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const PaystackPop = (window as any).PaystackPop;
      const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

      if (!PaystackPop) {
        alert('Payment system not loaded. Refresh page.');
        setLoading(false);
        return;
      }

      try {
        const handler = PaystackPop.setup({
          key: publicKey,
          email: formData.email,
          amount: totalAmount * 100,
          currency: 'NGN',
          ref: 'GG_' + Math.floor(Math.random() * 1000000000 + 1),
          metadata: { name: formData.name, phone: formData.phone, address: formData.address },
          callback: function(response: any) {
            // Mark payment as complete BEFORE clearing cart
            setPaymentComplete(true);
            
            // Save order
            saveOrderToDatabase(response.reference).then((success) => {
              if (success) {
                alert('✅ Payment successful! Thank you for your order.');
              } else {
                alert('⚠️ Payment successful but order save failed. Ref: ' + response.reference);
              }
            }).finally(() => {
              // Clear cart AFTER marking complete
              localStorage.removeItem('cart');
              // Force redirect to homepage
              window.location.href = '/';
            });
          },
          onClose: function() {
            alert('Payment cancelled.');
            setLoading(false);
          }
        });
        handler.openIframe();
      } catch (error: any) {
        alert('Paystack Error: ' + error.message);
        setLoading(false);
      }
    }, 500);
  };

  // Show thank you message if payment complete
  if (paymentComplete) {
    return (
      <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
        <div style={{ padding: '3rem 1rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Thank You!</h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Your order has been received. We'll contact you soon.</p>
          <button 
            onClick={() => window.location.href = '/'} 
            style={{ padding: '1rem 2rem', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Checkout</h1>
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

      <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem' }} />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem' }} />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem' }} />
        <textarea name="address" placeholder="Delivery Address" value={formData.address} onChange={handleInputChange} required rows={3} style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', fontFamily: 'inherit' }} />
        <button type="submit" disabled={loading} style={{ padding: '1rem', backgroundColor: loading ? '#9ca3af' : '#16a34a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '1rem' }}>
          {loading ? 'Processing...' : `Pay ₦${totalAmount.toLocaleString()}`}
        </button>
      </form>
    </main>
  );
}
