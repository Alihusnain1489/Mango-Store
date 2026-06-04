'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Leaf, Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [form,    setForm]    = useState({ email: '', password: '' });
  const [showPw,  setShowPw]  = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email:    form.email,
      password: form.password,
    });

    if (res?.error) {
      setLoading(false);
      setError('Invalid email or password. Please try again.');
      return;
    }

    // ── Get session to check role and redirect accordingly ──
    const session = await getSession();
    const role = (session?.user as { role?: string })?.role;

    if (role === 'admin' || role === 'manager' || role === 'staff') {
      router.push('/admin');
    } else {
      router.push('/');
    }
    router.refresh();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'stretch' }}>

      {/* ── Left: Image panel ── */}
      <div style={{ flex: 1, position: 'relative', display: 'none' }} className="auth-image-panel">
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(10,32,16,0.88) 0%, rgba(10,32,16,0.6) 100%)',
        }} />
        <div style={{
          position: 'relative', zIndex: 1,
          height: '100%',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px',
        }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
            <div style={{ width: 40, height: 40, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf size={18} color="#fff" />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: '#fff' }}>Maan Al Khair</span>
          </Link>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
            Welcome<br /><span style={{ color: 'var(--gold)' }}>Back</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, lineHeight: 1.7 }}>
            Sign in to access your orders,<br />saved addresses, and more.
          </p>
          <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { emoji: '🛒', text: 'Track your orders in real time' },
              { emoji: '📍', text: 'Save multiple delivery addresses' },
              { emoji: '🎁', text: 'Exclusive deals for members' },
            ].map(i => (
              <div key={i.text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 20 }}>{i.emoji}</span>
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14 }}>{i.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: Form ── */}
      <div style={{
        width: '100%', maxWidth: 480,
        background: '#fff',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 40px',
      }}>
        {/* Mobile logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
          <div style={{ width: 36, height: 36, background: 'var(--green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Leaf size={16} color="#fff" />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--charcoal)' }}>Maan Al Khair</span>
        </Link>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 6 }}>
          Sign In
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 32 }}>
          Don&rsquo;t have an account?{' '}
          <Link href="/register" style={{ color: 'var(--green)', fontWeight: 600, textDecoration: 'none' }}>Create one</Link>
        </p>

        {error && (
          <div style={{
            background: '#fff5f5', border: '1px solid #fed7d7',
            borderRadius: 'var(--radius-sm)', padding: '12px 16px',
            color: '#c53030', fontSize: 14, marginBottom: 20,
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={formLabel}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                required
                style={{ ...formInput, paddingLeft: 40 }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
              <label style={{ ...formLabel, marginBottom: 0 }}>Password</label>
              <Link href="/forgot-password" style={{ fontSize: 12, color: 'var(--green)', textDecoration: 'none', fontWeight: 500 }}>
                Forgot password?
              </Link>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type={showPw ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
                style={{ ...formInput, paddingLeft: 40, paddingRight: 40 }}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0, display: 'flex',
              }}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: 'var(--green)', color: '#fff', border: 'none',
              borderRadius: 'var(--radius-sm)', padding: '13px',
              fontSize: 15, fontWeight: 600,
              cursor: loading ? 'wait' : 'pointer',
              opacity: loading ? 0.75 : 1,
              fontFamily: 'var(--font-body)', marginTop: 4,
              transition: 'opacity 0.2s',
            }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>or continue as</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        <Link href="/products" style={{
          display: 'block', textAlign: 'center',
          border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius-sm)', padding: '12px',
          fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none',
          fontWeight: 500,
        }}>
          Browse as Guest
        </Link>
      </div>

      <style>{`
        .auth-image-panel { display: none !important; }
        @media(min-width: 768px) { .auth-image-panel { display: block !important; } }
      `}</style>
    </div>
  );
}

const formLabel: React.CSSProperties = {
  display: 'block', fontSize: 13, fontWeight: 600,
  color: 'var(--charcoal)', marginBottom: 7, letterSpacing: '0.02em',
};
const formInput: React.CSSProperties = {
  width: '100%',
  border: '1.5px solid var(--border)',
  borderRadius: 'var(--radius-sm)',
  padding: '11px 14px',
  fontSize: 14, color: 'var(--charcoal)',
  background: '#fff', outline: 'none',
  fontFamily: 'var(--font-body)',
  transition: 'border-color 0.2s',
};