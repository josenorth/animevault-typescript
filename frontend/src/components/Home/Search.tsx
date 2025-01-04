'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from 'lucide-react'

export default function Search() {
  const [search, setSearch] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', search)
  }

  return (
    <section className="py-8 pb-16 md:py-12 lg:py-16 bg-[#121212]">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-28">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 lg:mb-8 text-center font-montserrat text-white">
          Find Your Next Favorite
        </h2>
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2 sm:gap-4 px-4 sm:px-0">
          <Input
            type="text"
            placeholder="Search anime or manga..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow bg-gray-800 text-white border-lime-500 text-sm md:text-base h-10 md:h-12"
          />
          <Button 
            type="submit" 
            className="bg-lime-500 text-emerald-900 hover:bg-lime-600 text-sm md:text-base h-10 md:h-12 px-4 md:px-6"
          >
            <SearchIcon className="mr-2 h-4 w-4" /> 
            <span>Search</span>
          </Button>
        </form>
      </div>
    </section>
  )
}
