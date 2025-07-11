import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: 'Invalid email' }, { status: 401 });

  const isMatch = await compare(password, user.password);
  if (!isMatch) return NextResponse.json({ error: 'Invalid password' }, { status: 401 });

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );

  return NextResponse.json({ token, user: { id: user._id, username: user.username } });
}
