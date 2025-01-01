import { SkeletonTheme } from 'react-loading-skeleton'
import { Anime } from '@/types/anime/Anime'
import AnimeCard from '@/components/AnimeCard'
import Navbar from '@/components/Navbar'
import ClientFilters from '@/components/ClientFilters'
import 'react-loading-skeleton/dist/skeleton.css'
import "@/app/globals.css"

async function getAnimeData(endpoint: string) {
  const res = await fetch(`http://localhost:3000/api/v1/animes/${endpoint}`, {
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json()
}

export default async function AnimePage() {
  const [trendingAnime, popularThisSeason, upcomingNextSeason, allTimePopular] = await Promise.all([
    getAnimeData('trending-now'),
    getAnimeData('popular-this-season'),
    getAnimeData('upcoming-next-season'),
    getAnimeData('all-time-popular')
  ])

  return (
    <SkeletonTheme baseColor="#1E293B" highlightColor="#84CC16">
      <div className="min-h-screen bg-[#111827]">
        <Navbar />
        
        <ClientFilters />

        <div className="container mx-auto px-28 py-8">
          <section className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-poppins text-xl font-bold text-[#84CC16]">TRENDING NOW</h2>
              <button className="text-sm text-[#84CC16] hover:underline font-roboto">View All</button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {trendingAnime?.map((anime: Anime) => (
                <AnimeCard key={anime.id} anime={anime} isLoading={false} />
              ))}
            </div>
          </section>

          <section className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-poppins text-xl font-bold text-[#84CC16]">POPULAR THIS SEASON</h2>
              <button className="text-sm text-[#84CC16] hover:underline font-roboto">View All</button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {popularThisSeason?.map((anime: Anime) => (
                <AnimeCard key={anime.id} anime={anime} isLoading={false} />
              ))}
            </div>
          </section>

          <section className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-poppins text-xl font-bold text-[#84CC16]">UPCOMING NEXT SEASON</h2>
              <button className="text-sm text-[#84CC16] hover:underline font-roboto">View All</button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {upcomingNextSeason?.map((anime: Anime) => (
                <AnimeCard key={anime.id} anime={anime} isLoading={false} />
              ))}
            </div>
          </section>

          <section className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-poppins text-xl font-bold text-[#84CC16]">ALL-TIME POPULAR</h2>
              <button className="text-sm text-[#84CC16] hover:underline font-roboto">View All</button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {allTimePopular?.map((anime: Anime) => (
                <AnimeCard key={anime.id} anime={anime} isLoading={false} />
              ))}
            </div>
          </section>
          {/* Resto de secciones similares */}
        </div>
      </div>
    </SkeletonTheme>
  )
}