'use client';

import { useEffect, useState } from 'react';
import { useFavorites } from '@/hooks/useFavorites';

type Article = {
  id: number;
  title: string;
  url: string;
  summary: string;
  category: string;
  published_at: string;
  image?: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

const categories = [
  'Tous',
  'Linux',
  'Système',
  'Cloud',
  'Réseau',
  'Sécurité',
  'Développement',
  'Evènement SI',
  'Actualité Tech'
];

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filtered, setFiltered] = useState<Article[]>([]);
  const [selected, setSelected] = useState('Tous');

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/articles`);
        const data = await res.json();
        const sorted = data.reverse();
        setArticles(sorted);
        setFiltered(sorted);
      } catch (err) {
        console.error('Erreur lors du chargement des articles :', err);
      }
    };

    fetchArticles();
  }, []);

  const handleFilter = (cat: string) => {
    setSelected(cat);
    if (cat === 'Tous') {
      setFiltered(articles);
    } else {
      setFiltered(articles.filter((a) => a.category.toLowerCase() === cat.toLowerCase()));
    }
  };

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">📰 Articles techniques</h1>

      {/* Filtres */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              selected === cat
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-100 text-gray-700 hover:bg-blue-100 border-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Liste des articles */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">Aucun article trouvé.</p>
        ) : (
          filtered.map((article) => (
            <div
              key={article.id}
              className="border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white flex flex-col justify-between"
            >
              {article.image && (
                <img
                  src={article.image}
                  alt="image"
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
                <span>{new Date(article.published_at).toLocaleDateString('fr-FR')}</span>
                <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                  {article.category}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-700 mb-4 text-sm line-clamp-4">{article.summary}</p>
              <div className="mt-auto flex gap-3 flex-wrap">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Lire
                </a>
                <button
                  onClick={() => toggleFavorite(article)}
                  className={`text-sm px-4 py-2 rounded transition ${
                    isFavorite(article.id)
                      ? 'bg-yellow-400 text-white hover:bg-yellow-500'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isFavorite(article.id) ? 'Favori ✓' : 'Favori'}
                </button>
                <button
                  className="text-sm px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  onClick={() => navigator.clipboard.writeText(article.url)}
                >
                  Partager
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
