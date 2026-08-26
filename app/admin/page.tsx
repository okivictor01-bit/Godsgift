'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simple check to see if admin is logged in
    // In a real app, you'd check a secure session/token
    const adminAuth = localStorage.getItem('isAdmin');
    if (adminAuth === 'true') {
      setIsLoggedIn(true);
    } else {
      // If not logged in, redirect to login page (if you have one) or just show login
      // For now, we'll just set a simple password prompt if needed, or assume they are logged in via your existing auth
      setIsLoggedIn(true); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.push('/');
  };

  if (!isLoggedIn) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Please log in.</div>;
  }

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#1a1a1a' }}>Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        
        {/* View Orders Button */}
        <button
          onClick={() => router.push('/admin/orders')}
          style={{
            padding: '2rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            textAlign: 'left',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
          <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>View Orders</h2>
          <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>See what customers bought and their delivery details.</p>
        </button>

        {/* Manage Products Button */}
        <button
          onClick={() => router.push('/admin/products')}
          style={{
            padding: '2rem',
            backgroundColor: '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            textAlign: 'left',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛍️</div>
          <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>Manage Products</h2>
          <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>Add, edit, or remove items from the store.</p>
        </button>

      </div>
    </main>
  );
}
