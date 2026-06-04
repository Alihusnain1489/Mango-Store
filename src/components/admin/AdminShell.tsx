'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, ShoppingBag,
  Users, LogOut, Menu, X,
} from 'lucide-react';
import { useState } from 'react';

const NAV = [
  { href: '/admin',           label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products',  label: 'Products',  icon: Package         },
  { href: '/admin/orders',    label: 'Orders',    icon: ShoppingBag     },
  { href: '/admin/customers', label: 'Customers', icon: Users           },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f6f4', fontFamily: 'inherit' }}>

      {/* Sidebar */}
      <aside style={{
        width: 220, background: '#111b13', flexShrink: 0,
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: open ? 0 : -220,
        height: '100vh', zIndex: 100, transition: 'left 0.25s',
      }}
        className="md-sidebar">

        {/* Logo */}
        <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24 }}>🥭</span>
            <div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: 14, lineHeight: 1 }}>Aan Al Khair</div>
              <div style={{ color: '#4caf70', fontSize: 10, marginTop: 2 }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = path === href || (href !== '/admin' && path.startsWith(href));
            return (
              <Link key={href} href={href}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 8, textDecoration: 'none',
                  background: active ? 'rgba(76,175,112,0.15)' : 'transparent',
                  color: active ? '#4caf70' : 'rgba(255,255,255,0.55)',
                  fontSize: 13, fontWeight: active ? 700 : 400,
                  transition: 'all 0.15s',
                }}>
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none' }}>
            <LogOut size={15} /> Back to Store
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99 }} />}

      {/* Main */}
      <div style={{ flex: 1, marginLeft: 220, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Top bar */}
        <div style={{ background: '#fff', borderBottom: '1px solid #eaefea', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none' }} className="mobile-menu-btn">
              <Menu size={20} />
            </button>
            <span style={{ fontSize: 13, color: '#9aaa9b' }}>
              {NAV.find(n => n.href === path || (n.href !== '/admin' && path.startsWith(n.href)))?.label || 'Admin'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#111b13', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>A</div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#111b13' }}>Admin</span>
          </div>
        </div>

        {/* Page content */}
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .md-sidebar { left: -220px !important; }
          .md-sidebar.open { left: 0 !important; }
          .mobile-menu-btn { display: flex !important; }
          div[style*="margin-left: 220px"] { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}