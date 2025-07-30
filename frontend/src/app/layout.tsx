// src/app/layout.tsx
import './globals.css';
import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer' 


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Syspulse',
  description: 'Actualités résumées par IA',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors`}>
        <Navbar />
        <main className="px-4 max-w-6xl mx-auto pt-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
