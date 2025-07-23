import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';

import Recipe from '@/models/Recipe';
import { Types } from 'mongoose';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  if (!Types.ObjectId.isValid(params.id)) {
    return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
  }

  try {
    const recipe = await Recipe.findById(params.id);
    if (!recipe) {
      return new Response(JSON.stringify({ error: 'Recipe not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(recipe), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
