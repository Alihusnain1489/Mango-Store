import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, compact = false): string {
  if (compact && amount >= 1000) {
    return `AED ${(amount / 1000).toFixed(1)}K`;
  }
  const formatted = Number.isInteger(amount)
    ? amount.toLocaleString('en-AE')
    : amount.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `AED ${formatted}`;
}

export function parsePrice(product: Record<string, unknown>): number {
  return Number(product.price ?? product.pricePerKg ?? 0);
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `MAK-${timestamp}-${random}`;
}

export const DELIVERY_ZONES = [
  { name: 'Dubai Marina',   fee: 0,  minOrder: 50  },
  { name: 'JBR',            fee: 0,  minOrder: 50  },
  { name: 'Downtown Dubai', fee: 0,  minOrder: 50  },
  { name: 'Jumeirah',       fee: 5,  minOrder: 40  },
  { name: 'Al Barsha',      fee: 5,  minOrder: 40  },
  { name: 'Deira',          fee: 8,  minOrder: 30  },
  { name: 'Bur Dubai',      fee: 8,  minOrder: 30  },
  { name: 'Mirdif',         fee: 10, minOrder: 30  },
  { name: 'Sharjah',        fee: 15, minOrder: 80  },
  { name: 'Abu Dhabi',      fee: 25, minOrder: 150 },
  { name: 'Other UAE',      fee: 20, minOrder: 100 },
];

export function calculateDeliveryFee(subtotal: number, zone?: string): number {
  if (zone) {
    const match = DELIVERY_ZONES.find(z => z.name === zone);
    if (match) return subtotal >= match.minOrder ? match.fee : match.fee + 5;
  }
  return subtotal >= 150 ? 0 : 15;
}

export const STORE_INFO = {
  name:           'Maan Al Khair',
  tagline:        'Fresh Fruits & Vegetables',
  city:           'Dubai, UAE',
  address:        'Al Wasl Road, Jumeirah, Dubai',
  phone:          '+971 4 000 0000',
  whatsapp:       '+971 50 000 0000',
  email:          'orders@maanalkhair.ae',
  website:        'https://www.maanalkhair.ae',
  currency:       'AED',
  currencySymbol: 'AED',
  vatRate:        0.05,
  mapLink:        'https://maps.google.com/?q=Maan+Al+Khair+Dubai',
  instagram:      'https://instagram.com/maanalkhair',
  facebook:       'https://facebook.com/maanalkhair',
  whatsappLink:   'https://wa.me/971500000000',
};
