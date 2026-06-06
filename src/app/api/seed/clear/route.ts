import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

const ProductSchema = new mongoose.Schema({ name: String }, { strict: false });
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export async function GET() {
  try {
    await connectDB();
    const result = await Product.deleteMany({});
    return NextResponse.json({
      success: true,
      message: `✅ Deleted ${result.deletedCount} products from database`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}