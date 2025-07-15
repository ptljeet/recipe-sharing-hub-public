export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Recipe Sharing Hub 🍳</h1>
      <p className="text-lg max-w-xl">
        A social platform for food lovers to share, discover, and save delicious recipes from around the world.
      </p>
      <div className="mt-8 flex gap-4">
        <a href="/register" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Get Started</a>
        <a href="/login" className="border border-gray-400 px-6 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">Login</a>
      </div>
    </main>
  );
}
