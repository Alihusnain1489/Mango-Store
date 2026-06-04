import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const { status, note } = await req.json();
    const order = await Order.findById(id);
    if (!order) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    order.status = status;
    order.timeline.push({ status, timestamp: new Date(), note: note || '' });
    await order.save();
    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}