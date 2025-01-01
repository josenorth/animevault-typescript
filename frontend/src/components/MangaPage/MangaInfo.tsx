import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Manga } from '@/types/manga/Manga'
import Image from 'next/image'

interface MangaInfoProps {
  manga: Manga
}

export function MangaInfo({ manga }: MangaInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8"
    >
      <div className="flex flex-col md:flex-row items-start">
        <Image
          src={manga.coverImage || '/placeholder.svg?height=288&width=192'}
          alt={manga.title_english || 'Manga Cover'}
          width={192}
          height={288}
          className="w-full md:w-48 h-72 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
        />
        <div className="flex-grow">
          <h3 className="text-2xl font-semibold mb-2">{manga.title_english}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {manga.format} • {manga.chapters} chapters • {manga.volumes} volumes
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{manga.status}</Badge>
            <Badge variant="secondary">{manga.countryOfOrigin}</Badge>
            <Badge variant="secondary">{manga.source}</Badge>
          </div>
          <p className="text-gray-700 dark:text-gray-200 mb-2">
            <span className="font-semibold">Start Date:</span> {new Date(manga.startDate * 1000).toLocaleDateString()}
          </p>
          <p className="text-gray-700 dark:text-gray-200 mb-2">
            <span className="font-semibold">End Date:</span> {new Date(manga.endDate * 1000).toLocaleDateString()}
          </p>
          <p className="text-gray-700 dark:text-gray-200 mb-2">
            <span className="font-semibold">Score:</span> {manga.averageScore}%
          </p>
        </div>
      </div>
    </motion.div>
  )
}

