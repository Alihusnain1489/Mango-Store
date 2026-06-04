'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  change: string;
  up: boolean;
  icon: React.ReactNode;
  accent: string;
}

export default function StatsCards({ stats }: { stats: Stat[] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: 16,
      marginBottom: 24,
    }}>
      {stats.map((s) => (
        <div key={s.label} style={{
          background: '#fff',
          borderRadius: 10,
          padding: '18px 20px',
          border: '1px solid #e8ede9',
        }}>
          {/* Top row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{
              fontSize: 11, fontWeight: 600, color: '#8fa893',
              textTransform: 'uppercase', letterSpacing: '0.07em',
            }}>
              {s.label}
            </span>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: s.accent + '18',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {s.icon}
            </div>
          </div>

          {/* Value */}
          <div style={{
            fontSize: 24, fontWeight: 700,
            color: '#1a2e1f', lineHeight: 1,
            marginBottom: 10,
            letterSpacing: '-0.02em',
          }}>
            {s.value}
          </div>

          {/* Change */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {s.up
              ? <TrendingUp  size={12} color="#1c6b3a" />
              : <TrendingDown size={12} color="#e53e3e" />
            }
            <span style={{ fontSize: 12, fontWeight: 600, color: s.up ? '#1c6b3a' : '#e53e3e' }}>
              {s.change}
            </span>
            <span style={{ fontSize: 12, color: '#aab8ad' }}>vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}