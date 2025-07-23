'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import RecipeCard from '@/components/RecipeCard';

interface Recipe {
  _id: string;
  title: string;
  description: string;
  image?: string;
  category?: string;
  tags?: string[];
  createdAt?: string;
  likes?: string[];
  favorites: string[];
}

export default function SavedRecipesPage() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.userId) return;

    const fetchFavorites = async () => {
      try {
        const res = await fetch(`/api/users/${user.userId}/favorites`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          console.error('Unexpected favorites response:', data);
          setRecipes([]);
        }
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  if (loading) {
    return (
      <div className="p-6 text-center text-lg font-semibold">
        Loading saved recipes...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Saved Recipes</h1>

      {recipes.length === 0 ? (
        <p className="text-gray-500">You have not saved any recipes yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
