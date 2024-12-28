import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Genre } from '@/types/anime/Genre'
import { staggerChildren, slideUp } from '../utils/animations'

export function Genres({ genres }: { genres: Genre[] }) {
  return (
    <motion.div
      className="flex flex-wrap gap-2"
      variants={staggerChildren}
      initial="hidden"
      animate="visible"
    >
      {genres.map((genre) => (
        <motion.div key={genre.id} variants={slideUp}>
          <Badge variant="secondary">{genre.name}</Badge>
        </motion.div>
      ))}
    </motion.div>
  )
}

