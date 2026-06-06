'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';

const DEALS = [
  { emoji: '🥭', name: 'Mango Box',   desc: 'Mixed premium varieties', qty: '4 Kg Box',  price: 60, originalPrice: 80, slug: 'mango-chaunsa-premium' },
  { emoji: '🍐', name: 'Amrood Box',  desc: 'Pakistani Guava',         qty: '2 Kg Box',  price: 30, originalPrice: 40, slug: 'pakistani-guava' },
  { emoji: '🍎', name: 'Apple Box',   desc: 'Premium Red Apples',      qty: '10 Kg Box', price: 50, originalPrice: 70, slug: 'premium-red-apples' },
];

export default function SuperSavings() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #0f4f25 0%, #1a7a3c 60%, #22a050 100%)', padding: '40px 20px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: '#f5a623', borderRadius: 8, padding: '5px 8px', display: 'flex', alignItems: 'center' }}>
              <Zap size={18} color="#fff" fill="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>⚡ Super Savings</h2>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 3 }}>Exclusive box deals — limited time offer</p>
            </div>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#f5a623', background: 'rgba(245,166,35,0.15)', border: '1.5px solid rgba(245,166,35,0.4)', borderRadius: 50, padding: '5px 14px', whiteSpace: 'nowrap' }}>
            🔥 Today Only
          </span>
        </div>

        {/* Deal cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {DEALS.map((deal) => {
            const saving = deal.originalPrice - deal.price;
            const pct    = Math.round((saving / deal.originalPrice) * 100);
            return (
              <Link key={deal.slug} href={`/products/${deal.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{ background: '#fff', borderRadius: 16, padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', position: 'relative', overflow: 'hidden', transition: 'transform 0.15s, box-shadow 0.15s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.2)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'; }}
                >
                  {/* Save badge */}
                  <div style={{ position: 'absolute', top: 12, right: 12, background: '#e8f9ee', color: '#1a7a3c', fontSize: 11, fontWeight: 800, borderRadius: 50, padding: '3px 9px' }}>
                    SAVE {pct}%
                  </div>

                  {/* Emoji */}
                  <div style={{ fontSize: 44, lineHeight: 1, flexShrink: 0 }}>{deal.emoji}</div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>{deal.desc}</p>
                    <p style={{ fontSize: 17, fontWeight: 900, color: '#1a1a1a', marginBottom: 4 }}>{deal.name}</p>
                    <p style={{ fontSize: 13, color: '#666', marginBottom: 10 }}>{deal.qty}</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{ fontSize: 26, fontWeight: 900, color: '#1a7a3c', lineHeight: 1 }}>AED {deal.price}</span>
                      <span style={{ fontSize: 14, color: '#bbb', textDecoration: 'line-through' }}>AED {deal.originalPrice}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}