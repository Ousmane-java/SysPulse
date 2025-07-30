'use client';

import { useEffect, useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

type Article = {
  id: number;
  title: string;
  url: string;
  summary: string;
  category: string;
  published_at: string;
  image?: string;
};

export default function Home() {
  const [featured, setFeatured] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/articles`);
        const data: Article[] = await res.json();
        const sorted = data.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
        setFeatured(sorted[0]);
        setArticles(sorted.slice(1, 16)); // 15 articles
      } catch (err) {
        console.error('Erreur chargement articles:', err);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-50">
      {/* À la Une */}
      {featured && (
        <section className="relative w-full h-[500px] sm:h-[600px] overflow-hidden">
          {featured.image && (
            <img
              src={featured.image}
              alt="Article à la une"
              className="absolute inset-0 w-full h-full object-cover brightness-[.4]"
            />
          )}
          <div className="relative z-10 h-full flex flex-col justify-center items-start px-6 sm:px-20 text-white max-w-4xl">
            <span className="text-sm bg-blue-600 px-3 py-1 rounded-full mb-3">{featured.category}</span>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 drop-shadow-md">{featured.title}</h1>
            <p className="mb-6 text-md sm:text-lg text-white/90">{featured.summary}</p>
            <a
              href={featured.url}
              target="_blank"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded hover:bg-gray-100 transition"
            >
              Lire l’article
            </a>
          </div>
        </section>
      )}

      {/* Articles récents */}
      <section className="px-6 sm:px-12 py-16 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center">📚 Articles récents</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div key={article.id} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between">
              {article.image && (
                <img
                  src={article.image}
                  alt="image"
                  className="w-full h-44 object-cover rounded mb-3"
                />
              )}
              <div className="mb-3 text-sm text-gray-500">
                {new Date(article.published_at).toLocaleDateString('fr-FR')} · {article.category}
              </div>
              <h3 className="text-lg font-bold mb-2">{article.title}</h3>
              <p className="text-gray-700 text-sm line-clamp-3 mb-4">{article.summary}</p>
              <div className="mt-auto">
                <a
                  href={article.url}
                  target="_blank"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Lire l’article →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

     
    </div>
  );
}
