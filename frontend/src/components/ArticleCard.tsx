// src/components/ArticleCard.tsx
'use client';

import Link from 'next/link';
import { Heart, Share2 } from 'lucide-react';

type Props = {
  article: {
    id: number;
    title: string;
    summary: string;
    category: string;
    url: string;
    published_at: string;
  };
};

export default function ArticleCard({ article }: Props) {
  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-blue-700 dark:text-yellow-300 mb-2">
        {article.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3">{article.summary}</p>
      <p className="text-xs text-gray-400 mb-2">{new Date(article.published_at).toLocaleDateString()}</p>
      <div className="flex justify-between items-center">
        <Link
          href={`/article/${article.id}`}
          className="text-blue-500 text-sm hover:underline"
        >
          Lire l’article →
        </Link>
        <div className="flex gap-3">
          <button title="Favori">
            <Heart className="w-4 h-4 text-gray-500 dark:text-white" />
          </button>
          <a href={article.url} target="_blank" title="Partager">
            <Share2 className="w-4 h-4 text-gray-500 dark:text-white" />
          </a>
        </div>
      </div>
    </div>
  );
}
