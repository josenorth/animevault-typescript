import { motion } from 'framer-motion';
import { Episode } from '@/types/anime/Episode';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface AnimeEpisodePreviewProps {
  episodes: Episode[];
}

export function AnimeEpisodePreview({ episodes }: AnimeEpisodePreviewProps) {
  if (!episodes || episodes.length === 0) {
    return <div>No episodes available</div>;
  }

  const previewEpisodes = episodes.slice(0, 3); // Mostrar solo los 3 primeros episodios

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg shadow-md mb-8 mt-8"
    >
      <h3 className="text-xl font-semibold mb-6 text-[#84CC16]">Latest Episodes</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {previewEpisodes.map((episode) => (
          <Card key={episode.id} className="bg-[#1a2634] border-none">
            <CardContent className="p-4">
              <img
                src={episode.thumbnail}
                alt={`Thumbnail for ${episode.title}`}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h4 className="text-white font-semibold line-clamp-1">{episode.title}</h4>
              <p className="text-gray-400 text-sm">{episode.site}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-[#065F46] text-[#84CC16] hover:bg-[#111827]">
                <a href={episode.url} target="_blank" rel="noopener noreferrer" className=''>
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