'use client';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

interface Recipe {
  _id: string;
  title: string;
  description: string;
  image?: string;
  category?: string;
  tags?: string[];
  createdAt?: string;
  likes?: string[];
  favorites?: string[];
}

interface Props {
  recipe: Recipe;
  onFavoriteToggle?: (id: string) => void;
  showActions?: boolean;
}

const RecipeCard: React.FC<Props> = ({ recipe, onFavoriteToggle, showActions = false }) => {
  return (
    <Link href={`/recipes/${recipe._id}`} className="no-underline">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-md overflow-hidden w-full max-w-md mx-auto mb-6">
        {recipe.image && (
          <div className="relative w-full h-48">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover rounded-t-md"
              priority
            />
          </div>
        )}

        <div className="p-4">
          <h2 className="text-xl font-semibold">{recipe.title}</h2>
          <p className="text-sm text-gray-500">{recipe.category}</p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{recipe.description}</p>

          {showActions && onFavoriteToggle && (
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault(); // Prevent link navigation
                onFavoriteToggle(recipe._id);
              }}
              className="mt-4 inline-block text-sm px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              {recipe.favorites?.length ? 'Remove from Favorites' : 'Save to Favorites'}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
