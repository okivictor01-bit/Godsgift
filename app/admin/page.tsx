'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin/login');
    } else {
      setUser(session.user);
      fetchOrders();
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false });

    if (data) setOrders(data);
  };

  const toggleOrder = (orderId: any) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Checking authentication...</div>;
  }

  return (
    <main style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ color: '#1a1a1a', margin: 0, fontSize: '1.5rem' }}>Admin Dashboard</h1>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: '0.25rem 0 0 0' }}>Logged in as: {user?.email}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => router.push('/admin/products')} style={{ padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Manage Products
          </button>
          <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>

      <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Recent Orders</h2>
      
      {orders.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>No orders found yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.map((order) => (
            <div key={order.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
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
                    {new Date(order.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 'bold', color: '#16a34a' }}>₦{order.total_amount?.toLocaleString()}</div>
                  <div style={{ fontSize: '0.8rem', color: order.status === 'paid' ? '#16a34a' : '#f59e0b', textTransform: 'uppercase', fontWeight: 'bold' }}>
                    {order.status}
                  </div>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div style={{ padding: '1rem', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                  <h4 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#374151' }}>Order Items:</h4>
                  {order.order_items?.map((item: any) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span>{item.product_name} x {item.quantity}</span>
                      <span>₦{item.price?.toLocaleString()}</span>
                    </div>
                  ))}
                  
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #d1d5db', fontSize: '0.85rem', color: '#4b5563', lineHeight: '1.6' }}>
                    <div><strong>Reference:</strong> {order.paystack_reference}</div>
                    <div><strong>Email:</strong> {order.shipping_address?.email}</div>
                    <div><strong>Phone:</strong> {order.shipping_address?.phone}</div>
                    <div><strong>Address:</strong> {order.shipping_address?.address}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
