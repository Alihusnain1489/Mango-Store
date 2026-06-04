import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters.' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if email already exists
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return NextResponse.json(
        { message: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    // Create user
    await User.create({
      name:         name.trim(),
      email:        email.toLowerCase().trim(),
      phone:        phone?.trim() || '',
      passwordHash: await bcrypt.hash(password, 12),
      role:         'customer',
      addresses:    [],
    });

    return NextResponse.json(
      { message: 'Account created successfully.' },
      { status: 201 }
    );
  } catch (err) {
    console.error('Register error:', err);
    return NextResponse.json(
      { message: 'Server error. Please try again.' },
      { status: 500 }
    );
  }
}