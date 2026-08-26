'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';

interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number | null;
  description: string;
  image_url: string;
  category: string;
  stock: number;
}

export default function ManageProducts() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', price: '', original_price: '', description: '', image_url: '', category: '', stock: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const { error } = await supabase.storage.from('products').upload(fileName, file);
    if (error) throw error;
    const { data } = supabase.storage.from('products').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image_url;
      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadImage(imageFile);
        setUploading(false);
      }
      if (!imageUrl) { alert('Please upload an image'); return; }

      const productData = {
        name: formData.name, price: Number(formData.price),
        original_price: formData.original_price ? Number(formData.original_price) : null,
        description: formData.description, image_url: imageUrl,
        category: formData.category, stock: Number(formData.stock)
      };

      if (editingId) {
        const { error } = await supabase.from('products').update(productData).eq('id', editingId);
        if (error) alert('Error: ' + error.message); else { alert('✅ Updated!'); resetForm(); }
      } else {
        const { error } = await supabase.from('products').insert([productData]);
        if (error) alert('Error: ' + error.message); else { alert('✅ Added!'); resetForm(); }
      }
      fetchProducts();
    } catch (error: any) { alert('Upload error: ' + error.message); setUploading(false); }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name, price: product.price.toString(),
      original_price: product.original_price?.toString() || '',
      description: product.description || '', image_url: product.image_url || '',
      category: product.category || '', stock: product.stock?.toString() || ''
    });
    setEditingId(product.id); setPreviewUrl(product.image_url); setImageFile(null); setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this product?')) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) fetchProducts();
    }
  };

  const resetForm = () => {
    setFormData({ name: '', price: '', original_price: '', description: '', image_url: '', category: '', stock: '' });
    setImageFile(null); setPreviewUrl(''); setEditingId(null); setShowForm(false);
  };

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#1a1a1a' }}>Manage Products</h1>
        <button onClick={() => router.push('/admin')} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>← Back</button>
      </div>

      <button onClick={() => { resetForm(); setShowForm(!showForm); }} style={{ width: '100%', padding: '1rem', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', marginBottom: '2rem' }}>
        {showForm ? 'Cancel' : '+ Add New Product'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#f9fafb', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#1a1a1a' }}>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <input type="text" placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input type="number" placeholder="Sale Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem' }} />
              <input type="number" placeholder="Original Price (Optional)" value={formData.original_price} onChange={(e) => setFormData({ ...formData, original_price: e.target.value })} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem' }} />
            </div>
            <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', fontFamily: 'inherit' }} />
            
            {/* Image Upload Section */}
            <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '8px', border: '2px dashed #d1d5db' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>Product Image</label>
              {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: '200px', borderRadius: '8px', marginBottom: '1rem' }} />}
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ padding: '0.5rem', width: '100%' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem' }} />
              <input type="number" placeholder="Stock Quantity" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} required style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem' }} />
            </div>
            <button type="submit" disabled={uploading} style={{ padding: '1rem', backgroundColor: uploading ? '#9ca3af' : '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: uploading ? 'not-allowed' : 'pointer' }}>
              {uploading ? 'Uploading...' : (editingId ? 'Update Product' : 'Add Product')}
            </button>
          </div>
        </form>
      )}

      {loading ? <p style={{ textAlign: 'center' }}>Loading...</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {products.map((product) => (
            <div key={product.id} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center', backgroundColor: 'white' }}>
              <img src={product.image_url} alt={product.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{product.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold', color: '#2563eb', fontSize: '1.2rem' }}>₦{product.price.toLocaleString()}</span>
                  {product.original_price && product.original_price > product.price && <span style={{ textDecoration: 'line-through', color: '#9ca3af' }}>{product.original_price.toLocaleString()}</span>}
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>Stock: {product.stock} | {product.category}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button onClick={() => handleEdit(product)} style={{ padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Edit</button>
                <button onClick={() => handleDelete(product.id)} style={{ padding: '0.5rem 1rem', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
