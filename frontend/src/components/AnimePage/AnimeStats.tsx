import { motion } from 'framer-motion'
import { Progress } from '@/components/ui/progress'
import { Anime } from '@/types/anime/Anime'

interface AnimeStatsProps {
  anime: Anime
}

export function AnimeStats({ anime }: AnimeStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className=" dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8"
    >
      <h3 className="text-xl font-semibold mb-4 text-[#84CC16]">Stats</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-[#84CC16] dark:text-gray-400 mb-1">Score</p>
          <div className="flex items-center">
            <Progress value={anime.average_score} className="w-full mr-2 [&>*]:bg-[#84CC16]" />
            <span className="text-sm font-semibold text-[#84CC16]">{anime.average_score}%</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-[#84CC16] dark:text-gray-400 mb-1">Popularity</p>
          <p className="text-lg font-semibold text-[#84CC16]">{anime.popularity.toLocaleString()}</p>
        </div>
      </div>
    </motion.div>
  )
}

