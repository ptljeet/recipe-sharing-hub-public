import { connectDB } from '@/lib/mongodb';
import Recipe from '@/models/Recipe';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const recipe = await Recipe.findById(params.id).populate('author', 'username');
  return NextResponse.json(recipe);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();
  const updated = await Recipe.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Recipe.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Recipe deleted' });
}
