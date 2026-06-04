import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const query: Record<string, unknown> = {};
    if (searchParams.get('featured') === 'true') query.featured = true;
    if (searchParams.get('category')) query.category = searchParams.get('category');
    const products = await Product.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, products });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const product = await Product.create(body);
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}
