import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header style={{
      backgroundColor: '#1a1a1a',
      padding: '1rem 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 50
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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

        {/* Navigation Links */}
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/products" style={{ color: 'white', textDecoration: 'none' }}>
            Products
          </Link>
          <Link href="/cart" style={{ color: 'white', textDecoration: 'none' }}>
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}
