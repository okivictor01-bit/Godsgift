'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function TrackOrder() {
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setSearched(true);
    setExpandedOrder(null);

    // Query orders where the email inside the shipping_address JSON matches
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('shipping_address->>email', email)
      .order('created_at', { ascending: false });

    if (error) {
      alert('Error fetching orders: ' + error.message);
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return '#f59e0b'; // Orange
      case 'processing': return '#3b82f6'; // Blue
      case 'shipped': return '#8b5cf6'; // Purple
      case 'delivered': return '#16a34a'; // Green
      case 'cancelled': return '#ef4444'; // Red
      default: return '#6b7280';
    }
  };

  const toggleOrder = (orderId: any) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <main style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem', color: '#1a1a1a' }}>Track Your Order</h1>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem' }}>
        <input 
          type="email" 
          placeholder="Enter your email address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
          style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '0.75rem 1.5rem', 
            backgroundColor: loading ? '#9ca3af' : '#1a1a1a', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Searching...' : 'Track'}
        </button>
      </form>

      {/* Results */}
      {searched && (
        <div>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
              No orders found for this email address.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ color: '#16a34a', fontWeight: 'bold', textAlign: 'center' }}>Found {orders.length} order(s)</p>
              
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
                      <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>Order #{order.id.substring(0, 8).toUpperCase()}</div>
                      <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 'bold', color: '#1a1a1a' }}>₦{order.total_amount?.toLocaleString()}</div>
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: getStatusColor(order.status), 
                        textTransform: 'uppercase', 
                        fontWeight: 'bold',
                        backgroundColor: `${getStatusColor(order.status)}20`,
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        marginTop: '0.25rem'
                      }}>
                        {order.status}
                      </div>
                    </div>
                  </div>

                  {expandedOrder === order.id && (
                    <div style={{ padding: '1rem', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                      <h4 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#374151' }}>Items:</h4>
                      {order.order_items?.map((item: any) => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                          <span>{item.product_name} x {item.quantity}</span>
                          <span>₦{item.price?.toLocaleString()}</span>
                        </div>
                      ))}
                      
                      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #d1d5db', fontSize: '0.85rem', color: '#4b5563', lineHeight: '1.6' }}>
                        <div><strong>Address:</strong> {order.shipping_address?.address}</div>
                        <div><strong>Phone:</strong> {order.shipping_address?.phone}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
