'use client'

import { motion } from 'framer-motion'
import { Studio } from '@/types/anime/Studio'

interface AnimeStudiosProps {
  studios: Studio[]
}

export function AnimeStudios({ studios }: AnimeStudiosProps) {
  // Ordenar los estudios: primero los que tienen isMain: true
  const sortedStudios = [...studios].sort((a, b) => (b.isMain ? 1 : 0) - (a.isMain ? 1 : 0))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8"
    >
      <h3 className="text-xl font-semibold mb-4 text-[#84CC16]">Studios</h3>
      <ul className="space-y-2">
        {sortedStudios.map((studio) => (
          <li key={studio.id} className="flex items-center">
            <span className="text-white dark:text-gray-200">{studio.name}</span>
            {studio.isMain && (
              <span className="ml-2 px-2 py-1 text-xs font-medium bg-[#065F46] text-[#84CC16] rounded-full">
                Main
              </span>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
