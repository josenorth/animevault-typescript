import { motion } from 'framer-motion'
import { Anime } from '@/types/anime/Anime'

interface AnimeHeaderProps {
  anime: Anime
}

export function AnimeHeader({ anime }: AnimeHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative ${anime.bannerImage ? 'h-64 md:h-96' : 'pt-40'} overflow-hidden`}
    >
      {anime.bannerImage ? (
        <img
          src={anime.bannerImage}
          alt={anime.title_english}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-[#111827]"></div>
      )}
      <div
        className={`absolute inset-0 flex items-end ${
          anime.bannerImage ? 'bg-black bg-opacity-50' : ''
        }`}
      >
        <div className="container mx-auto px-28 py-8">
          <h1 className="text-4xl md:text-4xl font-bold text-white mb-2">
            {anime.title_english}
          </h1>
          <h2 className="!text-lg md:text-lg text-gray-300">
            {anime.title_romaji} / {anime.native}
          </h2>
        </div>
      </div>
    </motion.div>
  )
}
