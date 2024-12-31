import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Anime } from '@/types/anime/Anime'

interface AnimeInfoProps {
  anime: Anime
}

export function AnimeInfo({ anime }: AnimeInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-[#065F46] rounded-lg shadow-md p-6 mb-8"
    >
      <div className="flex flex-col md:flex-row items-start">
        <img
          src={anime.coverImage}
          alt={anime.title_english}
          className="w-full md:w-48 h-72 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
        />
        <div className="flex-grow">
          <h3 className="text-2xl text-[#84CC16] font-semibold mb-2">{anime.title_english}</h3>
          <p className="text-gray-200 dark:text-gray-300 mb-4">{anime.format} • {anime.episode_count} episodes • {anime.episode_duration} min</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{anime.status}</Badge>
            <Badge variant="secondary">{anime.season} {anime.seasonYear}</Badge>
            <Badge variant="secondary">{anime.source}</Badge>
          </div>
          <p className="text-gray-200 dark:text-gray-200 mb-2">
            <span className="font-semibold text-[#84CC16]">Aired:</span> {anime.start_date} to {anime.end_date}
          </p>
          <p className="text-gray-200 dark:text-gray-200 mb-2">
            <span className="font-semibold text-[#84CC16]">Score:</span> {anime.average_score}%
          </p>
          <p className="text-gray-200 dark:text-gray-200">
            <span className="font-semibold text-[#84CC16]">Popularity:</span> {anime.popularity.toLocaleString()} members
          </p>
        </div>
      </div>
    </motion.div>
  )
}

