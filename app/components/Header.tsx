'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header style={{
      backgroundColor: '#1a1a1a',
      padding: '1rem',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>
            <img 
              src="/logo.png" 
              alt="Godsgift Store"
              style={{
                height: '50px',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          </div>
        </Link>

        {/* Cart Link */}
        <Link 
          href="/cart" 
          style={{ 
            color: 'white', 
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            backgroundColor: '#16a34a',
            borderRadius: '8px'
          }}
        >
          🛒 Cart
        </Link>
      </div>
    </header>
  );
}
