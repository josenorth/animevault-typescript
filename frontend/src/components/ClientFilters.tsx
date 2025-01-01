'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import FilterDropdown from '@/components/FilterDropdown'

export default function ClientFilters() {
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    season: '',
    format: '',
    status: '',
  })

    return (

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
    )
}