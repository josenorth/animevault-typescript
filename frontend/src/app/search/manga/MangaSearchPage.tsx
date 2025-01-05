'use client'

import { useState, useEffect } from 'react'
import { Manga } from '@/types/manga/Manga'
import { MangaCard } from '@/components/MangaCard'
import ClientFilters from '@/components/ClientFilters'
import FilterManga from '@/components/ClientFilters'
import Loading from '@/app/search/manga/loading'

export default function MangaSearchPage() {
  const [filters, setFilters] = useState({
    genre: [],
    year: '',
    season: '',
    name: ''
  })
  
  const [showFilterManga, setShowFilterManga] = useState(false)
  const [trendingManga, setTrendingManga] = useState<Manga[]>([])
  const [popularManwa, setPopularManwa] = useState<Manga[]>([])
  const [allTimePopular, setAllTimePopular] = useState<Manga[]>([])
  const [loading, setLoading] = useState(true)

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters)
    const hasActiveFilters = 
      newFilters.genre.length > 0 || 
      newFilters.year !== '' || 
      newFilters.season !== '' || 
      newFilters.name !== ''
    
    setShowFilterManga(hasActiveFilters)
  }

  useEffect(() => {
    const fetchMangaData = async (endpoint: string) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/mangas/${endpoint}`, {
        cache: 'no-store',
      })
      if (!res.ok) throw new Error('Failed to fetch data')
      return res.json()
    }

    const fetchAllData = async () => {
      try {
        const [trending, popularManwa, allTime] = await Promise.all([
          fetchMangaData('trending-now'),
          fetchMangaData('popular-manwa'),
          fetchMangaData('all-time-popular'),
        ])
        setTrendingManga(trending)
        setPopularManwa(popularManwa)
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

  return (
    <div className="min-h-screen bg-[#121212]">
      <ClientFilters onFiltersChange={handleFiltersChange} />
      {showFilterManga ? (
        <FilterManga filters={filters} />
      ) : (
        <MangaPage
          trendingManga={trendingManga}
          popularManwa={popularManwa}
          allTimePopular={allTimePopular}
        />
      )}
    </div>
  )
}

function MangaPage({ trendingManga, popularManwa, allTimePopular }: any) {
  return (
    <div className="container mx-auto px-28 py-8">
      <section className="mb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-poppins text-xl font-bold text-[#84CC16]">TRENDING NOW</h2>
          <button className="text-sm font-semibold text-[#84CC16] hover:underline font-sans">View All</button>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {trendingManga.map((manga: Manga, index: number) => (
            <MangaCard key={manga.id} manga={manga} index={index} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-poppins text-xl font-bold text-[#84CC16]">POPULAR MANWA</h2>
          <button className="text-sm text-[#84CC16] hover:underline font-roboto">View All</button>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {popularManwa.map((manga: Manga, index: number) => (
            <MangaCard key={manga.id} manga={manga} index={index} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-poppins text-xl font-bold text-[#84CC16]">ALL-TIME POPULAR</h2>
          <button className="text-sm text-[#84CC16] hover:underline font-roboto">View All</button>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {allTimePopular.map((manga: Manga, index: number) => (
            <MangaCard key={manga.id} manga={manga} index={index} />
          ))}
        </div>
      </section>
    </div>
  )
}