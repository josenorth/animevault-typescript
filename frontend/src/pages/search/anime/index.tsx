'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import AnimeCard from '@/components/AnimeCard'
import FilterDropdown from '@/components/FilterDropdown'
import Navbar from '@/components/Navbar'
import { useAnimeTrendingNow } from '@/services/anime/useAnimeTrendingNow'
import { useAnimePopularSeason } from '@/services/anime/useAnimePopularSeason'
import { useAnimeUpcoming } from '@/services/anime/useAnimeUpcoming'
import { useAnimeTop } from '@/services/anime/useAnimeTop'
import { SkeletonTheme } from 'react-loading-skeleton'
import { defaultAnime } from '@/components/AnimeCard'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import "@/app/globals.css";

export default function AnimePage() {
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    season: '',
    format: '',
    status: '',
  })

  const { data: trendingAnime, isLoading: isLoadingTrending } = useAnimeTrendingNow()
  const { data: popularAnime, isLoading: isLoadingPopular } = useAnimePopularSeason()
  const { data: upcomingAnime, isLoading: isLoadingUpcoming } = useAnimeUpcoming()
  const { data: topAnime, isLoading: isLoadingTop } = useAnimeTop()

  return (
    <SkeletonTheme baseColor="#1E293B" highlightColor="#84CC16">

      <div className="min-h-screen bg-[#111827]">
        <Navbar />

        {/* Filters */}
        <div className="z-40">
          <div className="container mx-auto px-12 pt-28">
            <div className="flex justify-center items-center gap-4">
              <div className="relative flex-grow md:flex-grow-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full rounded bg-[#1E293B] px-3 py-2 pl-9 text-sm text-[#F9FAFB] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#84CC16] font-roboto"
                />
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
              <FilterDropdown
                label="Genres"
                options={['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy']}
                value={filters.genre}
                onChange={(value) => setFilters({ ...filters, genre: value })}
              />
              <FilterDropdown
                label="Year"
                options={['2024', '2023', '2022', '2021', '2020']}
                value={filters.year}
                onChange={(value) => setFilters({ ...filters, year: value })}
              />
              <FilterDropdown
                label="Season"
                options={['Winter', 'Spring', 'Summer', 'Fall']}
                value={filters.season}
                onChange={(value) => setFilters({ ...filters, season: value })}
              />
              <FilterDropdown
                label="Format"
                options={['TV', 'Movie', 'OVA', 'Special']}
                value={filters.format}
                onChange={(value) => setFilters({ ...filters, format: value })}
              />
              <FilterDropdown
                label="Status"
                options={['Airing', 'Finished', 'Upcoming']}
                value={filters.status}
                onChange={(value) => setFilters({ ...filters, status: value })}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-28 py-8">
          {/* Trending Now */}
          <section className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-poppins text-xl font-bold text-[#84CC16]">TRENDING NOW</h2>
              <button className="text-sm text-[#84CC16] hover:underline font-roboto">View All</button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {isLoadingTrending ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <AnimeCard key={index} isLoading={true} anime={defaultAnime} />
                ))
              ) : (
                trendingAnime?.map((anime) => (
                  <AnimeCard key={anime.id} anime={anime} isLoading={false} />
                ))
              )}
            </div>
          </section>

          {/* Popular This Season */}
          <section className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-poppins text-xl font-bold text-[#84CC16]">POPULAR THIS SEASON</h2>
              <button className="text-sm text-[#84CC16] hover:underline font-roboto">View All</button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {isLoadingPopular ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <AnimeCard key={index} isLoading={true} anime={defaultAnime} />
                ))
              ) : (
                popularAnime?.map((anime) => (
                  <AnimeCard key={anime.id} anime={anime} isLoading={false} />
                ))
              )}
            </div>
          </section>

          {/* Upcoming Next Season */}
          <section className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-poppins text-xl font-bold text-[#84CC16]">UPCOMING NEXT SEASON</h2>
              <button className="text-sm text-[#84CC16] hover:underline font-roboto">View All</button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {isLoadingUpcoming ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <AnimeCard key={index} isLoading={true} anime={defaultAnime} />
                ))
              ) : (
                upcomingAnime?.map((anime) => (
                  <AnimeCard key={anime.id} anime={anime} isLoading={false} />
                ))
              )}
            </div>
          </section>

          {/* All Time Popular */}
          <section className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-poppins text-xl font-bold text-[#84CC16]">ALL TIME POPULAR</h2>
              <button className="text-sm text-[#84CC16] hover:underline font-roboto">View All</button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {isLoadingTop ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <AnimeCard key={index} isLoading={true} anime={defaultAnime} />
                ))
              ) : (
                topAnime?.map((anime) => (
                  <AnimeCard key={anime.id} anime={anime} isLoading={false} />
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </SkeletonTheme>
  )
}