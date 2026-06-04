import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();
    const today = new Date(); today.setHours(0,0,0,0);
    const [todayOrders, totalOrders, pendingOrders, totalCustomers, revenueData] = await Promise.all([
      Order.countDocuments({ createdAt: { $gte: today } }),
      Order.countDocuments(),
      Order.countDocuments({ status: { $in: ['placed','confirmed','packed'] } }),
      User.countDocuments({ role: 'customer' }),
      Order.aggregate([{ $match: { paymentStatus: 'paid' } }, { $group: { _id: null, total: { $sum: '$total' } } }]),
    ]);
    return NextResponse.json({ success: true, stats: { todayOrders, totalOrders, pendingOrders, totalCustomers, revenue: revenueData[0]?.total || 0 } });
  } catch { return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 }); }
}
