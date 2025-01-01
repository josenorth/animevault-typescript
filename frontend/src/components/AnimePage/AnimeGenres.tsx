import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Genre } from '@/types/shared/Genre'

interface AnimeGenresProps {
  genres: Genre[]
}

export function AnimeGenres({ genres }: AnimeGenresProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className=" dark:bg-gray-800 rounded-lg shadow-md p-6"
    >
      <h3 className="text-xl font-semibold mb-4 text-[#84CC16]">Genres</h3>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <Badge key={genre.id} variant="outline" className='bg-[#065F46] text-white border-none'>
            {genre.name}
          </Badge>
        ))}
      </div>
    </motion.div>
  )
}

