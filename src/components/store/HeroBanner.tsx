'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
  {
    image: '/mango22.jpg',
    subtitle: 'Premium Mangoes',
    title: 'Joy In Every Bite',
    description: 'Fresh Alphonso, Chaunsa, Sindhri & Anwar Ratol delivered across Dubai.',
    cta: 'Shop Mangoes',
  },
  {
    image: '/jamun.jpg',
    subtitle: 'Farm Fresh',
    title: 'Quality You Can Trust',
    description: 'Fresh fruits delivered daily with guaranteed quality and freshness.',
    cta: 'View Collection',
  },
  {
    image: '/lychee.jpg',
    subtitle: 'Fresh Fruits',
    title: 'Imported From The Best Farms',
    description: 'Hand-picked fruits sourced from India, Pakistan, South Africa & Thailand.',
    cta: 'Order Now',
  },
];

export default function HeroBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];

  return (
    <section className="w-full max-w-[1600px] mx-auto px-3 md:px-4 pt-3 md:pt-4">
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl h-[280px] sm:h-[360px] md:h-[520px]">

        {/* Slides */}
        {slides.map((s, index) => (
          <div
            key={s.image}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              active === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/30 to-transparent" />
          </div>
        ))}


        {/* Clickable overlay for non-button area */}
        <Link href="/products" className="absolute inset-0 z-0" aria-label="Shop all products" />

        {/* Dots — above everything */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-[2]">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: active === index ? 28 : 10,
                height: 10,
                background: active === index ? '#1a8a3c' : 'rgba(255,255,255,0.7)',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Left / Right arrows */}
        <button
          onClick={() => setActive((active - 1 + slides.length) % slides.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-[2] bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white rounded-full p-2 transition"
        >
          ‹
        </button>
        <button
          onClick={() => setActive((active + 1) % slides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-[2] bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white rounded-full p-2 transition"
        >
          ›
        </button>
      </div>
    </section>
  );
}