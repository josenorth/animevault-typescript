'use client';

import { motion } from 'framer-motion';
import { Episode } from '@/types/anime/Episode';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface AnimeEpisodePreviewProps {
  episodes?: Episode[]; // Puede ser undefined
}

export function AnimeEpisodePreview({
  episodes,
}: AnimeEpisodePreviewProps) {
  // Función para extraer el número del título del episodio
  const extractEpisodeNumber = (title: string) => {
    const match = title.match(/Episode\s(\d+)/i); // Busca "Episode <número>"
    return match ? parseInt(match[1], 10) : 0; // Devuelve el número o 0 si no coincide
  };

  // Ordenar los episodios por número de episodio
  const sortedEpisodes = (episodes || [])
  .sort((a, b) => extractEpisodeNumber(b.title) - extractEpisodeNumber(a.title)) // Orden descendente
  .slice(0, 3); // Mostrar solo los 3 primeros episodios después de ordenar

  return (
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
        {sortedEpisodes.map((episode) => (
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
  );
}
