import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Studio } from '@/types/anime/Studio'
import { staggerChildren, slideUp } from '../utils/animations'

export function Studios({ studios }: { studios: Studio[] }) {
  return (
    <motion.div
      className="flex flex-wrap gap-2"
      variants={staggerChildren}
      initial="hidden"
      animate="visible"
    >
      {studios.map((studio) => (
        <motion.div key={studio.id} variants={slideUp}>
          <Badge variant={studio.isMain ? "default" : "outline"}>{studio.name}</Badge>
        </motion.div>
      ))}
    </motion.div>
  )
}

