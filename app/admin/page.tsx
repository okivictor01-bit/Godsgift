'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // CHANGE THIS PASSWORD TO SOMETHING SECURE
  const ADMIN_PASSWORD = 'godsgift2024'; 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchOrders();
    } else {
      alert('Incorrect password!');
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      alert('Failed to load orders');
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  const toggleOrder = (orderId: any) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (!isAuthenticated) {
    return (
      <main style={{ padding: '2rem', maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
        <h2 style={{ color: '#d4af37' }}>God'sGift Essence Admin</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}
            required
          />
          <button type="submit" style={{ padding: '1rem', backgroundColor: '#d4af37', color: 'black', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
            Login
          </button>
        </form>
      </main>
    );
  }

  return (
    <main style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#1a1a1a', margin: 0 }}>Admin Dashboard</h1>
        <button onClick={() => setIsAuthenticated(false)} style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px' }}>
          Logout
        </button>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading orders...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((order: any) => (
              <div key={order.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                <div 
                  onClick={() => toggleOrder(order.id)}
                  style={{ 
                    padding: '1rem', 
                    backgroundColor: expandedOrder === order.id ? '#f9fafb' : 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                      {order.shipping_address?.name || 'Unknown Customer'}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                      {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', color: '#16a34a' }}>₦{order.total_amount?.toLocaleString()}</div>
                    <div style={{ fontSize: '0.8rem', color: order.status === 'paid' ? '#16a34a' : '#ef4444', textTransform: 'uppercase' }}>
                      {order.status}
                    </div>
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <div style={{ padding: '1rem', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                    <h4 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Order Items:</h4>
                    {order.order_items?.map((item: any) => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                        <span>{item.product_name} x {item.quantity}</span>
                        <span>₦{item.price?.toLocaleString()}</span>
                      </div>
                    ))}
                    
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb', fontSize: '0.85rem', color: '#4b5563' }}>
                      <div><strong>Ref:</strong> {order.paystack_reference}</div>
                      <div><strong>Email:</strong> {order.shipping_address?.email}</div>
                      <div><strong>Phone:</strong> {order.shipping_address?.phone}</div>
                      <div><strong>Address:</strong> {order.shipping_address?.address}</div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}
