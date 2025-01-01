import { motion } from 'framer-motion'

interface MangaDescriptionProps {
  description: string
}

export function MangaDescription({ description }: MangaDescriptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
    >
      <h3 className="text-xl font-semibold mb-4">Synopsis</h3>
      <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{description}</p>
    </motion.div>
  )
}

