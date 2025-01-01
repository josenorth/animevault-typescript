import { motion } from 'framer-motion'
import { Manga } from '@/types/manga/Manga'

interface MangaHeaderProps {
  manga: Manga
}

export function MangaHeader({ manga }: MangaHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-64 md:h-96 overflow-hidden"
    >
      <img
        src={manga.bannerImage || '/placeholder.svg?height=384&width=1920'}
        alt={manga.title_english || 'Manga Banner'}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            {manga.title_english}
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-300">
            {manga.title_romaji} / {manga.title_native}
          </h2>
        </div>
      </div>
    </motion.div>
  )
}

