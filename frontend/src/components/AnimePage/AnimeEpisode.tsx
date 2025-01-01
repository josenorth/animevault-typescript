'use client'

import { motion } from 'framer-motion';
import { Episode } from '@/types/anime/Episode';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface AnimeEpisodePreviewProps {
  episodes?: Episode[]; // Puede ser undefined
  isLoading: boolean;   // Indica si los datos están cargando
}

export function AnimeEpisodePreview({
  episodes,
  isLoading,
}: AnimeEpisodePreviewProps) {
  const previewEpisodes = episodes?.slice(0, 3) || []; // Mostrar solo los 3 primeros episodios

  return (
    <SkeletonTheme baseColor="#1F2937" highlightColor="#374151">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-lg shadow-md mb-8 mt-8"
      >
        <h3 className="text-xl font-semibold mb-6 text-[#84CC16]">
          Latest Episodes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="bg-[#1a2634] border-none">
                  <CardContent className="p-4">
                    {/* Skeleton para la miniatura */}
                    <Skeleton className="w-full h-36 md:h-40 rounded-md mb-2" />
                    {/* Skeleton para el título */}
                    <Skeleton width="80%" height={20} className="mb-2" />
                    {/* Skeleton para el subtítulo */}
                    <Skeleton width="50%" height={16} />
                  </CardContent>
                  <CardFooter className="flex justify-center">
        {/* Skeleton para el botón */}
        <Skeleton className="rounded-md" width={200} height={32} />
      </CardFooter>
                </Card>
              ))
            : previewEpisodes.map((episode) => (
                <Card key={episode.id} className="bg-[#1a2634] border-none">
                  <CardContent className="p-4">
                    <Image
                      src={episode.thumbnail}
                      alt={`Thumbnail for ${episode.title}`}
                      width={300}
                      height={200}
                      className="w-full h-36 md:h-40 object-cover rounded-md mb-2"
                    />
                    <h4
                      className="text-white font-semibold line-clamp-1"
                      title={episode.title}
                    >
                      {episode.title}
                    </h4>
                    <p className="text-gray-400 text-sm">{episode.site}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      className="w-full bg-[#065F46] text-[#84CC16] hover:bg-[#111827]"
                    >
                      <a
                        href={episode.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Watch ${episode.title} on ${episode.site}`}
                      >
                        Watch on {episode.site}
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
        </div>
      </motion.div>
    </SkeletonTheme>
  );
}
