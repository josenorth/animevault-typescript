'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { MangaHeader } from '@/components/MangaPage/MangaHeader';
import { MangaInfo } from '@/components/MangaPage/MangaInfo';
import { MangaDescription } from '@/components/MangaPage/MangaDescription';
import { MangaStats } from '@/components/MangaPage/MangaStats';
import { MangaGenres } from '@/components/MangaPage/MangaGenres';
import { MangaRelations } from '@/components/MangaPage/MangaRelations';
import Spinner from '@/components/Spinner';
import { Manga } from '@/types/manga/Manga';
import { RelatedMedia } from '@/types/manga/Relation';

const initialManga: Manga = {
  title_romaji: '',
  title_english: '',
  title_native: '',
  description: '',
  status: '',
  format: '',
  countryOfOrigin: '',
  source: '',
  averageScore: 0,
  chapters: 0,
  volumes: 0,
  startDate: 0,
  endDate: 0,
  coverImage: '',
  bannerImage: '',
  isAdult: 0,
  id: 0,
  genres: []
};

const MangaPage = () => {
  const { manga_id } = useParams();
  const [manga, setManga] = useState<Manga>(initialManga);
  const [relations, setRelations] = useState<RelatedMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (manga_id) {
      const cachedManga = localStorage.getItem(`manga_${manga_id}`);
      if (cachedManga) {
        setManga(JSON.parse(cachedManga));
        setLoading(false);
      } else {
        fetch(`/api/v1/mangas/${manga_id}`)
          .then(response => response.json())
          .then(data => {
            setManga(data);
            localStorage.setItem(`manga_${manga_id}`, JSON.stringify(data));
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching manga:', error);
            setLoading(false);
          });
      }

      fetch(`/api/v1/mangas/${manga_id}/relations`)
        .then(response => response.json())
        .then(data => {
          setRelations(data);
        })
        .catch(error => {
          console.error('Error fetching manga relations:', error);
        });
    }
  }, [manga_id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#0b1622]"
    >
      <MangaHeader manga={manga} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MangaInfo manga={manga} />
            <MangaDescription description={manga.description} />
          </div>
          <div>
            <MangaStats manga={manga} />
            <MangaGenres genres={manga.genres} />
            <MangaRelations relations={relations} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MangaPage;