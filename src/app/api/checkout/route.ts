import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { connectDB } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { amount, orderId } = await req.json();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'aed',
      metadata: { orderId },
    });
    return NextResponse.json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch { return NextResponse.json({ success: false, error: 'Payment failed' }, { status: 500 }); }
}
