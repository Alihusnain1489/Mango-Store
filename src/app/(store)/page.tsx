import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import HeroBanner from '@/components/store/HeroBanner';
import CategoryIcons from '@/components/store/CategoryIcons';
import ProductGrid from '@/components/store/ProductGrid';
import { Product } from '@/types';
import { Truck, ShieldCheck, Star, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Maan Al Khair — Premium Mangoes, Fruits & Vegetables Dubai',
  description: "Dubai's finest mangoes — Alphonso, Chaunsa, Sindhri & more. Same-day delivery. All prices in AED.",
};

async function getProducts(featured?: boolean): Promise<Product[]> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const url  = featured ? `${base}/api/products?featured=true` : `${base}/api/products`;
    const res  = await fetch(url, { next: { revalidate: 180 } });
    if (!res.ok) return [];
    const d = await res.json();
    if (Array.isArray(d))          return d;
    if (Array.isArray(d.products)) return d.products;
    return [];
  } catch {
    return [];
  }
}

const WHY = [
  {
    icon: <Truck size={22} color="#1a7a3c" />,
    bg: '#e6f7ed',
    title: 'Same-Day Delivery',
    desc: 'Order before 2 PM and get your fresh produce delivered across Dubai today.',
  },
  {
    icon: <ShieldCheck size={22} color="#1a7a3c" />,
    bg: '#e6f7ed',
    title: 'Freshness Guaranteed',
    desc: 'Not happy? Full refund, no questions asked. We stand behind our quality.',
  },
  {
    icon: <Star size={22} color="#f5a623" />,
    bg: '#fff8ee',
    title: 'Premium Selection',
    desc: "Hand-picked from world's top farms — India, Pakistan, Thailand, South Africa.",
  },
  {
    icon: <RefreshCw size={22} color="#2563eb" />,
    bg: '#eff6ff',
    title: 'Daily Restocking',
    desc: 'Fresh stock arrives every morning so you always get the best quality produce.',
  },
];

export default async function HomePage() {
  const [featured, all] = await Promise.all([getProducts(true), getProducts()]);
  const mangoes    = all.filter((p) => p.category === 'Mangoes');
  const fruits     = all.filter((p) => p.category === 'Fruits');
  const vegetables = all.filter((p) => p.category === 'Vegetables');

  return (
    <div style={{ background: '#f7f8f7' }}>

      {/* Hero */}
      <HeroBanner />

      {/* Category icons */}
      <div style={{ background: '#fff', padding: '28px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20 }}>
            Shop by Category
          </p>
          <CategoryIcons />
        </div>
      </div>

       {/* Mangoes */}
      {mangoes.length > 0 && (
        <div style={{ background: 'linear-gradient(180deg, #fffdf5, #fffbee)', padding: '40px 20px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <SectionHeader title="🥭 Fresh Mangoes" subtitle="Premium varieties from India, Pakistan & beyond" link="/products?category=Mangoes" />
            <Suspense fallback={<SkeletonGrid />}>
              <ProductGrid products={mangoes} showFilters={false} />
            </Suspense>
          </div>
        </div>
      )}

      {/* Featured / Super Savings */}
      {featured.length > 0 && (
        <div style={{ background: '#fff', padding: '40px 20px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <SectionHeader title="⚡ Super Savings" subtitle="Limited time deals on fresh produce" link="/products" />
            <Suspense fallback={<SkeletonGrid />}>
              <ProductGrid products={featured} showFilters={false} />
            </Suspense>
          </div>
        </div>
      )}



      {/* Fruits */}
      {fruits.length > 0 && (
        <div style={{ background: '#f7f8f7', padding: '40px 20px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <SectionHeader title="🍎 Fresh Fruits" subtitle="Imported from top farms worldwide" link="/products?category=Fruits" />
            <Suspense fallback={<SkeletonGrid />}>
              <ProductGrid products={fruits} showFilters={false} />
            </Suspense>
          </div>
        </div>
      )}

      {/* Vegetables */}
      {vegetables.length > 0 && (
        <div style={{ background: '#fff', padding: '40px 20px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <SectionHeader title="🥦 Fresh Vegetables" subtitle="UAE-grown and imported premium vegetables" link="/products?category=Vegetables" />
            <Suspense fallback={<SkeletonGrid />}>
              <ProductGrid products={vegetables} showFilters={false} />
            </Suspense>
          </div>
        </div>
      )}


     
    </div>
  );
}

function SectionHeader({ title, subtitle, link }: { title: string; subtitle: string; link: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 22, flexWrap: 'wrap', gap: 12 }}>
      <div>
        <h2 style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 900, color: 'var(--charcoal)', lineHeight: 1.2 }}>{title}</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 3 }}>{subtitle}</p>
      </div>
      <Link href={link} style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', textDecoration: 'none', border: '1.5px solid var(--green)', borderRadius: 50, padding: '7px 18px', whiteSpace: 'nowrap' }}>
        View All →
      </Link>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 14 }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          <div className="skeleton" style={{ aspectRatio: '1/1', width: '100%' }} />
          <div style={{ padding: 12, background: '#fff' }}>
            <div className="skeleton" style={{ height: 12, width: '60%', marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 18, width: '80%', marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 36, width: '100%' }} />
          </div>
        </div>
      ))}
    </div>
  );
}