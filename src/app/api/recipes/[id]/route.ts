import { NextRequest, NextResponse } from 'next/server';
import Recipe from '@/models/Recipe';
import { connectDB } from '@/lib/mongodb';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectDB();
    const recipe = await Recipe.findById(context.params.id);

    if (!recipe) {
      return new NextResponse(JSON.stringify({ error: 'Recipe not found' }), { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
