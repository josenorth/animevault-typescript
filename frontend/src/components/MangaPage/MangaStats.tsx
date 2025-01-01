import { motion } from 'framer-motion'
import { Progress } from '@/components/ui/progress'
import { Manga } from '@/types/manga/Manga'

interface MangaStatsProps {
  manga: Manga
}

export function MangaStats({ manga }: MangaStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8"
    >
      <h3 className="text-xl font-semibold mb-4">Stats</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Score</p>
          <div className="flex items-center">
            <Progress value={manga.averageScore} className="w-full mr-2" />
            <span className="text-sm font-semibold">{manga.averageScore}%</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Chapters</p>
          <p className="text-lg font-semibold">{manga.chapters}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Volumes</p>
          <p className="text-lg font-semibold">{manga.volumes}</p>
        </div>
      </div>
    </motion.div>
  )
}

