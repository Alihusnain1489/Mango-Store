'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, ShoppingBag, Users,
  UserCog, BarChart3, Settings, ChevronLeft,
  ChevronRight, LogOut, Leaf, Store,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin',           icon: LayoutDashboard, label: 'Dashboard',        badge: null },
  { href: '/admin/products',  icon: Package,         label: 'Stock',            badge: '4'  },
  { href: '/admin/orders',    icon: ShoppingBag,     label: 'Orders',           badge: '8'  },
  { href: '/admin/customers', icon: Users,           label: 'Customers',        badge: null },
  { href: '/admin/staff',     icon: UserCog,         label: 'Staff',            badge: null },
  { href: '/admin/reports',   icon: BarChart3,       label: 'Reports',          badge: null },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside style={{
      width: collapsed ? 60 : 210,
      background: '#111b13',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      transition: 'width 0.2s ease',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── Logo ── */}
      <div style={{
        height: 56,
        display: 'flex',
        alignItems: 'center',
        padding: collapsed ? '0 14px' : '0 16px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        gap: 10,
        flexShrink: 0,
      }}>
        <div style={{
          width: 28, height: 28,
          background: '#2d7a47',
          borderRadius: 7,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Leaf size={13} color="#fff" />
        </div>
        {!collapsed && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{
              fontSize: 13, fontWeight: 700,
              color: '#fff',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.01em',
            }}>
              Maan Al Khair
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Admin Panel
            </div>
          </div>
        )}
      </div>

      {/* ── Nav items ── */}
      <nav style={{ flex: 1, padding: '8px 6px', overflowY: 'auto', overflowX: 'hidden' }}>

        {!collapsed && (
          <div style={{
            fontSize: 10, fontWeight: 600,
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '10px 10px 6px',
          }}>
            Menu
          </div>
        )}

        {NAV_ITEMS.map(({ href, icon: Icon, label, badge }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: collapsed ? '10px 16px' : '9px 10px',
                borderRadius: 7,
                margin: '1px 0',
                background: active ? 'rgba(45,122,71,0.35)' : 'transparent',
                color: active ? '#6ee0a0' : 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
                position: 'relative',
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
            >
              <Icon size={15} style={{ flexShrink: 0 }} />
              {!collapsed && (
                <>
                  <span style={{ flex: 1 }}>{label}</span>
                  {badge && (
                    <span style={{
                      background: active ? '#2d7a47' : 'rgba(255,255,255,0.12)',
                      color: active ? '#fff' : 'rgba(255,255,255,0.5)',
                      fontSize: 10, fontWeight: 700,
                      padding: '1px 6px',
                      borderRadius: 10,
                      minWidth: 18,
                      textAlign: 'center',
                    }}>
                      {badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom ── */}
      <div style={{
        padding: '6px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        flexShrink: 0,
      }}>
        <Link href="/" title={collapsed ? 'Store' : undefined} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: collapsed ? '9px 16px' : '9px 10px',
          borderRadius: 7,
          justifyContent: collapsed ? 'center' : 'flex-start',
          color: 'rgba(255,255,255,0.35)',
          textDecoration: 'none', fontSize: 12,
          whiteSpace: 'nowrap',
        }}>
          <Store size={14} style={{ flexShrink: 0 }} />
          {!collapsed && 'Visit Store'}
        </Link>
        <Link href="/admin/settings" title={collapsed ? 'Settings' : undefined} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: collapsed ? '9px 16px' : '9px 10px',
          borderRadius: 7,
          justifyContent: collapsed ? 'center' : 'flex-start',
          color: 'rgba(255,255,255,0.35)',
          textDecoration: 'none', fontSize: 12,
          whiteSpace: 'nowrap',
        }}>
          <Settings size={14} style={{ flexShrink: 0 }} />
          {!collapsed && 'Settings'}
        </Link>
      </div>

      {/* ── Collapse btn ── */}
      <button
        onClick={() => setCollapsed(c => !c)}
        style={{
          position: 'absolute',
          top: 16, right: -10,
          width: 20, height: 20,
          borderRadius: '50%',
          background: '#2d7a47',
          border: '2px solid #111b13',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 20,
          padding: 0,
        }}
      >
        {collapsed ? <ChevronRight size={10} /> : <ChevronLeft size={10} />}
      </button>
    </aside>
  );
}