'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const toggleDark = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const linkStyle = (path: string) =>
    `text-sm font-medium transition ${
      pathname === path
        ? 'text-blue-600 dark:text-yellow-400 underline underline-offset-4'
        : 'text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-300'
    }`;

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-blue-600 dark:text-yellow-300">
          Syspulse
        </Link>

        {/* Bouton mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Menu">
            {menuOpen ? (
              <X className="h-6 w-6 text-gray-800 dark:text-white" />
            ) : (
              <Menu className="h-6 w-6 text-gray-800 dark:text-white" />
            )}
          </button>
        </div>

        {/* Menu principal */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/" className={linkStyle('/')}>Accueil</Link>
          <Link href="/articles" className={linkStyle('/articles')}>Articles</Link>
          <Link href="/favoris" className={linkStyle('/favoris')}>Favoris</Link>
        </div>

        {/* Auth & darkmode */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm text-gray-700 dark:text-gray-200 hover:underline">Connexion</Link>
          <Link
            href="/register"
            className="px-3 py-1 rounded-full text-sm bg-blue-600 text-white hover:bg-blue-700 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-300"
          >
            Inscription
          </Link>
          <button onClick={toggleDark} aria-label="Changer le thème">
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-800 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-6 py-4 space-y-4">
          <Link href="/" className={linkStyle('/')} onClick={() => setMenuOpen(false)}>Accueil</Link>
          <Link href="/articles" className={linkStyle('/articles')} onClick={() => setMenuOpen(false)}>Articles</Link>
          <Link href="/favoris" className={linkStyle('/favoris')} onClick={() => setMenuOpen(false)}>Favoris</Link>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex flex-col gap-2">
            <Link href="/login" className="text-sm text-gray-700 dark:text-gray-200 hover:underline" onClick={() => setMenuOpen(false)}>Connexion</Link>
            <Link
              href="/register"
              className="px-3 py-1 rounded-full text-sm bg-blue-600 text-white hover:bg-blue-700 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-300"
              onClick={() => setMenuOpen(false)}
            >
              Inscription
            </Link>
            <button onClick={toggleDark} className="flex items-center gap-2 text-sm text-gray-800 dark:text-white mt-2">
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />} Mode {darkMode ? 'Clair' : 'Sombre'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
