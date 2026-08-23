'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <p>Loading cart...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <main style={{ padding: '2rem', textAlign: 'center', fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '1rem' }}>Your Cart is Empty</h1>
        <p style={{ marginBottom: '2rem', color: '#666' }}>Add some products to get started!</p>
        <button
          onClick={() => router.push('/')}
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Continue Shopping
        </button>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Shopping Cart</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              gap: '1rem',
              padding: '1.5rem',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              marginBottom: '1rem',
              alignItems: 'center'
            }}
          >
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.name}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            )}
            
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{item.name}</h3>
              <p style={{ fontWeight: 'bold', color: '#2563eb', margin: '0.5rem 0' }}>
                {item.price.toLocaleString()}
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '0.25rem' }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{ padding: '0.25rem 0.75rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                  >
                    -
                  </button>
                  <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{ padding: '0.25rem 0.75rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                  >
                    +
                  </button>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#fee2e2',
                    color: '#dc2626',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
            
            <div style={{ textAlign: 'right', minWidth: '100px' }}>
              <p style={{ fontWeight: 'bold', fontSize: '1.1rem', margin: 0 }}>
                ₦{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{
        borderTop: '2px solid #e0e0e0',
        paddingTop: '1.5rem',
        marginTop: '2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          fontSize: '1.25rem',
          fontWeight: 'bold'
        }}>
          <span>Total:</span>
          <span style={{ color: '#2563eb' }}>₦{totalAmount.toLocaleString()}</span>
        </div>
        
        <button
          onClick={() => router.push('/checkout')}
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </main>
  );
}
