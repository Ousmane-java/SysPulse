'use client';

import { useFavorites } from '@/hooks/useFavorites';

export default function FavorisPage() {
  const { favorites } = useFavorites();

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">⭐ Articles favoris</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">Aucun favori enregistré.</p>
      ) : (
        <div className="grid gap-6">
          {favorites.map((article) => (
            <div key={article.id} className="border rounded-lg p-6 shadow-sm bg-white">
              {article.image && (
                <img
                  src={article.image}
                  alt="image"
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">
                  {new Date(article.published_at).toLocaleDateString('fr-FR')}
                </span>
                <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
                  {article.category}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-700 mb-4">{article.summary}</p>
              <div className="flex gap-4">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Lire
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
