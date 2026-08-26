'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
  stock: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchProducts();
    updateCartCount();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
    setCartCount(count);
  };

  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        existingItem.quantity += 1;
      } else {
        alert('Maximum stock reached!');
        return;
      }
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart!`);
  };

  return (
    <main>
      {/* Navigation Bar - Cart Button Only */}
      <nav style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        padding: '1rem',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem'
      }}>
        <Link href="/cart" style={{
          backgroundColor: 'rgba(255,255,255,0.9)',
          color: '#1a1a1a',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          🛒 Cart {cartCount > 0 && <span style={{ backgroundColor: '#2563eb', color: 'white', borderRadius: '50%', padding: '0.2rem 0.6rem', fontSize: '0.8rem' }}>{cartCount}</span>}
        </Link>
      </nav>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '500px',
        backgroundImage: 'url(/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '3rem'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 1
        }} />
        <div style={{ 
          position: 'relative', 
          zIndex: 2, 
          textAlign: 'center', 
          color: 'white',
          padding: '2rem'
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            God'sGift Essence
          </h1>
          <p style={{ fontSize: '1.5rem', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            Scented by Grace, Made to Leave a Mark
          </p>
        </div>
      </section>

      {/* Products Section */}
      <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem' }}>Our Products</h2>
        
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading products...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {products.map((product) => {
              const isOutOfStock = product.stock === 0 || product.stock === null;
              
              return (
                <div key={product.id} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                  <img 
                    src={product.image_url || 'https://via.placeholder.com/400x300?text=No+Image'} 
                    alt={product.name}
                    style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                  />
                  
                  <div style={{ padding: '1.5rem' }}>
                    <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', color: '#1a1a1a' }}>{product.name}</h2>
                    <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: '0 0 1.5rem 0', lineHeight: '1.5' }}>
                      {product.description || 'No description available.'}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#2563eb' }}>
                        ₦{product.price?.toLocaleString()}
                      </span>
                      <span style={{ 
                        fontSize: '0.85rem', 
                        padding: '0.4rem 0.8rem', 
                        borderRadius: '20px',
                        backgroundColor: isOutOfStock ? '#fee2e2' : '#dcfce7',
                        color: isOutOfStock ? '#dc2626' : '#16a34a',
                        fontWeight: 'bold'
                      }}>
                        {isOutOfStock ? 'Out of Stock' : `In Stock (${product.stock})`}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      disabled={isOutOfStock}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        backgroundColor: isOutOfStock ? '#9ca3af' : '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
