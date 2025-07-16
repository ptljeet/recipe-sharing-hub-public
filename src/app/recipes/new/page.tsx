'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AddRecipePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get('token');

    const res = await fetch('/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        title,
        description,
        image,
        category,
        tags: tags.split(',').map((tag) => tag.trim()),
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Recipe added!');
      router.push('/dashboard');
    } else {
      alert(data.error || 'Something went wrong');
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">📝 Add New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input type="text" placeholder="Title" value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded text-gray-900" required />

        <textarea placeholder="Description" value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded text-gray-900" rows={4} required />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-gray-950 border border-gray-300 p-2 rounded mb-4"
          title="Upload recipe image"
          placeholder="Upload recipe image"
        />
        {image && <img src={image} alt="Preview" className="h-40 object-cover rounded" />}

        <input type="text" placeholder="Category" value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded text-gray-900" />

        <input type="text" placeholder="Tags (comma separated)" value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded text-gray-900" />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          ➕ Add Recipe
        </button>
      </form>
    </main>
  );
}
