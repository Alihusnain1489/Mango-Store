'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Leaf, Eye, EyeOff, Lock, Mail, User, Phone } from 'lucide-react';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirm: '',
  });
  const [showPw,   setShowPw]   = useState(false);
  const [showCon,  setShowCon]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:     form.name,
          email:    form.email,
          phone:    form.phone,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed. Please try again.');
        setLoading(false);
        return;
      }

      // Auto sign-in after register
      const { signIn } = await import('next-auth/react');
      const signInRes = await signIn('credentials', {
        redirect: false,
        email:    form.email,
        password: form.password,
      });

      if (signInRes?.error) {
        // Registration worked but auto-login failed — just redirect to login
        router.push('/login?registered=true');
      } else {
        router.push('/');
        router.refresh();
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'stretch' }}>

      {/* ── Left: Form panel ── */}
      <div style={{
        width: '100%',
        maxWidth: 520,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 40px',
        overflowY: 'auto',
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{ width: 36, height: 36, background: 'var(--green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Leaf size={16} color="#fff" />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--charcoal)' }}>
            Maan Al Khair
          </span>
        </Link>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 6 }}>
          Create Account
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 28 }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--green)', fontWeight: 600, textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>

        {/* Error */}
        {error && (
          <div style={{
            background: '#fff5f5', border: '1px solid #fed7d7',
            borderRadius: 'var(--radius-sm)', padding: '12px 16px',
            color: '#c53030', fontSize: 14, marginBottom: 20,
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Full name */}
          <div>
            <label style={formLabel}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={15} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Ahmad Ali"
                required
                style={{ ...formInput, paddingLeft: 40 }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={formLabel}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={15} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
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

          {/* Phone */}
          <div>
            <label style={formLabel}>Phone Number</label>
            <div style={{ position: 'relative' }}>
              <Phone size={15} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="+92 300 0000000"
                style={{ ...formInput, paddingLeft: 40 }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={formLabel}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type={showPw ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="Min. 8 characters"
                required
                style={{ ...formInput, paddingLeft: 40, paddingRight: 40 }}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} style={eyeBtn}>
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div>
            <label style={formLabel}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type={showCon ? 'text' : 'password'}
                value={form.confirm}
                onChange={e => setForm({ ...form, confirm: e.target.value })}
                placeholder="Re-enter password"
                required
                style={{
                  ...formInput,
                  paddingLeft: 40, paddingRight: 40,
                  borderColor: form.confirm && form.confirm !== form.password ? '#e53e3e' : undefined,
                }}
              />
              <button type="button" onClick={() => setShowCon(!showCon)} style={eyeBtn}>
                {showCon ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {form.confirm && form.confirm !== form.password && (
              <p style={{ fontSize: 12, color: '#e53e3e', marginTop: 5 }}>Passwords do not match</p>
            )}
          </div>

          {/* Terms */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <input type="checkbox" id="terms" required style={{ marginTop: 2, accentColor: 'var(--green)', flexShrink: 0 }} />
            <label htmlFor="terms" style={{ fontSize: 13, color: 'var(--text-muted)', cursor: 'pointer', lineHeight: 1.5 }}>
              I agree to the{' '}
              <Link href="#" style={{ color: 'var(--green)', fontWeight: 600, textDecoration: 'none' }}>Terms of Service</Link>
              {' '}and{' '}
              <Link href="#" style={{ color: 'var(--green)', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</Link>
            </label>
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
              fontFamily: 'var(--font-body)',
              marginTop: 4,
              transition: 'opacity 0.2s',
            }}
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>
      </div>

      {/* ── Right: Image panel ── */}
      <div style={{ flex: 1, position: 'relative', display: 'none' }} className="auth-image-panel">
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&q=80')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(10,32,16,0.6) 0%, rgba(10,32,16,0.88) 100%)',
        }} />
        <div style={{
          position: 'relative', zIndex: 1,
          height: '100%',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px',
        }}>
          {/* Benefits */}
          <p style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
            Why Join Us?
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 32 }}>
            Fresh Produce,<br />
            <span style={{ color: 'var(--gold)' }}>Your Way</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { emoji: '🥭', title: 'Exclusive Deals',       desc: 'Members get early access to seasonal offers and discounts.' },
              { emoji: '🚚', title: 'Track Every Order',     desc: 'Real-time delivery tracking from farm to your door.' },
              { emoji: '📋', title: 'Order History',         desc: 'Re-order your favourites with a single click.' },
              { emoji: '📍', title: 'Save Addresses',        desc: 'Save multiple delivery addresses for faster checkout.' },
            ].map(b => (
              <div key={b.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{
                  width: 40, height: 40, flexShrink: 0,
                  background: 'rgba(212,149,42,0.18)',
                  border: '1px solid rgba(212,149,42,0.3)',
                  borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18,
                }}>
                  {b.emoji}
                </div>
                <div>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{b.title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, lineHeight: 1.5 }}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
const eyeBtn: React.CSSProperties = {
  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
  background: 'none', border: 'none', cursor: 'pointer',
  color: 'var(--text-muted)', padding: 0, display: 'flex',
};