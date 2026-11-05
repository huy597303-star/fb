'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*');
    setCategories(data || []);
  }

  async function handleBuy(categoryId) {
    setLoading(true);
    const res = await fetch('/api/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categoryId }),
    });
    const result = await res.json();
    setLoading(false);

    if (result.success) {
      alert(`Mua thành công! Dữ liệu: ${result.data}`);
    } else {
      alert(`Lỗi: ${result.message}`);
    }
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2rem', color: '#111827' }}>Shop Clone Tự Động</h1>
        <p style={{ color: '#6b7280' }}>Hệ thống giao dịch tự động 24/7</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {categories.length === 0 ? (
          <p style={{ textAlign: 'center', gridColumn: '1/-1', color: '#9ca3af' }}>Chưa có danh mục nào hoặc đang tải...</p>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h3 style={{ marginTop: 0, color: '#1f2937' }}>{cat.name}</h3>
              <p style={{ color: '#4b5563', fontSize: '14px', minHeight: '40px' }}>{cat.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981' }}>
                  {Number(cat.price).toLocaleString()} VNĐ
                </span>
                <button 
                  onClick={() => handleBuy(cat.id)} 
                  disabled={loading}
                  style={{ 
                    padding: '10px 18px', 
                    background: loading ? '#9ca3af' : '#2563eb', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '6px', 
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer' 
                  }}
                >
                  {loading ? 'Xử lý...' : 'Mua Ngay'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
