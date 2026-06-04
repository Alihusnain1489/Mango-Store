import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { generateOrderNumber, calculateDeliveryFee } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const subtotal = body.items.reduce((s: number, i: any) => s + i.subtotal, 0);
    const deliveryFee = calculateDeliveryFee(subtotal);
    const order = await Order.create({
      ...body,
      orderNumber: generateOrderNumber(),
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee - (body.discount || 0),
      timeline: [{ status: 'placed', timestamp: new Date(), note: 'Order received' }],
    });
    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch { return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 }); }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const orders = await Order.find(userId ? { userId } : {}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, orders });
  } catch { return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 }); }
}
