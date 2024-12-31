import { useRouter } from 'next/router'
import { useAnimeById } from '@/services/anime/useAnimeById'
import { useEpisodeById } from '@/services/anime/useAnimeEpisodeById'
import { useTrailerById } from '@/services/anime/useAnimeTrailerById'
import { AnimeTrailer } from '@/components/AnimePage/AnimeTrailer'
import { motion } from 'framer-motion'
import { AnimeHeader } from '@/components/AnimePage/AnimeHeader'
import { AnimeInfo } from '@/components/AnimePage/AnimeInfo'
import { AnimeDescription } from '@/components/AnimePage/AnimeDescription'
import { AnimeStats } from '@/components/AnimePage/AnimeStats'
import { AnimeStudios } from '@/components/AnimePage/AnimeStudios'
import { AnimeGenres } from '@/components/AnimePage/AnimeGenres'
import { AnimeEpisodePreview } from '@/components/AnimePage/AnimeEpisode'

export default function AnimePage() {
  const router = useRouter();
  const { anime_id } = router.query;

  if (!anime_id) {
    return <div>Loading...</div>;
  }

  const { data: anime, isLoading: isLoadingAnime, isError: isErrorAnime } = useAnimeById(Number(anime_id));
  const { data: episodesData, isLoading: isLoadingEpisodes, isError: isErrorEpisodes } = useEpisodeById(Number(anime_id));
  const { data: trailer, isLoading: isLoadingTrailer, isError: isErrorTrailer } = useTrailerById(Number(anime_id));

  // Garantiza que episodesData sea un arreglo, incluso si es undefined o no tiene formato.
  const episodes = episodesData && Array.isArray(episodesData) ? episodesData : [];

  if (isLoadingAnime || isLoadingEpisodes || isLoadingTrailer) {
    return <div>Loading...</div>;
  }

  if (isErrorAnime || isErrorEpisodes || isErrorTrailer) {
    return <div>Error loading anime data</div>;
  }

  if (!anime) {
    return <div>No anime data found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen bg-[#0b1622] ${!anime.bannerImage ? 'pt-20' : ''}`}
    >
      <AnimeHeader anime={anime} />
      <div className="container mx-auto px-28 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimeInfo anime={anime} />
            <AnimeDescription description={anime.description} />
            <AnimeTrailer trailer={trailer} />
            {episodes.length > 0 && <AnimeEpisodePreview episodes={episodes} />}
          </div>
          <div>
            <AnimeStats anime={anime} />
            <AnimeStudios studios={anime.studios} />
            <AnimeGenres genres={anime.genres} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
