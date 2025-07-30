'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full px-6 py-8 bg-zinc-100 dark:bg-zinc-900 text-gray-800 dark:text-gray-100 border-t border-gray-300 dark:border-gray-700 relative mt-16"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-4">
        {/* Réseaux sociaux */}
        <div className="flex items-center gap-5">
          <a href="https://github.com/Ousmane-java" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/ousmane-drame-83858a334/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="mailto:contact@ousmanedrame.com" className="hover:text-blue-500 transition">
            <Mail className="w-6 h-6" />
          </a>
          <a href="https://x.com/Ousmane2028" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
            <Twitter className="w-6 h-6" />
          </a>
        </div>

        {/* Infos & crédits */}
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
          © {new Date().getFullYear()} <span className="text-black dark:text-white font-semibold">Syspulse</span> – Média Tech & Ingénierie · v1.0.0
        </div>
      </div>

      {/* Bouton scroll top */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-4 left-4 bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full shadow-md flex items-center justify-center font-bold text-lg transition-all"
        aria-label="Remonter"
      >
        S
      </button>
    </motion.footer>
  )
}
