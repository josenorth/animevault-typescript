'use client'

import useSWR from 'swr';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { AnimeHeader } from '@/components/AnimePage/AnimeHeader';
import { AnimeInfo } from '@/components/AnimePage/AnimeInfo';
import { AnimeDescription } from '@/components/AnimePage/AnimeDescription';
import { AnimeStudios } from '@/components/AnimePage/AnimeStudios';
import { AnimeRelations } from '@/components/AnimePage/AnimeRelations';
import { AnimeEpisodePreview } from '@/components/AnimePage/AnimeEpisode';
import { AnimeTrailer } from '@/components/AnimePage/AnimeTrailer';
import { AnimeExternalLinks } from '@/components/AnimePage/AnimeExternalLink';
import Spinner from '@/components/Spinner';
import { Anime } from '@/types/anime/Anime';
// import { Relation } from '@/types/anime/Relation';
// import { Episode } from '@/types/anime/Episode';
// import { Trailer } from '@/types/anime/Trailer';
// import { ExternalLink } from '@/types/shared/ExternalLink';

const initialAnime: Anime = {
  id: 0,
  title_romaji: '',
  title_english: '',
  native: '',
  description: '',
  coverImage: '',
  bannerImage: '',
  episode_count: 0,
  episode_duration: 0,
  average_score: 0,
  popularity: 0,
  season_id: 0,
  start_date: '',
  end_date: '',
  seasonYear: 0,
  format: '',
  status: '',
  source: '',
  season: '',
  genres: [],
  studios: []
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

const AnimePage = () => {
  const { anime_id } = useParams();
  const { data: anime, error: animeError } = useSWR(anime_id ? `http://localhost:3000/api/v1/animes/${anime_id}` : null, fetcher, { fallbackData: initialAnime });
  const { data: relations, error: relationsError } = useSWR(anime_id ? `http://localhost:3000/api/v1/animes/${anime_id}/relations` : null, fetcher);
  const { data: episodes, error: episodesError } = useSWR(anime_id ? `http://localhost:3000/api/v1/animes/${anime_id}/episodes` : null, fetcher);
  const { data: trailer, error: trailerError } = useSWR(anime_id ? `http://localhost:3000/api/v1/animes/${anime_id}/trailer` : null, fetcher);
  const { data: externalLinks, error: externalLinksError } = useSWR(anime_id ? `http://localhost:3000/api/v1/animes/${anime_id}/external-links` : null, fetcher);

  const isLoading = !anime || !relations || !episodes || !trailer || !externalLinks;
  const isError = animeError || relationsError || episodesError || trailerError || externalLinksError;

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <motion.div className="min-h-screen bg-[#0b1622]">
      <AnimeHeader anime={anime} />
      <div className="container mx-auto px-28 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimeInfo anime={anime} />
            <AnimeDescription description={anime.description} />
            <AnimeEpisodePreview episodes={episodes} />
            <AnimeTrailer trailer={trailer} />
          </div>
          <div>
            <AnimeStudios studios={anime.studios} />
            <AnimeExternalLinks links={externalLinks} />
            <AnimeRelations relations={relations} />
            {/* Otros componentes o información adicional */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimePage;