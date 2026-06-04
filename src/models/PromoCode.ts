import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPromoDocument extends Document {
  code: string;
  discountPercent: number;
  expiresAt: Date;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}

const PromoSchema = new Schema<IPromoDocument>(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    discountPercent: { type: Number, required: true, min: 1, max: 100 },
    expiresAt: { type: Date, required: true },
    usageLimit: { type: Number, default: 100 },
    usedCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const PromoCode: Model<IPromoDocument> =
  mongoose.models.PromoCode || mongoose.model<IPromoDocument>('PromoCode', PromoSchema);

export default PromoCode;