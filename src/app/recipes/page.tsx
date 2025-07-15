'use client';

import React, { useEffect, useState } from 'react';
import RecipeCard from '@/components/RecipeCard';

interface Recipe {
  _id: string;
  title: string;
  description: string;
  image?: string;
  category?: string;
  tags?: string[];
  createdBy: string;
  likes: string[];
  favorites: string[];
  createdAt: string;
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await fetch('/api/recipes');
        const data = await res.json();

        // ✅ Ensure it's an array before setting
        if (Array.isArray(data.recipes)) {
          setRecipes(data.recipes);
        } else {
          console.error('Invalid data structure:', data);
          setRecipes([]);
        }
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6">
      <h1 className="text-3xl font-bold mb-4">All Recipes</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : recipes.length === 0 ? (
        <p className="text-center">No recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </main>
  );
}
