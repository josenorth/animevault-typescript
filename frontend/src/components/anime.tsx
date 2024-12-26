import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import "../css/anime.css";
import { useAnimeTrendingNow } from '../services/anime/useAnimeTrendingNow';
import { useAnimePopularSeason } from '../services/anime/useAnimePopularSeason';
import { useAnimeUpcoming } from '../services/anime/useAnimeUpcoming';
import { useAnimeTop } from '../services/anime/useAnimeTop';
import { Anime } from '../types/anime/Anime';
import AnimeCard from './AnimeCard';

const SearchAnime: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const { data: trendingAnimes = [], isLoading: loadingTrending } = useAnimeTrendingNow();
  const { data: popularAnimes = [], isLoading: loadingPopular } = useAnimePopularSeason();
  const { data: upcomingAnimes = [], isLoading: loadingUpcoming } = useAnimeUpcoming();
  const { data: topAnimes = [], isLoading: loadingTop } = useAnimeTop();

  useEffect(() => {
    setLoading(loadingTrending || loadingPopular || loadingUpcoming || loadingTop);
  }, [loadingTrending, loadingPopular, loadingUpcoming, loadingTop]);

  const animeData: { [key: string]: Anime[] } = {
    'TRENDING NOW': trendingAnimes,
    'POPULAR THIS SEASON': popularAnimes,
    'UPCOMING NEXT SEASON': upcomingAnimes,
    'ALL TIME POPULAR': topAnimes,
  };

  return (
    <>
      <div className="bg-[#111827] text-white min-h-screen overflow-hidden">
        <div className="custom-container mx-auto p-4">
          <SkeletonTheme baseColor="#1F2937" highlightColor="rgba(192, 132, 252, 0.2)">
            {loading ? (
              <div>
                {Object.keys(animeData).map((section, idx) => (
                  <div key={idx} className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <Skeleton width={200} height={24} className="rounded-md" />
                      <Skeleton width={100} height={20} className="rounded-md" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                      {Array(6).fill(null).map((_, i) => (
                        <div key={`${idx}-${i}`} className="relative block">
                          <div className="skeleton-card w-full h-[265px]">
                            <Skeleton height="100%" className="object-cover rounded-md" />
                          </div>
                          <div className="p-2">
                            <Skeleton width={100} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              Object.entries(animeData).map(([section, animes]) => (
                <div key={section} className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{section}</h2>
                    <button className="text-gray-400 cursor-pointer">View All</button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {animes.length === 0 ? (
                      Array(6).fill(null).map((_, i) => (
                        <div key={i} className="relative block">
                          <div className="skeleton-card w-full h-[265px]">
                            <Skeleton height="100%" className="object-cover rounded-md" />
                          </div>
                          <div className="p-2">
                            <Skeleton width={100} />
                          </div>
                        </div>
                      ))
                    ) : (
                      animes.map((anime) => (
                        <AnimeCard key={anime.id} anime={anime} />
                      ))
                    )}
                  </div>
                </div>
              ))
            )}
          </SkeletonTheme>
        </div>
      </div>
    </>
  );
};

export default SearchAnime;
