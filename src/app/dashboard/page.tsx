'use client';

import { useEffect, useState } from 'react';
import RecipeCard from '@/components/RecipeCard';

export default function DashboardPage() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('/api/recipes');
        const data = await res.json();

        if (Array.isArray(data.recipes)) {
          setRecipes(data.recipes);
          setFilteredRecipes(data.recipes);
        } else {
          console.error('Unexpected response from /api/recipes:', data);
          setRecipes([]);
          setFilteredRecipes([]);
        }
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
        setRecipes([]);
        setFilteredRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = recipes.filter((recipe: any) =>
      recipe.title.toLowerCase().includes(query)
    );
    setFilteredRecipes(filtered);
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-lg font-semibold">
        Loading recipes...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Recipes</h1>

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search recipes..."
        className="w-full max-w-md p-2 mb-6 border border-gray-300 rounded"
      />

      {filteredRecipes.length === 0 ? (
        <p className="text-gray-500">No recipes found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe: any) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
