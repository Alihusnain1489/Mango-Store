'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const slides = [
  {
    image: '/mango22.jpg',
    subtitle: 'Premium Mangoes',
    title: 'Joy In Every Bite',
    description: 'Fresh Chaunsa, Sindhri & Anwar Ratol delivered across Dubai.',
    cta: 'Shop Mangoes',
    href: '/products?category=Premium Mangoes',
  },
  {
    image: '/jamun.jpg',
    subtitle: 'Farm Fresh',
    title: 'Quality You Can Trust',
    description: 'Fresh fruits delivered daily with guaranteed quality and freshness.',
    cta: 'View Collection',
    href: '/products?category=Seasonal',
  },
  {
    image: '/lychee.jpg',
    subtitle: 'Fresh Fruits',
    title: 'Imported From The Best Farms',
    description: 'Hand-picked fruits sourced from Pakistan, UAE & beyond.',
    cta: 'Order Now',
    href: '/products',
  },
];

export default function HeroBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];

  return (
    <>
      {/* Full-width, no padding, no border-radius — matches Farzana mobile layout */}
      <section style={{ width: '100%', position: 'relative', overflow: 'hidden', background: '#1a7a3c', height: 'var(--hero-h)' }}>

        {/* Slides */}
        {slides.map((s, i) => (
          <div key={s.image} style={{ position: 'absolute', inset: 0, opacity: active === i ? 1 : 0, transition: 'opacity 0.8s ease' }}>
            <img
              src={s.image}
              alt={s.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
          </div>
        ))}

        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 7, zIndex: 2 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`Slide ${i + 1}`}
              style={{ border: 'none', cursor: 'pointer', borderRadius: 50, padding: 0, height: 8, width: active === i ? 26 : 8, background: active === i ? '#fff' : 'rgba(255,255,255,0.45)', transition: 'width 0.3s, background 0.3s' }} />
          ))}
        </div>
      </section>

      <style>{`
        :root { --hero-h: 200px; }
        @media (min-width: 480px)  { :root { --hero-h: 280px; } }
        @media (min-width: 768px)  { :root { --hero-h: 420px; } }
        @media (min-width: 1024px) { :root { --hero-h: 520px; } }
      `}</style>
    </>
  );
}