// src/app/api/users/[id]/favorites/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Recipe from '@/models/Recipe';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const userId = params.id;

  try {
    const { recipeId } = await req.json();
    if (!recipeId) {
      return NextResponse.json({ error: 'Recipe ID is required' }, { status: 400 });
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    const alreadyFavorited = recipe.favorites.includes(userId);
    if (alreadyFavorited) {
      recipe.favorites.pull(userId);
    } else {
      recipe.favorites.push(userId);
    }

    await recipe.save();

    return NextResponse.json({
      success: true,
      favorited: !alreadyFavorited,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const recipes = await Recipe.find({ favorites: params.id });
    return NextResponse.json(recipes);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
  }
}
