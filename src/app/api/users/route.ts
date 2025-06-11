import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const user = await User.create(data);
  return NextResponse.json(user);
}

export async function GET() {
  await connectDB();
  const users = await User.find();
  return NextResponse.json(users);
}
