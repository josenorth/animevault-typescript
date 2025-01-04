'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import FilterDropdown from '@/components/FilterDropdown'
import { useRouter, useSearchParams } from 'next/navigation'

interface Filters {
  genre: string[]
  year: string
  season: string
  name: string
}

interface ClientFiltersProps {
  onFiltersChange: (filters: Filters) => void
}

export default function ClientFilters({ onFiltersChange }: ClientFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [filters, setFilters] = useState<Filters>({
    genre: Array.from(searchParams.getAll('genres')),
    year: searchParams.get('year') || '',
    season: searchParams.get('season') || '',
    name: searchParams.get('name') || '',
  })

  const handleFilterChange = (key: string, value: string) => {
    if (key === 'genre') {
      const genreArray = Array.isArray(filters.genre) ? filters.genre : []
      const updatedGenres = genreArray.includes(value)
        ? genreArray.filter(genre => genre !== value)
        : [...genreArray, value]
      
      const newFilters = { ...filters, genre: updatedGenres }
      setFilters(newFilters)
      onFiltersChange(newFilters)
      updateURL(newFilters)
    } else {
      const newFilters = { ...filters, [key]: value }
      setFilters(newFilters)
      onFiltersChange(newFilters)
      updateURL(newFilters)
    }
  }

  const updateURL = (newFilters: Filters) => {
    const params = new URLSearchParams()
    
    if (newFilters.genre.length > 0) {
      newFilters.genre.forEach(g => params.append('genres', g))
    }
    if (newFilters.year) params.set('year', newFilters.year)
    if (newFilters.season) params.set('season', newFilters.season)
    if (newFilters.name) params.set('name', newFilters.name)

    router.push(`/search/anime?${params.toString()}`)
  }

  const clearFilters = () => {
    const emptyFilters: Filters = {
      genre: [],
      year: '',
      season: '',
      name: '',
    }
    setFilters(emptyFilters)
    onFiltersChange(emptyFilters)
    router.push('/search/anime')
  }

  useEffect(() => {
    onFiltersChange(filters)
  }, [filters])

  return (
    <div className="z-40">
      <div className="container mx-auto px-12 pt-28">
        <div className="flex justify-center items-center gap-4">
          <div className="relative flex-grow md:flex-grow-0">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded bg-[#1E293B] px-3 py-2 pl-9 text-sm text-[#F9FAFB] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#84CC16] font-roboto"
              onChange={(e) => handleFilterChange('name', e.target.value)}
            />
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
          <FilterDropdown
            label="Genres"
            options={['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy']}
            value={filters.genre.join(', ')}
            onChange={(value) => handleFilterChange('genre', value)}
          />
          <FilterDropdown
            label="Year"
            options={['2024', '2023', '2022', '2021', '2020']}
            value={filters.year}
            onChange={(value) => handleFilterChange('year', value)}
          />
          <FilterDropdown
            label="Season"
            options={['Winter', 'Spring', 'Summer', 'Fall']}
            value={filters.season}
            onChange={(value) => handleFilterChange('season', value)}
          />
          <button onClick={clearFilters} className="text-red-500">x</button>
        </div>
      </div>
    </div>
  )
}