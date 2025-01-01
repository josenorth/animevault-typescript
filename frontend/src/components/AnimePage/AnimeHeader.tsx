'use client'

import { motion } from 'framer-motion';
import { Anime } from '@/types/anime/Anime';
import Image from 'next/image';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface AnimeHeaderProps {
  anime?: Anime; // Puede ser undefined mientras se cargan los datos
  isLoading: boolean; // Indica si los datos están cargando
}

export function AnimeHeader({ anime, isLoading }: AnimeHeaderProps) {
  if (isLoading) {
    return (
      <div className="group relative block overflow-hidden rounded-lg transition-all hover:scale-105">
        <div className="aspect-[3/4]">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="relative bottom-0 left-0 right-0 p-0 pt-2">
          <Skeleton width={100} />
        </div>
      </div>
    );
  }

  return (
    <SkeletonTheme baseColor="#1F2937" highlightColor="#374151">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative ${anime?.bannerImage ? 'h-64 md:h-96' : 'pt-40'} overflow-hidden`}
      >
        {anime?.bannerImage ? (
          <Image
            src={anime.bannerImage}
            alt={anime.title_english || 'Anime Banner'}
            fill
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#111827]"></div>
        )}
        <div
          className={`absolute inset-0 flex items-end ${anime?.bannerImage ? 'bg-black bg-opacity-50' : ''}`}
        >
          <div className="container mx-auto px-28 py-8">
            <h1 className="text-4xl md:text-4xl font-bold text-white mb-2">
              {anime?.title_english || 'Untitled'}
            </h1>
            <h2 className="!text-lg md:text-lg text-gray-300">
              {anime?.title_romaji} / {anime?.native}
            </h2>
          </div>
        </div>
      </motion.div>
    </SkeletonTheme>
  );
}
