import Image from 'next/image'
import Link from 'next/link'
import { Circle } from 'lucide-react'
import { Anime } from '@/types/anime/Anime'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface AnimeCardProps {
  anime: Anime
  isLoading: boolean
}

export const defaultAnime: Anime = {
  id: 0,
  title_romaji: '',
  title_english: '',
  native: '',
  description: '',
  coverImage: '',
  bannerImage: '',
  status: '',
  episode_count: 0,
  episode_duration: 0,
  season: '',
  seasonYear: 0,
  season_id: 0,
  format: '',
  genres: [],
  average_score: 0,
  popularity: 0,
  start_date: '',
  end_date: '',
  studios: [],
  source: ''
}

export default function AnimeCard({ anime, isLoading }: AnimeCardProps) {
    function formatTitleWithHyphen(title: string): string {
      return title.trim().replace(/\s+/g, '-');
    }
  
    const formattedTitle = formatTitleWithHyphen(anime.title_romaji);
  
    if (isLoading) {
      return (
        <div className="group relative block overflow-hidden rounded-lg transition-all hover:scale-105">
          <div className="aspect-[3/4]">
            <Skeleton height="100%" />
          </div>
          <div className="relative bottom-0 left-0 right-0 p-0 pt-2">
            <Skeleton width={100} />
          </div>
        </div>
      );
    }
  
    return (
      <Link
        href={`/anime/${anime.id}/${formattedTitle}`}
        className="group relative block overflow-hidden rounded-lg transition-all hover:scale-105"
      >
        <div className="aspect-[3/4] relative">
          <Image
            src={anime.coverImage}
            alt={anime.title_romaji}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 300px"
          />
          <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:opacity-0" />
        </div>
        <div className="relative bottom-0 left-0 right-0 p-0 pt-2">
          <div className="flex items-center gap-2">
            {anime.status === 'Airing' && (
              <Circle className="h-2 w-2 fill-[#84CC16] text-[#84CC16]" />
            )}
            <h3 className="font-poppins font-bold text-sm text-[#9599b7] line-clamp-2">
              {anime.title_romaji}
            </h3>
          </div>
        </div>
      </Link>
    );
  }
  