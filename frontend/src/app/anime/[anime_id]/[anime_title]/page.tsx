'use client'

import { useEffect, useState } from 'react';
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
import { Relation } from '@/types/anime/Relation';
import { Episode } from '@/types/anime/Episode';
import { Trailer } from '@/types/anime/Trailer';
import { ExternalLink } from '@/types/shared/ExternalLink';

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

const fetchData = async (endpoint: string) => {
  const res = await fetch(`http://localhost:3000/api/v1/animes/${endpoint}`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};

const AnimePage = () => {
  const { anime_id } = useParams();
  const [anime, setAnime] = useState<Anime>(initialAnime);
  const [relations, setRelations] = useState<Relation[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState<Trailer | undefined>(undefined);
  const [externalLinks, setExternalLinks] = useState<ExternalLink[]>([]);

  useEffect(() => {
    if (anime_id) {
      const cachedAnime = localStorage.getItem(`anime_${anime_id}`);
      if (cachedAnime) {
        setAnime(JSON.parse(cachedAnime));
        setLoading(false);
      } else {
        fetchData(`${anime_id}`)
          .then(data => {
            setAnime(data);
            localStorage.setItem(`anime_${anime_id}`, JSON.stringify(data));
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching anime:', error);
            setLoading(false);
          });
      }

      Promise.all([
        fetchData(`${anime_id}/relations`),
        fetchData(`${anime_id}/episodes`),
        fetchData(`${anime_id}/trailer`),
        fetchData(`${anime_id}/external-links`)
      ])
      .then(([relationsData, episodesData, trailerData, externalLinksData]) => {
        setRelations(relationsData);
        setEpisodes(episodesData);
        setTrailer(trailerData);
        setExternalLinks(externalLinksData);
      })
      .catch(error => {
        console.error('Error fetching additional data:', error);
      });
    }
  }, [anime_id]);

  if (loading) {
    return <Spinner />;
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