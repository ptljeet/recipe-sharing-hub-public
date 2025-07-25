'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

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

const RecipeDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        const res = await fetch(`/api/recipes/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch');
        setRecipe(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error occurred');
        }
      }
    };

    fetchRecipe();
  }, [id]);

  const toggleFavorite = async () => {
    if (!user || !recipe) return;

    try {
      const res = await fetch(`/api/users/${user.userId}/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId: recipe._id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to favorite');

      setRecipe((prev) =>
        prev
          ? {
              ...prev,
              favorites: data.favorited
                ? [...prev.favorites, user.userId]
                : prev.favorites.filter((id) => id !== user.userId),
            }
          : prev
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!recipe) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow dark:bg-gray-800">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

      {recipe.image && (
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={600}
          height={400}
          className="rounded mb-4"
        />
      )}

      <p className="mb-4 text-gray-700 dark:text-gray-300">{recipe.description}</p>

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-sm text-gray-500">
          Category: {recipe.category || 'Uncategorized'}
        </span>

        <button
          onClick={toggleFavorite}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          {recipe.favorites.includes(user?.userId || '') ? 'Remove from Favorites' : 'Save to Favorites'}
        </button>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('Recipe link copied to clipboard!');
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Share Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;
