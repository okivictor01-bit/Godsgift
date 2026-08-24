'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';

export default function ManageProducts() {
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '',
    category: 'Perfume'
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin/login');
    } else {
      setUser(session.user);
      fetchProducts();
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setProducts(data);
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;

    setUploading(true);
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, imageFile);

    if (uploadError) {
      alert('Error uploading image: ' + uploadError.message);
      setUploading(false);
      return null;
    }

    // Get public URL
    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    setUploading(false);
    return data.publicUrl;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Name and Price are required!');
      return;
    }

    let imageUrl = formData.image_url;
    
    // Upload new image if selected
    if (imageFile) {
      const uploadedUrl = await uploadImage();
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }

    const productData = {
      name: formData.name,
      price: parseInt(formData.price),
      description: formData.description,
      image_url: imageUrl,
      category: formData.category
    };

    let error;
    if (editingId) {
      const res = await supabase.from('products').update(productData).eq('id', editingId);
      error = res.error;
    } else {
      const res = await supabase.from('products').insert([productData]);
      error = res.error;
    }

    if (error) {
      alert('Error saving product: ' + error.message);
    } else {
      alert('Product saved successfully!');
      resetForm();
      fetchProducts();
    }
  };

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setFormData({
      name: product.name || '',
      price: product.price?.toString() || '',
      description: product.description || '',
      image_url: product.image_url || '',
      category: product.category || 'Perfume'
    });
    setImageFile(null);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) alert('Error deleting: ' + error.message);
      else fetchProducts();
    }
  };

  const resetForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ name: '', price: '', description: '', image_url: '', category: 'Perfume' });
    setImageFile(null);
  };

  const handleChangePassword = async () => {
    const newPass = prompt('Enter your new password (min 6 characters):');
    if (newPass && newPass.length >= 6) {
      const { error } = await supabase.auth.updateUser({ password: newPass });
      if (error) alert('Error: ' + error.message);
      else alert('Password updated successfully!');
    } else if (newPass) {
      alert('Password must be at least 6 characters.');
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading products...</div>;

  return (
    <main style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button onClick={() => router.push('/admin')} style={{ padding: '0.5rem 1rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          ← Back
        </button>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Manage Products</h1>
        <button onClick={handleChangePassword} style={{ padding: '0.5rem 1rem', backgroundColor: '#d4af37', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Change Password
        </button>
      </div>

      {!isFormOpen && (
        <button 
          onClick={() => setIsFormOpen(true)}
          style={{ width: '100%', padding: '1rem', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginBottom: '1.5rem' }}
        >
          + Add New Product
        </button>
      )}

      {isFormOpen && (
        <div style={{ border: '1px solid #d1d5db', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem', backgroundColor: '#f9fafb' }}>
          <h2 style={{ marginTop: 0 }}>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input name="name" placeholder="Product Name" value={formData.name} onChange={handleInputChange} required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc' }} />
            <input name="price" type="number" placeholder="Price (e.g. 35000)" value={formData.price} onChange={handleInputChange} required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc' }} />
            
            {/* Image Upload */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Product Image</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', width: '100%' }}
              />
              {uploading && <p style={{ color: '#2563eb', margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>Uploading image...</p>}
            </div>

            <select name="category" value={formData.category} onChange={handleInputChange} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc' }}>
              <option value="Perfume">Perfume</option>
              <option value="Body Spray">Body Spray</option>
              <option value="Accessories">Accessories</option>
            </select>
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} rows={3} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc' }} />
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" disabled={uploading} style={{ flex: 1, padding: '0.75rem', backgroundColor: uploading ? '#9ca3af' : '#1a1a1a', color: 'white', border: 'none', borderRadius: '6px', cursor: uploading ? 'not-allowed' : 'pointer' }}>
                {editingId ? 'Update' : 'Save'}
              </button>
              <button type="button" onClick={resetForm} disabled={uploading} style={{ flex: 1, padding: '0.75rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: uploading ? 'not-allowed' : 'pointer' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {products.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6b7280' }}>No products found. Add your first product above!</p>
        ) : (
          products.map((product) => (
            <div key={product.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <img 
                src={product.image_url || 'https://via.placeholder.com/60'} 
                alt={product.name}
                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{product.name}</div>
                <div style={{ color: '#16a34a', fontWeight: 'bold' }}>₦{product.price?.toLocaleString()}</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{product.category}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button onClick={() => handleEdit(product)} style={{ padding: '0.4rem 0.8rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Edit</button>
                <button onClick={() => handleDelete(product.id)} style={{ padding: '0.4rem 0.8rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
