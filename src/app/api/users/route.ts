import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectDB();
  const { username, email, password } = await req.json();

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
  }

  const hashedPassword = await hash(password, 10);
  const newUser = await User.create({ username, email, password: hashedPassword });

  return NextResponse.json({ id: newUser._id, username: newUser.username }, { status: 201 });
}
