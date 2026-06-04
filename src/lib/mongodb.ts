import mongoose from 'mongoose';

declare global {
  var mongoose: { conn: typeof import('mongoose') | null; promise: Promise<typeof import('mongoose')> | null };
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // fail fast instead of 49s
      socketTimeoutMS: 10000,
    }).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB connection failed:', e); // ← check terminal
    throw e;
  }

  return cached.conn;
}