import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductDocument extends Document {
  name: string;
  slug: string;
  images: string[];
  origin: string;
  originFlag: string;
  pricePerKg: number;
  originalPrice?: number;
  discountPercent?: number;
  weightOptions: string[];
  description: string;
  inStock: boolean;
  category: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    images: [{ type: String }],
    origin: { type: String, required: true },
    originFlag: { type: String, required: true },
    pricePerKg: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number },
    discountPercent: { type: Number, min: 0, max: 100 },
    weightOptions: [{ type: String }],
    description: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    category: { type: String, required: true, default: 'mangoes' },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product: Model<IProductDocument> =
  mongoose.models.Product || mongoose.model<IProductDocument>('Product', ProductSchema);

export default Product;