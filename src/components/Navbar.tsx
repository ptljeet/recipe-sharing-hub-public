'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-green-400">🥣 Recipe Hub</Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link href="/dashboard" className='text-gray-300 hover:text-white'>Dashboard</Link>
            <Link href="/recipes/new" className="text-gray-300 hover:text-white">New Recipe</Link>
            <Link href="/recipes" className="text-gray-300 hover:text-white">Explore</Link>
            <Link href="/saved" className="text-gray-300 hover:text-white">My Favourites</Link>
            <button onClick={logout} className="text-red-400 hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
