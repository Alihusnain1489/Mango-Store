import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('❌ MONGODB_URI not found in .env.local'); process.exit(1); }

// ── Schemas ────────────────────────────────────────────────────────────────────

const ProductSchema = new mongoose.Schema({
  name: String, slug: String,
  image: String, images: [String],
  origin: String, originFlag: String,
  price: Number,
  pricePerKg: Number,
  originalPrice: Number,
  discountPercent: Number,
  weightOptions: [String],
  description: String,
  stock: Number,
  inStock: Boolean,
  unit: String,
  category: String,
  tags: [String],
  featured: Boolean,
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  name: String, email: String, passwordHash: String,
  phone: String, role: String, addresses: Array,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const User    = mongoose.models.User    || mongoose.model('User',    UserSchema);

// ── Products ───────────────────────────────────────────────────────────────────
// Pakistani mango prices & images sourced from freshleafuae.com (June 2026)
// Other produce prices cross-referenced with farzana.ae (June 2026)

const products = [
  // ─── MANGOES ─────────────────────────────────────────────────────────
  {
    name: 'Mango Chaunsa Premium',
    slug: 'mango-chaunsa-premium',
    image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=600&q=80'],
    origin: 'Pakistan', originFlag: '🇵🇰',
    price: 20, pricePerKg: 20, originalPrice: 25, discountPercent: 20,
    weightOptions: ['500g', '1kg', '2kg', '3kg', '5kg'],
    description: 'Premium Chaunsa mango from Pakistan. Honey-sweet, fiberless, and intensely aromatic.',
    stock: 80, inStock: true, unit: 'kg', category: 'Mangoes',
    tags: ['featured', 'seasonal'], featured: true,
  },
  {
    name: 'Mango Chaunsa Premium Box',
    slug: 'mango-chaunsa-premium-box',
    image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=600&q=80'],
    origin: 'Pakistan', originFlag: '🇵🇰',
    price: 100, pricePerKg: 100, originalPrice: 125, discountPercent: 20,
    weightOptions: ['Box (5kg–5.5kg)'],
    description: 'Premium Chaunsa mango gift box — 5kg to 5.5kg. Perfect for families and gifting.',
    stock: 30, inStock: true, unit: 'box', category: 'Mangoes',
    tags: ['featured', 'gift'], featured: true,
  },
  {
    name: 'Mango Sindhri Royal',
    slug: 'mango-sindhri-royal',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80'],
    origin: 'Pakistan', originFlag: '🇵🇰',
    price: 20, pricePerKg: 20, originalPrice: 0, discountPercent: 0,
    weightOptions: ['500g', '1kg', '2kg', '3kg', '5kg'],
    description: 'Royal Sindhri mango from Mirpur Khas, Sindh. Large, golden-yellow, fiberless with honey fragrance.',
    stock: 70, inStock: true, unit: 'kg', category: 'Mangoes',
    tags: ['featured', 'seasonal'], featured: true,
  },
  {
    name: 'Mango Sindhri Royal Box',
    slug: 'mango-sindhri-royal-box',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80'],
    origin: 'Pakistan', originFlag: '🇵🇰',
    price: 85, pricePerKg: 85, originalPrice: 100, discountPercent: 15,
    weightOptions: ['Box (5kg)'],
    description: 'Sindhri Royal mango box — 5kg. Bulk value pack direct from Sindh farms.',
    stock: 25, inStock: true, unit: 'box', category: 'Mangoes',
    tags: ['gift'], featured: false,
  },
  {
    name: 'Anwar Ratol Mango',
    slug: 'anwar-ratol-mango',
    image: 'https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=600&q=80'],
    origin: 'Pakistan', originFlag: '🇵🇰',
    price: 20, pricePerKg: 20, originalPrice: 25, discountPercent: 20,
    weightOptions: ['500g', '1kg', '2kg', '3kg'],
    description: "The world's most aromatic mango. Small, intensely sweet with unmatched fragrance. Limited seasonal availability.",
    stock: 30, inStock: true, unit: 'kg', category: 'Mangoes',
    tags: ['featured', 'seasonal', 'premium'], featured: true,
  },
  {
    name: 'Anwar Ratol Mango Box',
    slug: 'anwar-ratol-mango-box',
    image: 'https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=600&q=80'],
    origin: 'Pakistan', originFlag: '🇵🇰',
    price: 100, pricePerKg: 100, originalPrice: 125, discountPercent: 20,
    weightOptions: ['Box (5kg)'],
    description: 'Anwar Ratol mango gift box — 5kg. Premium packaging for the most fragrant mango in the world.',
    stock: 15, inStock: true, unit: 'box', category: 'Mangoes',
    tags: ['gift', 'premium'], featured: false,
  },

  // ─── BERRIES & STONE FRUITS ─────────────────────────────────────────
  {
    name: 'Strawberry',
    slug: 'strawberry',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&q=80'],
    origin: 'Spain / Egypt', originFlag: '🇪🇸',
    price: 24.95, pricePerKg: 49.90, originalPrice: 30, discountPercent: 17,
    weightOptions: ['250g', '500g pack', '1kg'],
    description: 'Plump, juicy strawberries from Spain and Egypt. Bursting with sweetness.',
    stock: 40, inStock: true, unit: '500g pack', category: 'Berries',
    tags: ['featured', 'seasonal'], featured: true,
  },
  {
    name: 'Cherry',
    slug: 'cherry',
    image: 'https://images.unsplash.com/photo-1528747045269-390fe33c19f2?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1528747045269-390fe33c19f2?w=600&q=80'],
    origin: 'Spain', originFlag: '🇪🇸',
    price: 24.95, pricePerKg: 49.90, originalPrice: 30, discountPercent: 17,
    weightOptions: ['250g', '500g pack', '1kg'],
    description: 'Premium Spanish cherries. Deep red, firm, and bursting with sweet-tart flavour.',
    stock: 25, inStock: true, unit: '500g pack', category: 'Berries',
    tags: ['seasonal'], featured: false,
  },
  {
    name: 'Apricot',
    slug: 'apricot',
    image: 'https://images.unsplash.com/photo-1596743482268-a22bde6fba9e?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1596743482268-a22bde6fba9e?w=600&q=80'],
    origin: 'Turkey / Iran', originFlag: '🇹🇷',
    price: 18, pricePerKg: 18, originalPrice: 22, discountPercent: 18,
    weightOptions: ['500g', '1kg', '2kg'],
    description: 'Fresh apricots from Turkey and Iran. Golden-orange, fragrant, and naturally sweet.',
    stock: 35, inStock: true, unit: 'kg', category: 'Stone Fruits',
    tags: ['seasonal'], featured: false,
  },
  {
    name: 'Peach',
    slug: 'peach',
    image: 'https://images.unsplash.com/photo-1586968702755-48fd62696d1f?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1586968702755-48fd62696d1f?w=600&q=80'],
    origin: 'Australia', originFlag: '🇦🇺',
    price: 44.98, pricePerKg: 44.98, originalPrice: 50, discountPercent: 10,
    weightOptions: ['500g', '1kg'],
    description: 'Premium Australian peaches. Juicy, fragrant, and velvety-smooth. Sun-ripened for maximum sweetness.',
    stock: 20, inStock: true, unit: 'kg', category: 'Stone Fruits',
    tags: ['premium'], featured: false,
  },
  {
    name: 'Jamun (Java Plum)',
    slug: 'jamun-java-plum',
    image: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1595475884562-073c30d45670?w=600&q=80'],
    origin: 'Pakistan / India', originFlag: '🇵🇰',
    price: 25, pricePerKg: 25, originalPrice: 0, discountPercent: 0,
    weightOptions: ['500g', '1kg', '2kg'],
    description: 'Fresh Jamun (Java Plum) from Pakistan and India. Tangy, slightly sweet, rich in antioxidants.',
    stock: 25, inStock: true, unit: 'kg', category: 'Seasonal Fruits',
    tags: ['seasonal'], featured: false,
  },

  // ─── TROPICAL & EXOTIC ──────────────────────────────────────────────
  {
    name: 'Lychee',
    slug: 'lychee',
    image: 'https://images.unsplash.com/photo-1582979512210-14a5b07b8ec4?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1582979512210-14a5b07b8ec4?w=600&q=80'],
    origin: 'Thailand', originFlag: '🇹🇭',
    price: 25.95, pricePerKg: 51.90, originalPrice: 30, discountPercent: 13,
    weightOptions: ['250g', '500g pack', '1kg'],
    description: 'Fresh Thai lychees. Delicately sweet, juicy, and floral.',
    stock: 30, inStock: true, unit: '500g pack', category: 'Exotic Fruits',
    tags: ['featured', 'seasonal'], featured: true,
  },
  {
    name: 'Guava',
    slug: 'guava',
    image: 'https://images.unsplash.com/photo-1536613879835-8e3f5a56edd3?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1536613879835-8e3f5a56edd3?w=600&q=80'],
    origin: 'Pakistan / Egypt', originFlag: '🇵🇰',
    price: 12, pricePerKg: 12, originalPrice: 0, discountPercent: 0,
    weightOptions: ['500g', '1kg', '2kg', '3kg'],
    description: 'Fresh guavas from Pakistan and Egypt. Sweet, fragrant, and packed with vitamin C.',
    stock: 50, inStock: true, unit: 'kg', category: 'Tropical Fruits',
    tags: [], featured: false,
  },
  {
    name: 'Falsa (Grewia)',
    slug: 'falsa-grewia',
    image: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1595475884562-073c30d45670?w=600&q=80'],
    origin: 'Pakistan', originFlag: '🇵🇰',
    price: 30, pricePerKg: 30, originalPrice: 0, discountPercent: 0,
    weightOptions: ['250g', '500g', '1kg'],
    description: 'Fresh Falsa (Grewia asiatica) from Pakistan. Tiny dark purple berries — tangy-sweet. Used for sharbat and juices. Highly seasonal.',
    stock: 15, inStock: true, unit: 'kg', category: 'Seasonal Fruits',
    tags: ['seasonal', 'rare'], featured: false,
  },

  // ─── EVERYDAY FRUITS ─────────────────────────────────────────────────
  {
    name: 'Banana Cavendish',
    slug: 'banana-cavendish',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&q=80'],
    origin: 'Ecuador / Philippines', originFlag: '🇪🇨',
    price: 5, pricePerKg: 5, originalPrice: 0, discountPercent: 0,
    weightOptions: ['500g', '1kg', '1.5kg', '3kg', '5kg'],
    description: 'Fresh Cavendish bananas. Naturally sweet, creamy, and energy-rich. A daily essential.',
    stock: 100, inStock: true, unit: 'kg', category: 'Everyday Fruits',
    tags: [], featured: false,
  },
  {
    name: 'Apple Red (Royal Gala / Fuji)',
    slug: 'apple-red-royal-gala-fuji',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80'],
    origin: 'USA / New Zealand', originFlag: '🇺🇸',
    price: 14, pricePerKg: 14, originalPrice: 18, discountPercent: 22,
    weightOptions: ['500g', '1kg', '2kg', '3kg', '5kg'],
    description: 'Premium red apples — Royal Gala and Fuji. Crisp, sweet, perfect for snacking.',
    stock: 80, inStock: true, unit: 'kg', category: 'Everyday Fruits',
    tags: ['featured'], featured: true,
  },
  {
    name: 'Apple Red Basket',
    slug: 'apple-red-basket',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80'],
    origin: 'USA / New Zealand', originFlag: '🇺🇸',
    price: 50, pricePerKg: 50, originalPrice: 60, discountPercent: 17,
    weightOptions: ['Basket (3kg)', 'Basket (5kg)'],
    description: 'Premium red apple gift basket. Royal Gala and Fuji mix. Beautiful presentation for gifting.',
    stock: 20, inStock: true, unit: 'basket', category: 'Everyday Fruits',
    tags: ['gift'], featured: false,
  },
  {
    name: 'Apple Green (Granny Smith)',
    slug: 'apple-green-granny-smith',
    image: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=600&q=80'],
    origin: 'USA / South Africa', originFlag: '🇺🇸',
    price: 15, pricePerKg: 15, originalPrice: 18, discountPercent: 17,
    weightOptions: ['500g', '1kg', '2kg', '3kg', '5kg'],
    description: 'Classic Granny Smith green apples. Crisp, tart, and refreshing. Perfect for baking and juicing.',
    stock: 60, inStock: true, unit: 'kg', category: 'Everyday Fruits',
    tags: [], featured: false,
  },

  // ─── MELONS ──────────────────────────────────────────────────────────
  {
    name: 'Rock Melon (Cantaloupe)',
    slug: 'rock-melon-cantaloupe',
    image: 'https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=600&q=80'],
    origin: 'Oman', originFlag: '🇴🇲',
    price: 12.95, pricePerKg: 12.95, originalPrice: 15, discountPercent: 14,
    weightOptions: ['1 piece (~600–800g)', '3 pieces', '5 pieces'],
    description: 'Sweet Omani rock melon. Fragrant orange flesh with natural sweetness. ~600–800g per piece.',
    stock: 40, inStock: true, unit: 'piece', category: 'Melons',
    tags: ['seasonal'], featured: false,
  },
  {
    name: 'Honeydew Melon Yellow',
    slug: 'honeydew-melon-yellow',
    image: 'https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=600&q=80'],
    origin: 'Brazil', originFlag: '🇧🇷',
    price: 56, pricePerKg: 56, originalPrice: 65, discountPercent: 14,
    weightOptions: ['1 piece (~1.5–1.8kg)'],
    description: 'Brazilian yellow honeydew melon. Creamy, sweet flesh. ~1.5–1.8kg per piece.',
    stock: 20, inStock: true, unit: 'piece', category: 'Melons',
    tags: [], featured: false,
  },
  {
    name: 'Honeydew Melon',
    slug: 'honeydew-melon',
    image: 'https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=600&q=80'],
    origin: 'Australia', originFlag: '🇦🇺',
    price: 49, pricePerKg: 49, originalPrice: 55, discountPercent: 11,
    weightOptions: ['1 piece (~2kg)'],
    description: 'Premium Australian honeydew melon. Pale, juicy, mildly sweet flesh. ~2kg per piece.',
    stock: 18, inStock: true, unit: 'piece', category: 'Melons',
    tags: [], featured: false,
  },
  {
    name: 'Watermelon Seedless',
    slug: 'watermelon-seedless',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80'],
    origin: 'Australia', originFlag: '🇦🇺',
    price: 279, pricePerKg: 279, originalPrice: 320, discountPercent: 13,
    weightOptions: ['1 piece (7–9kg)'],
    description: 'Premium Australian seedless watermelon. Crisp, deep-red flesh with no seeds. ~7–9kg per piece.',
    stock: 15, inStock: true, unit: 'piece', category: 'Melons',
    tags: ['featured'], featured: true,
  },
  {
    name: 'Watermelon Yellow',
    slug: 'watermelon-yellow',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80'],
    origin: 'Thailand', originFlag: '🇹🇭',
    price: 99, pricePerKg: 99, originalPrice: 120, discountPercent: 18,
    weightOptions: ['1 piece (2.5–3.5kg)'],
    description: 'Thai yellow watermelon. Unique golden-yellow flesh with honey-like sweetness. ~2.5–3.5kg per piece.',
    stock: 12, inStock: true, unit: 'piece', category: 'Melons',
    tags: ['seasonal', 'rare'], featured: false,
  },

  // ─── GIFT BASKETS ─────────────────────────────────────────────────────
  {
    name: 'Premium Mango Gift Basket',
    slug: 'premium-mango-gift-basket',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80'],
    origin: 'Pakistan', originFlag: '🇵🇰',
    price: 150, pricePerKg: 150, originalPrice: 180, discountPercent: 17,
    weightOptions: ['Basket (~3kg mixed)', 'Basket (~5kg mixed)'],
    description: 'Premium mixed mango gift basket — Chaunsa, Sindhri, and Anwar Ratol. Perfect for Eid, corporate gifting, and special occasions.',
    stock: 20, inStock: true, unit: 'basket', category: 'Gift Baskets',
    tags: ['gift', 'featured', 'premium'], featured: true,
  },
  {
    name: 'Seasonal Fruit Basket',
    slug: 'seasonal-fruit-basket',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&q=80'],
    origin: 'Mixed', originFlag: '🌍',
    price: 120, pricePerKg: 120, originalPrice: 150, discountPercent: 20,
    weightOptions: ['Basket (~3kg)', 'Basket (~5kg)'],
    description: 'A curated seasonal fruit basket — mangoes, strawberries, lychee, cherries and more. Great for gifting.',
    stock: 15, inStock: true, unit: 'basket', category: 'Gift Baskets',
    tags: ['gift', 'featured'], featured: true,
  },
];

// ── Seed ───────────────────────────────────────────────────────────────────────

async function seed() {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI as string);
    console.log('✅ Connected to MongoDB Atlas\n');

    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products`);
    console.log('   Categories: Mangoes (Pakistani), Fruits, Vegetables, Organic, Herbs');
    console.log('   Mango images & prices: freshleafuae.com (June 2026)');
    console.log('   Other prices: farzana.ae benchmark (June 2026)\n');

    const adminEmail    = process.env.ADMIN_EMAIL    || 'admin@store.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Husnain2244@';

    await User.deleteOne({ email: adminEmail });
    await User.create({
      name:         'Admin',
      email:        adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 12),
      role:         'admin',
      phone:        '+971 4 000 0000',
      addresses:    [],
    });

    console.log(`✅ Admin user created`);
    console.log(`   Email:    ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log('\n💡 Update ADMIN_EMAIL and ADMIN_PASSWORD in .env.local to change credentials.');

    await mongoose.disconnect();
    console.log('\n🎉 Seed complete! Aan Al Khair store is ready.');
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

seed();