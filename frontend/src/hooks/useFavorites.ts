// frontend/src/hooks/useFavorites.ts

import { useEffect, useState } from 'react';

export type Article = {
  id: number;
  title: string;
  url: string;
  summary: string;
  category: string;
  published_at: string;
  image?: string;
};

export function useFavorites() {
  const [favorites, setFavorites] = useState<Article[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const toggleFavorite = (article: Article) => {
    const isAlready = favorites.some((fav) => fav.id === article.id);
    const updated = isAlready
      ? favorites.filter((fav) => fav.id !== article.id)
      : [...favorites, article];

    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const isFavorite = (id: number) => {
    return favorites.some((a) => a.id === id);
  };

  return { favorites, toggleFavorite, isFavorite };
}
