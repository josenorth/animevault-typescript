'use client'

import Image from 'next/image'
import { Search, BookOpen, Tv, Star } from 'lucide-react'

const featuredAnime = [
  { id: 1, title: 'Attack on Titan', image: '/placeholder.svg?height=400&width=300', rating: 9.0 },
  { id: 2, title: 'My Hero Academia', image: '/placeholder.svg?height=400&width=300', rating: 8.5 },
  { id: 3, title: 'Demon Slayer', image: '/placeholder.svg?height=400&width=300', rating: 8.7 },
]


export default function Home() {


  return (
    <div className="min-h-min bg-gray-100">
      {/* Hero Section */}
      <section className="bg-[#1E293B] text-white pt-28 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 font-poppins">Discover Your Next Favorite Anime or Manga</h2>
          <p className="text-xl mb-8 font-open-sans text-[#F9FAFB]">Explore our vast database of anime and manga metadata</p>
          <div className="flex justify-center">
            <input 
              type="text" 
              placeholder="Search anime or manga..." 
              className="px-4 py-2 w-64 rounded-l-lg focus:outline-none text-[#111827]"
            />
            <button className="bg-[#84CC16] text-[#111827] px-4 py-2 rounded-r-lg transition duration-300">
              <Search className="w-6 h-6" />
            </button>
          </div>
        
        </div>
      
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center font-poppins text-[#111827]">Why Choose AnimeVault?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BookOpen className="w-12 h-12 text-[#84CC16]" />}
              title="Extensive Database"
              description="Access a comprehensive collection of anime and manga metadata."
            />
            <FeatureCard 
              icon={<Tv className="w-12 h-12 text-[#84CC16]" />}
              title="Up-to-date Information"
              description="Stay informed with the latest updates on your favorite series."
            />
            <FeatureCard 
              icon={<Star className="w-12 h-12 text-[#84CC16]" />}
              title="User Reviews"
              description="Read and contribute to user reviews and ratings."
            />
          </div>
        </div>
      </section>

      {/* Featured Anime Section */}
      <section className="bg-[#F9FAFB] py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center font-poppins text-[#111827]">Featured Anime</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredAnime.map((anime) => (
              <AnimeCard key={anime.id} {...anime} />
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2 font-poppins text-[#111827]">{title}</h4>
      <p className="text-[#4B5563] font-open-sans">{description}</p>
    </div>
  )
}

function AnimeCard({ title, image, rating }: { title: string, image: string, rating: number }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image src={image} alt={title} width={300} height={400} className="w-full" />
      <div className="p-4">
        <h4 className="text-xl font-semibold mb-2 font-poppins text-[#111827]">{title}</h4>
        <div className="flex items-center">
          <Star className="w-5 h-5 text-[#84CC16] mr-1" />
          <span className="font-roboto text-[#4B5563]">{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
}

