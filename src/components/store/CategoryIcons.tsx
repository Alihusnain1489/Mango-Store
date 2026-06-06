'use client';

import Link from 'next/link';

const CATS = [
  { name: 'Mangoes',    image: '/11.jpg',  href: '/products?category=Premium Mangoes' },
  { name: 'Seasonal',   image: '/1.jpg',   href: '/products?category=Seasonal' },
  { name: 'Fruits',     image: '/22.jpg',  href: '/products?category=Fruits' },
  { name: 'Vegetables', image: '/33.jpg',  href: '/products?category=Vegetables' },
];

export default function CategoryIcons() {
  return (
    <div style={{ background: '#fff', padding: '24px 16px 20px', borderBottom: '1px solid #f0f0f0' }}>

      <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 800, color: '#555', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 20 }}>
        Shop By Category
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'nowrap' }}>
        {CATS.map((cat) => (
          <Link key={cat.name} href={cat.href} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: 'calc(25% - 12px)', maxWidth: 100 }}>
            <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: '50%', background: '#fdf3f0', border: '1.5px solid #f0e8e5', overflow: 'hidden' }}>
              <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#222', textAlign: 'center', lineHeight: 1.3 }}>
              {cat.name}
            </span>
          </Link>
        ))}
      </div>

    </div>
  );
}