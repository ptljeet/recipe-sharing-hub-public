import { connectDB } from '@/lib/mongodb';
import Recipe from '@/models/Recipe';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectDB();
  const auth = req.headers.get('authorization');
  const token = auth?.split(' ')[1];

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const { title, description, image, category, tags } = await req.json();

    const recipe = await Recipe.create({
      title,
      description,
      image,
      category,
      tags,
      createdBy: decoded.userId,
    });

    return NextResponse.json(recipe, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token or error creating recipe' }, { status: 401 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    return NextResponse.json({ recipes }); 
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
