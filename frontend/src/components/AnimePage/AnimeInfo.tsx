'use client'

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Anime } from '@/types/anime/Anime';
import Image from 'next/image';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface AnimeInfoProps {
  anime?: Anime; // Puede ser undefined mientras los datos están cargando
  isLoading: boolean; // Indica si los datos están cargando
}

export function AnimeInfo({ anime, isLoading }: AnimeInfoProps) {
  if (isLoading) {
    return (
      <SkeletonTheme baseColor="#1F2937" highlightColor="#374151">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#065F46] rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start">
            {/* Skeleton de la imagen */}
            <Skeleton
              style={{
                width: '192px', // Ancho en píxeles
                height: '288px', // Altura en píxeles
                borderRadius: '8px', // Redondeo de bordes
              }}
              className="mb-4 md:mb-0 md:mr-6"
            />
            <div className="flex-grow">
              {/* Skeleton del texto */}
              <Skeleton width="70%" height={28} className="mb-2" />
              <Skeleton width="50%" height={20} className="mb-4" />
              <div className="flex flex-wrap gap-2 mb-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    width={80}
                    height={24}
                    className="rounded-md"
                  />
                ))}
              </div>
              <Skeleton width="80%" height={20} className="mb-2" />
              <Skeleton width="60%" height={20} className="mb-2" />
              <Skeleton width="50%" height={20} />
            </div>
          </div>
        </motion.div>
      </SkeletonTheme>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-[#065F46] rounded-lg shadow-md p-6 mb-8"
    >
      <div className="flex flex-col md:flex-row items-start">
        {/* Imagen real */}
        <Image
          src={anime?.coverImage || '/anime-cover-placeholder.jpg'}
          alt={anime?.title_english || 'Anime Cover'}
          width={192}
          height={288}
          className="w-full md:w-48 h-72 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
        />
        <div className="flex-grow">
          {/* Títulos reales cuando los datos están disponibles */}
          <h3 className="text-2xl text-[#84CC16] font-semibold mb-2">
            {anime?.title_english}
          </h3>
          <p className="text-gray-200 dark:text-gray-300 mb-4">
            {anime?.format} • {anime?.episode_count} episodes •{' '}
            {anime?.episode_duration} min
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{anime?.status}</Badge>
            <Badge variant="secondary">
              {anime?.season} {anime?.seasonYear}
            </Badge>
            <Badge variant="secondary">{anime?.source}</Badge>
          </div>
          <p className="text-gray-200 dark:text-gray-200 mb-2">
            <span className="font-semibold text-[#84CC16]">Aired:</span>{' '}
            {anime?.start_date} to {anime?.end_date}
          </p>
          <p className="text-gray-200 dark:text-gray-200 mb-2">
            <span className="font-semibold text-[#84CC16]">Score:</span>{' '}
            {anime?.average_score}%
          </p>
          <p className="text-gray-200 dark:text-gray-200">
            <span className="font-semibold text-[#84CC16]">
              Popularity:
            </span>{' '}
            {anime?.popularity.toLocaleString()} members
          </p>
        </div>
      </div>
    </motion.div>
  );
}
