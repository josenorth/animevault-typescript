'use client'

import { useState, useEffect } from 'react'
import { Anime } from '@/types/anime/Anime'
import { AnimeCard } from '@/components/AnimeCard'
import ClientFilters from '@/components/ClientFilters'
import FilterAnime from '@/components/FilterAnime'
import Loading from '@/app/search/anime/loading'

export default function AnimeSearchPage() {
  const [filters, setFilters] = useState({
    genre: [],
    year: '',
    season: '',
    name: ''
  })
  const [showFilterAnime, setShowFilterAnime] = useState(false)
  const [trendingAnime, setTrendingAnime] = useState<Anime[]>([])
  const [popularThisSeason, setPopularThisSeason] = useState<Anime[]>([])
  const [upcomingNextSeason, setUpcomingNextSeason] = useState<Anime[]>([])
  const [allTimePopular, setAllTimePopular] = useState<Anime[]>([])
  const [loading, setLoading] = useState(true)

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters)
    const hasActiveFilters = 
      newFilters.genre.length > 0 || 
      newFilters.year !== '' || 
      newFilters.season !== '' || 
      newFilters.name !== ''
    
    setShowFilterAnime(hasActiveFilters)
  }

  useEffect(() => {
    const fetchAnimeData = async (endpoint: string) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/animes/${endpoint}`, {
        cache: 'no-store',
      })
      if (!res.ok) throw new Error('Failed to fetch data')
      return res.json()
    }

    const fetchAllData = async () => {
      try {
        const [trending, popularSeason, upcomingSeason, allTime] = await Promise.all([
          fetchAnimeData('trending-now'),
          fetchAnimeData('popular-this-season'),
          fetchAnimeData('upcoming-next-season'),
          fetchAnimeData('all-time-popular'),
        ])
        setTrendingAnime(trending)
        setPopularThisSeason(popularSeason)
        setUpcomingNextSeason(upcomingSeason)
        setAllTimePopular(allTime)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [])

  if (loading) {
    return <Loading />
  }
  console.log(trendingAnime)

  return (
    <div className="min-h-screen bg-[#121212]">
      <ClientFilters onFiltersChange={handleFiltersChange} />
      {showFilterAnime ? (
        <FilterAnime filters={filters} />
      ) : (
        <AnimePage
          trendingAnime={trendingAnime}
          popularThisSeason={popularThisSeason}
          upcomingNextSeason={upcomingNextSeason}
          allTimePopular={allTimePopular}
        />
      )}
    </div>
  )
}

function AnimePage({ trendingAnime, popularThisSeason, upcomingNextSeason, allTimePopular }: any) {
  return (
    <div className="container mx-auto px-28 py-8">
      <section className="mb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-poppins text-xl font-bold text-[#84CC16]">TRENDING NOW</h2>
          <button className="text-sm font-semibold text-[#84CC16] hover:underline font-sans">View All</button>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {trendingAnime.map((anime: Anime, index: number) => (
            <AnimeCard key={anime.id} anime={anime} index={index} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-poppins text-xl font-bold text-[#84CC16]">POPULAR THIS SEASON</h2>
          <button className="text-sm text-[#84CC16] hover:underline font-roboto">View All</button>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {popularThisSeason.map((anime: Anime, index: number) => (
            <AnimeCard key={anime.id} anime={anime} index={index} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-poppins text-xl font-bold text-[#84CC16]">UPCOMING NEXT SEASON</h2>
          <button className="text-sm text-[#84CC16] hover:underline font-roboto">View All</button>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {upcomingNextSeason.map((anime: Anime, index: number) => (
            <AnimeCard key={anime.id} anime={anime} index={index} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-poppins text-xl font-bold text-[#84CC16]">ALL-TIME POPULAR</h2>
          <button className="text-sm text-[#84CC16] hover:underline font-roboto">View All</button>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {allTimePopular.map((anime: Anime, index: number) => (
            <AnimeCard key={anime.id} anime={anime} index={index} />
          ))}
        </div>
      </section>
    </div>
  )
}