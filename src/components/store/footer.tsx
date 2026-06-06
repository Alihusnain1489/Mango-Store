import Link from 'next/link';
import { Leaf, MapPin, Phone, Clock, Share2, MessageCircle, Send } from 'lucide-react';


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
      
    </footer>
  );
}

const fh: React.CSSProperties = { fontFamily: 'var(--font-display)', color: '#fff', fontSize: 15, fontWeight: 600, marginBottom: 18, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.08)' };
const fl: React.CSSProperties = { color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 14, display: 'inline-block' };