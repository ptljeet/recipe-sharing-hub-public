import { NextRequest, NextResponse } from 'next/server';
import Recipe from '@/models/Recipe';
import { connectDB } from '@/lib/mongodb';
import { Types } from 'mongoose';

export async function GET(_req: NextRequest, { params }: any) {
  await connectDB();

  const id = params.id;

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    return NextResponse.json(recipe, { status: 200 });
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
