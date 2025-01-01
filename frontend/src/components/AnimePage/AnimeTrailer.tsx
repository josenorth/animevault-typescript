'use client'

import { motion } from 'framer-motion'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Trailer } from '@/types/anime/Trailer'
import ReactPlayer from 'react-player/youtube'

interface AnimeTrailerProps {
  trailer?: Trailer; // Hacer que el trailer sea opcional
}

export function AnimeTrailer({ trailer }: AnimeTrailerProps) {
  if (!trailer) {
    return null; // No renderizar si no hay trailer
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-[#065F46] dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 mt-8"
    >
      <h3 className="text-xl font-semibold mb-4 text-[#84CC16]">Trailer</h3>
      <AspectRatio ratio={16 / 9}>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailer.trailer_id}`}
          width="100%"
          height="100%"
          controls
          className="w-full h-full rounded-md"
        />
      </AspectRatio>
    </motion.div>
  );
}