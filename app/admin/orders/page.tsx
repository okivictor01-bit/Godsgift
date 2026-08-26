'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient'; // <-- CORRECTED PATH (3 levels up)

interface OrderItem {
  product_name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  amount: number;
  status: string;
  reference: string;
  paid_at: string;
  created_at: string;
  items: OrderItem[];
}

export default function AdminOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // 1. Fetch all orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // 2. Fetch all order items
      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*');

      if (itemsError) throw itemsError;

      // 3. Combine orders with their specific items
      const combinedOrders = ordersData.map((order: any) => {
        const orderItems = itemsData
          .filter((item: any) => item.order_id === order.id)
          .map((item: any) => ({
            product_name: item.product_name,
            quantity: item.quantity,
            price: item.price
          }));
        
        return { ...order, items: orderItems };
      });

      setOrders(combinedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    setLoading(false);
  };

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#1a1a1a' }}>Customer Orders</h1>
        <button
          onClick={() => router.push('/admin')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ← Back to Admin
        </button>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
          <h2 style={{ color: '#1a1a1a', marginBottom: '0.5rem' }}>No Orders Yet</h2>
          <p style={{ color: '#6b7280' }}>When customers make purchases, their orders will appear here.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map((order) => (
            <div key={order.id} style={{
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '1.5rem',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              {/* Order Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1a1a1a' }}>Order #{order.reference.slice(-6).toUpperCase()}</h3>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#6b7280' }}>
                    {new Date(order.paid_at || order.created_at).toLocaleString()}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ 
                    backgroundColor: order.status === 'paid' ? '#dcfce7' : '#fef3c7', 
                    color: order.status === 'paid' ? '#16a34a' : '#d97706', 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem', 
                    fontWeight: 'bold' 
                  }}>
                    {order.status.toUpperCase()}
                  </span>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.2rem', fontWeight: 'bold', color: '#2563eb' }}>
                    ₦{Number(order.amount).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Customer Details & Items Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                
                {/* Customer Info */}
                <div>
                  <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: '#9ca3af', textTransform: 'uppercase' }}>Customer Details</h4>
                  <p style={{ margin: '0.25rem 0', fontWeight: 'bold' }}>{order.customer_name}</p>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#4b5563' }}>{order.customer_email}</p>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#4b5563' }}>{order.customer_phone}</p>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#4b5563', fontStyle: 'italic' }}>
                    📍 {order.delivery_address || 'No address provided'}
                  </p>
                </div>

                {/* Items Bought */}
                <div>
                  <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: '#9ca3af', textTransform: 'uppercase' }}>Items Purchased</h4>
                  {order.items.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {order.items.map((item, index) => (
                        <li key={index} style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          padding: '0.5rem 0', 
                          borderBottom: '1px dashed #e5e7eb',
                          fontSize: '0.95rem'
                        }}>
                          <span>{item.product_name} <span style={{ color: '#6b7280' }}>x{item.quantity}</span></span>
                          <span style={{ fontWeight: 'bold' }}>₦{(item.price * item.quantity).toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>No items listed</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
