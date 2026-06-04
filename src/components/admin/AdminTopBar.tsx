'use client';

import { usePathname } from 'next/navigation';
import { Bell, Search, ChevronDown } from 'lucide-react';

const BREADCRUMBS: Record<string, string[]> = {
  '/admin':           ['Dashboard'],
  '/admin/products':  ['Dashboard', 'Stock Management'],
  '/admin/orders':    ['Dashboard', 'Orders'],
  '/admin/customers': ['Dashboard', 'Customers'],
  '/admin/staff':     ['Dashboard', 'Staff'],
  '/admin/reports':   ['Dashboard', 'Reports'],
  '/admin/settings':  ['Dashboard', 'Settings'],
};

export default function AdminTopbar() {
  const pathname = usePathname();
  const crumbs = BREADCRUMBS[pathname] ?? ['Dashboard'];
  const title  = crumbs[crumbs.length - 1];

  return (
    <header style={{
      height: 56,
      background: '#fff',
      borderBottom: '1px solid #eaefea',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      gap: 16,
      flexShrink: 0,
    }}>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {crumbs.map((c, i) => (
          <span key={c} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i > 0 && <span style={{ color: '#ccd5cc', fontSize: 13 }}>/</span>}
            <span style={{
              fontSize: 13,
              color: i === crumbs.length - 1 ? '#111b13' : '#9aaa9b',
              fontWeight: i === crumbs.length - 1 ? 600 : 400,
            }}>
              {c}
            </span>
          </span>
        ))}
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={13} style={{
            position: 'absolute', left: 9,
            top: '50%', transform: 'translateY(-50%)',
            color: '#b0bbb0', pointerEvents: 'none',
          }} />
          <input
            placeholder="Search anything…"
            style={{
              paddingLeft: 28, paddingRight: 12,
              paddingTop: 6, paddingBottom: 6,
              border: '1px solid #eaefea',
              borderRadius: 7, fontSize: 12,
              width: 200, background: '#f8faf8',
              outline: 'none', color: '#111b13',
              fontFamily: 'inherit',
            }}
          />
        </div>

        {/* Notifications */}
        <button style={{
          width: 32, height: 32,
          borderRadius: 7,
          border: '1px solid #eaefea',
          background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          color: '#9aaa9b',
          position: 'relative',
          padding: 0,
        }}>
          <Bell size={14} />
          <span style={{
            position: 'absolute', top: 5, right: 5,
            width: 7, height: 7,
            borderRadius: '50%',
            background: '#e53e3e',
            border: '1.5px solid #fff',
          }} />
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 20, background: '#eaefea' }} />

        {/* Admin avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <div style={{
            width: 30, height: 30,
            borderRadius: 8,
            background: '#111b13',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#6ee0a0', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
          }}>
            AD
          </div>
          <div style={{ lineHeight: 1.3, display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#111b13' }}>Admin</span>
            <span style={{ fontSize: 10, color: '#9aaa9b' }}>Super Admin</span>
          </div>
          <ChevronDown size={12} color="#9aaa9b" />
        </div>
      </div>
    </header>
  );
}