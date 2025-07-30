// src/app/article/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/articles/${id}`);
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.error('Erreur de chargement de l\'article', error);
      }
    };
    if (id) fetchArticle();
  }, [id]);

  if (!article) return <div className="text-center py-20 text-gray-500">Chargement...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-800 dark:text-white">
      <Link href="/articles" className="text-sm text-blue-500 hover:underline flex items-center mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Retour aux articles
      </Link>

      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        {new Date(article.published_at).toLocaleString()} • {article.category}
      </p>
      <p className="text-base leading-7 whitespace-pre-line">
        {article.content || article.summary}
      </p>

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-8 text-blue-600 dark:text-yellow-400 hover:underline"
      >
        Lire l'article original ↗
      </a>
    </div>
  );
}
