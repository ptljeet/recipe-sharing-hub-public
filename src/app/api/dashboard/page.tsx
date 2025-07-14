'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  email?: string;
}

export default function DashboardPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded = jwt.decode(token) as TokenPayload;
      setUserId(decoded?.userId || null);
    } catch (err) {
      console.error('Invalid token', err);
      Cookies.remove('token');
      router.push('/login');
    }
  }, [router]);

  if (!userId) return <p className="p-6 text-gray-600">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">Welcome to your Dashboard 🎉</h1>
      <p className="text-gray-700">
        Your User ID: <span className="font-mono text-blue-700">{userId}</span>
      </p>
    </div>
  );
}
