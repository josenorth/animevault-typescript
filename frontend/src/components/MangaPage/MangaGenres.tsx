import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Genre } from '@/types/shared/Genre'

interface MangaGenresProps {
  genres: Genre[]
}

export function MangaGenres({ genres }: MangaGenresProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8"
    >
      <h3 className="text-xl font-semibold mb-4">Genres</h3>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <Badge key={genre.id} variant="outline">
            {genre.name}
          </Badge>
        ))}
      </div>
    </motion.div>
  )
}

