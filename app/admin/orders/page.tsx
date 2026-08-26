'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';

export default function AdminOrders() {
  const router = useRouter();
  // FIX: Added <any[]> to tell TypeScript this will hold an array of data
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Now TypeScript knows 'data' is allowed to be set here
        setOrders(data || []);
      } catch (err: any) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading orders...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#dc2626' }}>
        <h2>Error Loading Orders</h2>
        <p>{error}</p>
        <button 
          onClick={() => router.push('/admin')}
          style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '8px' }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#1a1a1a' }}>Customer Orders</h1>
        <button 
          onClick={() => router.push('/admin')} 
          style={{ padding: '0.75rem 1.5rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ← Back to Admin
        </button>
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
          <h2 style={{ color: '#1a1a1a', marginBottom: '0.5rem' }}>No Orders Yet</h2>
          <p style={{ color: '#6b7280' }}>When customers make purchases, their orders will appear here.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.map((order) => (
            <div key={order.id} style={{ border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '12px', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1a1a1a' }}>
                  Order #{order.reference ? order.reference.slice(-6).toUpperCase() : 'N/A'}
                </h3>
                <span style={{ 
                  backgroundColor: order.status === 'paid' ? '#dcfce7' : '#fef3c7', 
                  color: order.status === 'paid' ? '#16a34a' : '#d97706', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: 'bold' 
                }}>
                  {order.status ? order.status.toUpperCase() : 'PENDING'}
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.95rem', color: '#4b5563' }}>
                <div>
                  <p style={{ margin: '0.25rem 0' }}><strong>Customer:</strong> {order.customer_name || 'N/A'}</p>
                  <p style={{ margin: '0.25rem 0' }}><strong>Email:</strong> {order.customer_email || 'N/A'}</p>
                  <p style={{ margin: '0.25rem 0' }}><strong>Phone:</strong> {order.customer_phone || 'N/A'}</p>
                </div>
                <div>
                  <p style={{ margin: '0.25rem 0' }}><strong>Amount:</strong> ₦{Number(order.amount || 0).toLocaleString()}</p>
                  <p style={{ margin: '0.25rem 0' }}><strong>Address:</strong> {order.delivery_address || 'N/A'}</p>
                  <p style={{ margin: '0.25rem 0' }}><strong>Date:</strong> {order.paid_at ? new Date(order.paid_at).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
