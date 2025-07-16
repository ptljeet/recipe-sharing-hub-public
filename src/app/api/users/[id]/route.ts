import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Recipe from '@/models/Recipe';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const token = req.cookies.get('token')?.value;
    if (!token) return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const decoded: any = jwt.decode(token);
    const userId = decoded?.userId;
    if (!userId) return new NextResponse(JSON.stringify({ error: 'Invalid token' }), { status: 401 });

    const recipe = await Recipe.findById(params.id);
    if (!recipe) return new NextResponse(JSON.stringify({ error: 'Recipe not found' }), { status: 404 });

    const isFavorited = recipe.favorites.includes(userId);
    if (isFavorited) {
      recipe.favorites.pull(userId);
    } else {
      recipe.favorites.push(userId);
    }

    await recipe.save();

    return NextResponse.json({ favorited: !isFavorited });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
