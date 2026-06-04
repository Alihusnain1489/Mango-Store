import Link from 'next/link';
import { Leaf, MapPin, Phone, Clock, Share2, MessageCircle, Send } from 'lucide-react';

const QUICK_LINKS = [
  { href: '/',                              label: 'Home'          },
  { href: '/products',                      label: 'Shop All'      },
  { href: '/products?category=fruits',      label: 'Fresh Fruits'  },
  { href: '/products?category=vegetables',  label: 'Vegetables'    },
  { href: '/products?category=mangoes',     label: 'Mangoes'       },
  { href: '/#about',                        label: 'About Us'      },
  { href: '/#contact',                      label: 'Contact'       },
];

const ACCOUNT_LINKS = [
  { href: '/account',           label: 'My Account'    },
  { href: '/account/addresses', label: 'Addresses'     },
  { href: '/track',             label: 'Track Order'   },
  { href: '/login',             label: 'Sign In'       },
  { href: '/register',          label: 'Register'      },
];

const HOURS = [
  { day: 'Mon – Thu', time: '8:00 AM – 10:00 PM' },
  { day: 'Friday',    time: '8:00 AM – 12:00 PM, 2:00 PM – 10:00 PM' },
  { day: 'Sat – Sun', time: '9:00 AM – 10:00 PM' },
];

const SOCIALS = [
  { icon: Share2,        href: 'https://instagram.com/maanalkhair', label: 'Instagram' },
  { icon: MessageCircle, href: 'https://facebook.com/maanalkhair',  label: 'Facebook'  },
  { icon: Send,          href: 'https://wa.me/971500000000',         label: 'WhatsApp'  },
];

const ZONES = ['Dubai Marina', 'JBR', 'Downtown', 'Jumeirah', 'Al Barsha', 'Deira', 'Sharjah', 'Abu Dhabi'];

export default function Footer() {
  return (
    <footer style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative' }}>
        {/* BG */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1800&q=70')`, backgroundSize: 'cover', backgroundPosition: 'center top', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,32,16,0.95) 0%, rgba(10,32,16,0.98) 100%)', zIndex: 1 }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '72px 24px 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 48, marginBottom: 48 }}>

            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 42, height: 42, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Leaf size={20} color="#fff" />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>Maan Al Khair</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Fresh Fruits & Vegetables · Dubai</div>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.75, marginBottom: 16 }}>
                Dubai&apos;s trusted destination for premium fresh fruits and vegetables. Sourced from the world&apos;s finest farms, delivered to your door across the UAE.
              </p>
              {/* Delivery zones */}
              <div style={{ marginBottom: 20 }}>
                <p style={{ color: 'var(--gold)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>We deliver to</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {ZONES.map(z => (
                    <span key={z} style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', fontSize: 11, padding: '3px 8px', borderRadius: 4 }}>{z}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" style={{ width: 34, height: 34, border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 style={fh}>Quick Links</h4>
              <ul style={{ listStyle: 'none' }}>
                {QUICK_LINKS.map(({ href, label }) => (
                  <li key={href} style={{ marginBottom: 10 }}>
                    <Link href={href} style={fl}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Account */}
            <div>
              <h4 style={fh}>My Account</h4>
              <ul style={{ listStyle: 'none' }}>
                {ACCOUNT_LINKS.map(({ href, label }) => (
                  <li key={href} style={{ marginBottom: 10 }}>
                    <Link href={href} style={fl}>{label}</Link>
                  </li>
                ))}
              </ul>
              {/* VAT notice */}
              <div style={{ marginTop: 20, padding: '10px 12px', background: 'rgba(212,149,42,0.12)', border: '1px solid rgba(212,149,42,0.2)', borderRadius: 6 }}>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.5 }}>
                  All prices are in <strong style={{ color: 'var(--gold)' }}>AED</strong> and include 5% UAE VAT.
                </p>
              </div>
            </div>

            {/* Contact & Hours */}
            <div>
              <h4 style={fh}>Contact & Hours</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  <MapPin size={15} color="var(--gold)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, lineHeight: 1.6 }}>
                    Al Wasl Road, Jumeirah,<br />Dubai, United Arab Emirates
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <Phone size={14} color="var(--gold)" style={{ flexShrink: 0 }} />
                  <a href="tel:+97140000000" style={{ ...fl, fontSize: 13 }}>+971 4 000 0000</a>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Clock size={14} color="var(--gold)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    {HOURS.map(h => (
                      <div key={h.day} style={{ marginBottom: 5 }}>
                        <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>{h.day}: </span>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* WhatsApp CTA */}
                <a href="https://wa.me/971500000000" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25d366', color: '#fff', textDecoration: 'none', padding: '9px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, marginTop: 4 }}>
                  <Send size={14} /> Order on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>
              &copy; {new Date().getFullYear()} Maan Al Khair LLC. All rights reserved. Dubai, UAE. TRN: 100XXXXXXXXX
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              {['Privacy Policy', 'Terms of Service', 'Returns Policy'].map(t => (
                <Link key={t} href="#" style={{ ...fl, fontSize: 11 }}>{t}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const fh: React.CSSProperties = { fontFamily: 'var(--font-display)', color: '#fff', fontSize: 15, fontWeight: 600, marginBottom: 18, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.08)' };
const fl: React.CSSProperties = { color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 14, display: 'inline-block' };