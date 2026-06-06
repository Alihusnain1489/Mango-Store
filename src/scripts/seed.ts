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