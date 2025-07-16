import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectDB();
  const { username, email, password } = await req.json();

  const exists = await User.findOne({ email });
  if (exists) return NextResponse.json({ error: 'Email already registered' }, { status: 409 });

  const hashedPassword = await hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });

  return NextResponse.json({ id: user._id, username: user.username }, { status: 201 });
}
