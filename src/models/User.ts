import mongoose, { Schema, Document, Model } from 'mongoose';

const AddressSchema = new Schema({
  label: { type: String, default: 'Home' },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  addressLine1: { type: String, required: true },
  city: { type: String, required: true },
  emirate: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

export interface IUserDocument extends Document {
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
  role: 'customer' | 'admin';
  addresses: typeof AddressSchema[];
  createdAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    phone: { type: String },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    addresses: [AddressSchema],
  },
  { timestamps: true }
);

const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema);

export default User;