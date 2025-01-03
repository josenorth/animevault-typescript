import { Anime } from '@/types/anime/Anime';
import AnimeCard from '@/components/AnimeCard';
import ClientFilters from '@/components/ClientFilters';
import { Suspense } from 'react';
import Loading from '@/app/search/anime/loading';

async function fetchAnimeData(endpoint: string) {
  const res = await fetch(`http://localhost:3000/api/v1/animes/${endpoint}`, {
    cache: 'no-store', // O usa 'force-cache' si prefieres caching
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

async function AnimePage() {
  let trendingAnime: Anime[] = [];
  let popularThisSeason: Anime[] = [];
  let upcomingNextSeason: Anime[] = [];
  let allTimePopular: Anime[] = [];

  try {
    [trendingAnime, popularThisSeason, upcomingNextSeason, allTimePopular] = await Promise.all([
      fetchAnimeData('trending-now'),
      fetchAnimeData('popular-this-season'),
      fetchAnimeData('upcoming-next-season'),
      fetchAnimeData('all-time-popular'),
    ]);
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="min-h-screen bg-[#111827]">
      <ClientFilters />

      <div className="container mx-auto px-28 py-8">
        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-poppins text-xl font-bold text-[#84CC16]">TRENDING NOW</h2>
            <button className="text-sm text-[#84CC16] hover:underline font-roboto">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {trendingAnime.map((anime: Anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-poppins text-xl font-bold text-[#84CC16]">POPULAR THIS SEASON</h2>
            <button className="text-sm text-[#84CC16] hover:underline font-roboto">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {popularThisSeason.map((anime: Anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-poppins text-xl font-bold text-[#84CC16]">UPCOMING NEXT SEASON</h2>
            <button className="text-sm text-[#84CC16] hover:underline font-roboto">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {upcomingNextSeason.map((anime: Anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-poppins text-xl font-bold text-[#84CC16]">ALL-TIME POPULAR</h2>
            <button className="text-sm text-[#84CC16] hover:underline font-roboto">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {allTimePopular.map((anime: Anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


export default async function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <AnimePage />
    </Suspense>
  );
}