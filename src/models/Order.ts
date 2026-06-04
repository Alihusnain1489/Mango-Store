import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderDocument extends Document {
  orderNumber: string;
  userId?: mongoose.Types.ObjectId;
  guestEmail?: string;
  items: {
    productId: mongoose.Types.ObjectId;
    name: string;
    pricePerKg: number;
    weight: string;
    quantity: number;
    subtotal: number;
  }[];
  deliveryAddress: {
    fullName: string;
    phone: string;
    addressLine1: string;
    city: string;
    emirate: string;
    notes?: string;
  };
  paymentMethod: 'stripe' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'failed';
  stripePaymentIntentId?: string;
  status: 'placed' | 'confirmed' | 'packed' | 'out_for_delivery' | 'delivered' | 'cancelled';
  timeline: { status: string; timestamp: Date; note?: string }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  promoCode?: string;
  discount?: number;
  createdAt: Date;
}

const OrderSchema = new Schema<IOrderDocument>(
  {
    orderNumber: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    guestEmail: { type: String },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        pricePerKg: { type: Number, required: true },
        weight: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        subtotal: { type: Number, required: true },
      },
    ],
    deliveryAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      addressLine1: { type: String, required: true },
      city: { type: String, required: true },
      emirate: { type: String, required: true },
      notes: { type: String },
    },
    paymentMethod: { type: String, enum: ['stripe', 'cod'], required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    stripePaymentIntentId: { type: String },
    status: {
      type: String,
      enum: ['placed', 'confirmed', 'packed', 'out_for_delivery', 'delivered', 'cancelled'],
      default: 'placed',
    },
    timeline: [
      {
        status: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        note: { type: String },
      },
    ],
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true },
    promoCode: { type: String },
    discount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Order: Model<IOrderDocument> =
  mongoose.models.Order || mongoose.model<IOrderDocument>('Order', OrderSchema);

export default Order;