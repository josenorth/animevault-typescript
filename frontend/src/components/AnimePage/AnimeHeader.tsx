import { motion } from 'framer-motion'
import { Anime } from '@/types/anime/Anime'
import Image from 'next/image'

interface AnimeHeaderProps {
  anime: Anime
}

export function AnimeHeader({ anime }: AnimeHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-64 md:h-96 overflow-hidden"
    >
      <Image
        src={anime.bannerImage || '/anime-banner-placeholder.png'}
        alt={anime.title_english || 'Anime Banner'}
        fill
        className="w-full h-full object-cover"
        placeholder="blur"
        blurDataURL="/anime-banner-placeholder.png" // Placeholder mientras se carga la imagen
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
        <div className="container mx-auto px-28 py-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            {anime.title_english}
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-300">
            {anime.title_romaji} / {anime.native}
          </h2>
        </div>
      </div>
    </motion.div>
  )
}