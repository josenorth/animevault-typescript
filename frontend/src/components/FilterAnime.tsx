'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { AnimeCardNoAnimation } from '@/components/AnimeCard2'
import { Anime } from '@/types/anime/Anime'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

interface Filters {
  genre: string[]
  year: string
  season: string
  name: string
}

interface FilterAnimeProps {
  filters: Filters
}

export default function FilterAnime({ filters }: FilterAnimeProps) {
  const [animes, setAnimes] = useState<Anime[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef<IntersectionObserver | null>(null)
  const lastAnimeRef = useCallback((node: HTMLDivElement) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1)
      }
    })
    
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const fetchAnimes = async (currentPage: number, isNewFilter: boolean) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      
      if (filters.name) params.set('name', filters.name)
      if (filters.genre.length > 0) {
        filters.genre.forEach(g => params.append('genres', g))
      }
      if (filters.year) params.set('seasonYear', filters.year)
      if (filters.season) params.set('season', filters.season)
      
      params.set('page', currentPage.toString())
      params.set('limit', '20')

      const res = await fetch(`${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/animes/filter?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()

      await new Promise(resolve => setTimeout(resolve, 1000))

      if (isNewFilter) {
        setAnimes(data)
      } else {
        setAnimes(prev => [...prev, ...data])
      }
      setHasMore(data.length === 20)
    } catch (error) {
      console.error('Error fetching filtered animes:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(1)
    setHasMore(true)
    fetchAnimes(1, true)
  }, [filters])

  useEffect(() => {
    if (page > 1) {
      fetchAnimes(page, false)
    }
  }, [page])

  return (
    <div className="container mx-auto px-28 py-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {animes.map((anime: Anime, index) => (
          <div
            key={anime.id}
            ref={index === animes.length - 1 ? lastAnimeRef : undefined}
          >
            <AnimeCardNoAnimation anime={anime} index={index} />
          </div>
        ))}
        {loading && Array.from({ length: 6 }).map((_, index) => (
          <div key={`skeleton-${index}`} className="aspect-[3/4] relative overflow-hidden rounded-lg">
            <SkeletonTheme baseColor="#182432" highlightColor="#183C2A">
              <Skeleton height="100%" />
            </SkeletonTheme>
          </div>
        ))}
      </div>
      {loading && <div className="text-center text-white mt-4">Loading...</div>}
      {!hasMore && animes.length > 0 && (
        <div className="text-center text-gray-400 mt-4">No more results</div>
      )}
    </div>
  )
}