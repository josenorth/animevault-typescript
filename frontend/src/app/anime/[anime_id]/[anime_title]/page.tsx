'use client'

import { useQuery } from '@tanstack/react-query';
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
import { AnimeNews } from '@/components/AnimePage/AnimeNews';
import Spinner from '@/components/Spinner';
// import { Relation } from '@/types/anime/Relation';
// import { Episode } from '@/types/anime/Episode';
// import { Trailer } from '@/types/anime/Trailer';
// import { ExternalLink } from '@/types/shared/ExternalLink';



const fetcher = async (url: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_EXTERNAL_API_URL + url);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const AnimePage = () => {
  const { anime_id } = useParams();
  const animeQuery = useQuery({
    queryKey: ['anime', anime_id],
    queryFn: () => fetcher(`/animes/${anime_id}`),
    retry: false // No reintentar si falla
  });
  const queryOptions = {
    enabled: !animeQuery.isLoading && !animeQuery.isError, // Solo ejecutar si anime cargó exitosamente
    retry: false, // No reintentar
  };
  const relationsQuery = useQuery({
    queryKey: ['relations', anime_id],
    queryFn: () => fetcher(`/animes/${anime_id}/relations`),
    ...queryOptions
  });

  const episodesQuery = useQuery({
    queryKey: ['episodes', anime_id],
    queryFn: () => fetcher(`/animes/${anime_id}/episodes`),
    ...queryOptions
  });

  const trailerQuery = useQuery({
    queryKey: ['trailer', anime_id],
    queryFn: () => fetcher(`/animes/${anime_id}/trailer`),
    ...queryOptions
  });

  const externalLinksQuery = useQuery({
    queryKey: ['externalLinks', anime_id],
    queryFn: () => fetcher(`/animes/${anime_id}/external-links`),
    ...queryOptions
  });

  const newsQuery = useQuery({
    queryKey: ['news', anime_id],
    queryFn: () => fetcher(`/animes/${anime_id}/news`),
    ...queryOptions
  });

  if (animeQuery.isLoading) {
    return <Spinner />;
  }

  if (animeQuery.isError) {
    return <div>Error loading anime data</div>;
  }

  const anime = animeQuery.data;
  const relations = relationsQuery.data;
  const episodes = episodesQuery.data;
  const trailer = trailerQuery.data;
  const externalLinks = externalLinksQuery.data || [];
  const news = newsQuery.data ? newsQuery.data.slice(0, 3) : [];

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
            <AnimeNews news={news} />
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