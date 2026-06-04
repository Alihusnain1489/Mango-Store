'use client';

import Link from 'next/link';
import Image from 'next/image';

const CATS = [
  {
    name: 'Mangoes',
    image: '/11.jpg',
    href: '/products?category=Mangoes',
  },
  {
    name: 'Fruits',
    image: '/22.jpg',
    href: '/products?category=Fruits',
  },
  {
    name: 'Vegetables',
    image: '/33.jpg',
    href: '/products?category=Vegetables',
  },
  {
    name: 'Seasonal',
    image: '/1.jpg',
    href: '/products?category=seasonal',
  },
];

export default function CategoryIcons() {
  return (
    <div className="flex justify-center gap-6 md:gap-8 flex-wrap">
      {CATS.map((cat, i) => (
        <Link
          key={cat.name}
          href={cat.href}
          className="flex flex-col items-center gap-3 animate-fade-up group"
          style={{ animationDelay: `${i * 0.08}s` }}
        >
          <div
            className="
              w-[70px] h-[70px]
              md:w-[80px] md:h-[80px]
              rounded-full
              bg-white
              border border-gray-200
              shadow-sm
              flex items-center justify-center
              transition-all duration-300
              group-hover:scale-110
              group-hover:shadow-lg
            "
          >
            <Image
              src={cat.image}
              alt={cat.name}
              width={64}
              height={64}
              className="object-contain"
            />
          </div>

          <span className="text-xs md:text-sm font-semibold text-gray-700">
            {cat.name}
          </span>
        </Link>
      ))}
    </div>
  );
}