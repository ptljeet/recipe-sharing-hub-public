import { NextRequest, NextResponse } from 'next/server';
import Recipe from '@/models/Recipe';
import { connectDB } from '@/lib/mongodb';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const recipe = await Recipe.findById(params.id);

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
