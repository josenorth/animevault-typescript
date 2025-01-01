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
        fetch(`/api/v1/animes/${anime_id}`)
          .then(response => response.json())
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

      fetch(`/api/v1/animes/${anime_id}/relations`)
        .then(response => response.json())
        .then(data => {
          setRelations(data);
        })
        .catch(error => {
          console.error('Error fetching anime relations:', error);
        });
        fetch(`/api/v1/animes/${anime_id}/episodes`)
        .then(response => response.json())
        .then(data => {
          setEpisodes(data);
        })
        .catch(error => {
          console.error('Error fetching anime relations:', error);
        });
        fetch(`/api/v1/animes/${anime_id}/trailer`)
        .then(response => response.json())
        .then(data => {
          setTrailer(data);
        })
        .catch(error => {
          console.error('Error fetching anime relations:', error);
        });
        fetch(`/api/v1/animes/${anime_id}/external-links`)
        .then(response => response.json())
        .then(data => {
          setExternalLinks(data);
        })
        .catch(error => {
          console.error('Error fetching anime relations:', error);
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