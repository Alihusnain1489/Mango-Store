'use client';
import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import {
  Plus, Search, Edit2, Trash2, AlertTriangle,
  Package, X, RefreshCw, ImageIcon,
} from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  unit: string;
  featured: boolean;
  inStock: boolean;
  image?: string;
  images?: string[];
  origin?: string;
  originFlag?: string;
  description?: string;
  discountPercent?: number;
  weightOptions?: string[];
}

const EMPTY = {
  name: '', category: 'Mangoes', price: 0, originalPrice: 0,
  stock: 0, unit: 'kg', featured: false, image: '',
  origin: '', originFlag: '🥭', description: '',
  discountPercent: 0, weightOptions: ['500g', '1kg', '2kg'],
};

const CATEGORIES = ['Mangoes', 'Fruits', 'Vegetables', 'Organic', 'Herbs'];
const UNITS = ['kg', 'g', 'piece', 'bunch', 'box', '250g pack', '500g pack'];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [catF, setCatF] = useState('All');
  const [modal, setModal] = useState<'add' | 'edit' | 'delete' | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      setProducts(data.products || []);
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const cats = ['All', ...CATEGORIES];
  const filtered = products.filter(p =>
    (catF === 'All' || p.category === catF) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setForm(EMPTY); setModal('add'); };
  const openEdit = (p: Product) => {
    setSelected(p);
    setForm({
      name: p.name, category: p.category, price: p.price,
      originalPrice: p.originalPrice || 0, stock: p.stock,
      unit: p.unit, featured: p.featured,
      image: p.image || p.images?.[0] || '',
      origin: p.origin || '', originFlag: p.originFlag || '🥭',
      description: p.description || '',
      discountPercent: p.discountPercent || 0,
      weightOptions: p.weightOptions || ['500g', '1kg', '2kg'],
    });
    setModal('edit');
  };
  const openDel = (p: Product) => { setSelected(p); setModal('delete'); };

  const save = async () => {
    if (!form.name.trim()) { toast.error('Product name is required'); return; }
    if (!form.price) { toast.error('Price is required'); return; }
    setSaving(true);
    try {
      const url = modal === 'add' ? '/api/admin/products' : `/api/admin/products/${selected?._id}`;
      const method = modal === 'add' ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(modal === 'add' ? 'Product added!' : 'Product updated!');
        await fetchProducts();
        setModal(null);
      } else {
        toast.error(data.error || 'Failed to save');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  const del = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/products/${selected._id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Product deleted');
        await fetchProducts();
        setModal(null);
      } else {
        toast.error('Failed to delete');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  const stockColor = (s: number) => s <= 3 ? '#e53e3e' : s <= 10 ? '#d4952a' : '#2d7a47';
  const stockBg = (s: number) => s <= 3 ? '#fef2f2' : s <= 10 ? '#fdf6ea' : '#edf7f1';

  return (
    <AdminShell>
      <div style={{ maxWidth: 1200 }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111b13', margin: 0 }}>Products</h2>
            <p style={{ fontSize: 13, color: '#9aaa9b', margin: '3px 0 0' }}>{products.length} total products in store</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={fetchProducts} style={iconBtn}><RefreshCw size={14} /></button>
            <button onClick={openAdd} style={primaryBtn}>
              <Plus size={14} /> Add Product
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Total', value: products.length, color: '#2563eb', bg: '#eff6ff' },
            { label: 'In Stock', value: products.filter(p => p.inStock).length, color: '#2d7a47', bg: '#edf7f1' },
            { label: 'Low Stock', value: products.filter(p => p.stock <= 10 && p.stock > 0).length, color: '#d4952a', bg: '#fdf6ea' },
            { label: 'Out of Stock', value: products.filter(p => p.stock === 0).length, color: '#e53e3e', bg: '#fef2f2' },
            { label: 'Featured', value: products.filter(p => p.featured).length, color: '#7c3aed', bg: '#f5f3ff' },
          ].map(c => (
            <div key={c.label} style={{ background: '#fff', border: '1px solid #eaefea', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: c.color, lineHeight: 1 }}>{c.value}</div>
              <div style={{ fontSize: 11, color: '#9aaa9b', marginTop: 3 }}>{c.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#b0bbb0' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…"
              style={{ ...inp, paddingLeft: 30, width: '100%' }} />
          </div>
          <select value={catF} onChange={e => setCatF(e.target.value)} style={inp}>
            {cats.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #eaefea', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: 48, textAlign: 'center', color: '#9aaa9b' }}>Loading products…</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#fafcfa', borderBottom: '1px solid #eaefea' }}>
                    {['Image', 'Product', 'Category', 'Price', 'Stock', 'Featured', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#9aaa9b', textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <tr key={p._id} style={{ borderTop: '1px solid #f4f6f4', background: i % 2 === 0 ? '#fff' : '#fdfeff' }}>

                      {/* Image */}
                      <td style={{ padding: '10px 14px' }}>
                        {p.image || p.images?.[0] ? (
                          <img src={p.image || p.images?.[0]} alt={p.name}
                            style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover', background: '#f4f6f4' }} />
                        ) : (
                          <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f4f6f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ImageIcon size={16} color="#ccc" />
                          </div>
                        )}
                      </td>

                      {/* Name */}
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ fontWeight: 600, color: '#111b13' }}>{p.name}</div>
                        {p.origin && <div style={{ fontSize: 11, color: '#9aaa9b' }}>{p.originFlag} {p.origin}</div>}
                      </td>

                      {/* Category */}
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{ background: '#f0f7f2', color: '#2d7a47', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 5 }}>{p.category}</span>
                      </td>

                      {/* Price */}
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ fontWeight: 700, color: '#111b13' }}>AED {p.price?.toFixed(2)}</div>
                        {p.originalPrice && p.originalPrice > 0 && (
                          <div style={{ fontSize: 11, color: '#ccc', textDecoration: 'line-through' }}>AED {p.originalPrice.toFixed(2)}</div>
                        )}
                      </td>

                      {/* Stock */}
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <span style={{ background: stockBg(p.stock), color: stockColor(p.stock), fontSize: 12, fontWeight: 700, padding: '2px 9px', borderRadius: 5 }}>
                            {p.stock} {p.unit}
                          </span>
                          {p.stock <= 10 && <AlertTriangle size={11} color={stockColor(p.stock)} />}
                        </div>
                      </td>

                      {/* Featured */}
                      <td style={{ padding: '10px 14px', color: p.featured ? '#d4952a' : '#ccc', fontWeight: 600, fontSize: 13 }}>
                        {p.featured ? '★ Yes' : '—'}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button onClick={() => openEdit(p)} style={actionBtn('#eff6ff', '#2563eb')} title="Edit">
                            <Edit2 size={13} />
                          </button>
                          <button onClick={() => openDel(p)} style={actionBtn('#fef2f2', '#e53e3e')} title="Delete">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div style={{ padding: 48, textAlign: 'center', color: '#9aaa9b' }}>
                  {loading ? 'Loading…' : 'No products found.'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(modal === 'add' || modal === 'edit') && (
        <div style={overlay}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>

            {/* Modal header */}
            <div style={{ padding: '16px 22px', borderBottom: '1px solid #eaefea', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', zIndex: 1 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#111b13' }}>
                {modal === 'add' ? '+ Add Product' : '✏️ Edit Product'}
              </span>
              <button onClick={() => setModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9aaa9b' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* Image preview */}
              {form.image && (
                <div style={{ textAlign: 'center' }}>
                  <img src={form.image} alt="Preview"
                    style={{ height: 120, width: '100%', objectFit: 'contain', borderRadius: 10, background: '#fafafa', border: '1px solid #eaefea' }} />
                </div>
              )}

              {/* Image URL */}
              <Field label="Image URL">
                <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..." style={inp} />
              </Field>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Field label="Product Name *">
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Alphonso Mango" style={inp} />
                </Field>
                <Field label="Category">
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={inp}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <Field label="Price (AED) *">
                  <input type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} style={inp} />
                </Field>
                <Field label="Original Price">
                  <input type="number" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: Number(e.target.value) })} style={inp} />
                </Field>
                <Field label="Stock Qty *">
                  <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: Number(e.target.value) })} style={inp} />
                </Field>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <Field label="Unit">
                  <select value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} style={inp}>
                    {UNITS.map(u => <option key={u}>{u}</option>)}
                  </select>
                </Field>
                <Field label="Origin">
                  <input value={form.origin} onChange={e => setForm({ ...form, origin: e.target.value })}
                    placeholder="India" style={inp} />
                </Field>
                <Field label="Flag Emoji">
                  <input value={form.originFlag} onChange={e => setForm({ ...form, originFlag: e.target.value })}
                    placeholder="🇮🇳" style={inp} />
                </Field>
              </div>

              <Field label="Description">
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={2} style={{ ...inp, resize: 'vertical' }} placeholder="Brief description of the product…" />
              </Field>

              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })}
                  style={{ accentColor: '#1a8a3c', width: 16, height: 16 }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#111b13' }}>Mark as Featured (shows on homepage)</span>
              </label>
            </div>

            {/* Modal footer */}
            <div style={{ padding: '14px 22px', borderTop: '1px solid #eaefea', display: 'flex', gap: 10, justifyContent: 'flex-end', position: 'sticky', bottom: 0, background: '#fff' }}>
              <button onClick={() => setModal(null)} style={cancelBtn}>Cancel</button>
              <button onClick={save} disabled={saving} style={primaryBtn}>
                {saving ? 'Saving…' : modal === 'add' ? 'Add Product' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {modal === 'delete' && (
        <div style={overlay}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 360, padding: 28, textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ width: 52, height: 52, background: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <Trash2 size={22} color="#e53e3e" />
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#111b13', marginBottom: 8 }}>Delete Product?</h3>
            <p style={{ fontSize: 13, color: '#9aaa9b', marginBottom: 22 }}>
              This will permanently delete <strong>{selected?.name}</strong> from your store.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button onClick={() => setModal(null)} style={cancelBtn}>Cancel</button>
              <button onClick={del} disabled={saving}
                style={{ ...primaryBtn, background: '#e53e3e' }}>
                {saving ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#111b13' }}>{label}</label>
      {children}
    </div>
  );
}

const inp: React.CSSProperties = { border: '1px solid #eaefea', borderRadius: 8, padding: '9px 11px', fontSize: 13, fontFamily: 'inherit', outline: 'none', color: '#111b13', background: '#fff', width: '100%', boxSizing: 'border-box' };
const overlay: React.CSSProperties = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 };
const primaryBtn: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 6, background: '#111b13', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' };
const cancelBtn: React.CSSProperties = { background: '#fff', border: '1px solid #eaefea', color: '#5a6b61', borderRadius: 8, padding: '9px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' };
const iconBtn: React.CSSProperties = { background: '#fff', border: '1px solid #eaefea', color: '#5a6b61', borderRadius: 8, padding: '9px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const actionBtn = (bg: string, color: string): React.CSSProperties => ({ width: 30, height: 30, border: 'none', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: bg, color });