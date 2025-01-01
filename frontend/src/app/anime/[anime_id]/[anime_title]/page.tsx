'use client';

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
// import { Anime } from '@/types/anime/Anime'
// import { Relation } from '@/types/anime/Relation'
// import { Studio } from '@/types/anime/Studio'
// import { Genre } from '@/types/anime/Genre'
// import { Trailer } from '@/types/anime/Trailer'
// import { Episode } from '@/types/anime/Episode'
import { AnimeHeader } from '@/components/AnimePage/AnimeHeader'
import { AnimeInfo } from '@/components/AnimePage/AnimeInfo'
import { AnimeDescription } from '@/components/AnimePage/AnimeDescription'
import { AnimeStudios } from '@/components/AnimePage/AnimeStudios'
import { AnimeGenres } from '@/components/AnimePage/AnimeGenres'
import { AnimeTrailer } from '@/components/AnimePage/AnimeTrailer'
import { AnimeRelations } from '@/components/AnimePage/AnimeRelations'

const AnimePage = ({ params }) => {
  const [anime, setAnime] = useState(null);
  const [studios, setStudios] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [relations, setRelations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { anime_id } = params;

      const [animeRes, studiosRes, trailerRes, episodesRes, relationsRes] = await Promise.all([
        fetch(`http://localhost:3000/api/v1/animes/${anime_id}`),
        fetch(`http://localhost:3000/api/v1/animes/${anime_id}/studios`),
        fetch(`http://localhost:3000/api/v1/animes/${anime_id}/trailer`),
        fetch(`http://localhost:3000/api/v1/animes/${anime_id}/episodes`),
        fetch(`http://localhost:3000/api/v1/animes/${anime_id}/relations`)
      ]);

      const [anime, studios, trailer, episodes, relations] = await Promise.all([
        animeRes.json(),
        studiosRes.json(),
        trailerRes.json(),
        episodesRes.json(),
        relationsRes.json()
      ]);

      setAnime(anime);
      setStudios(studios);
      setTrailer(trailer);
      setEpisodes(episodes);
      setRelations(relations);
    };

    fetchData();
  }, [params]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#0b1622]"
    >
      <AnimeHeader anime={anime} isLoading={!anime} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimeInfo anime={anime} isLoading={!anime} />
            <AnimeDescription description={anime?.description} isLoading={!anime} />
            <AnimeTrailer youtubeId={trailer?.youtubeId} isLoading={!trailer} />
          </div>
          <div>
            <AnimeStudios studios={studios} isLoading={!studios.length} />
            <AnimeGenres genres={anime?.genres} isLoading={!anime} />
            <AnimeRelations relations={relations} isLoading={!relations.length} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AnimePage;