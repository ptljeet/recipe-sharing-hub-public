import { connectDB } from '@/lib/mongodb';
import Recipe from '@/models/Recipe';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const recipes = await Recipe.find().populate('author', 'username');
  return NextResponse.json(recipes);
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const recipe = await Recipe.create(data);
  return NextResponse.json(recipe, { status: 201 });
}
