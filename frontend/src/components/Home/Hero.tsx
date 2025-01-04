'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Anime } from '@/types/anime/Anime'
import HeroLoading from './loading'

export default function Hero() {
  const [currentAnime, setCurrentAnime] = useState(0)
  const [animes, setAnimes] = useState<Anime[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const MAX_DESCRIPTION_LENGTH = 200

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/animes/trending-now`)
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setAnimes(data)
      } catch (err) {
        setError('Error loading trending anime')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnimes()
  }, [])

  useEffect(() => {
    if (animes.length === 0) return
    const timer = setInterval(() => {
      setCurrentAnime((prev) => (prev + 1) % animes.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [animes.length])

  const truncateDescription = (description: string) => {
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
    }
    return description
  }

  if (isLoading) return <HeroLoading />
  if (error) return <div>{error}</div>
  if (animes.length === 0) return null

  return (
    <section className="relative min-h-screen bg-[#121212] py-8 md:py-16 pt-24 lg:mt-2">
      <div className="container mx-auto px-4 md:px-28">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 md:mb-4 mt-8 md:mt-16 font-montserrat text-white">
            Discover Anime & Manga
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 font-roboto text-gray-300 px-4">
            Your ultimate guide to the world of Japanese animation and comics
          </p>
          <Link href="/search/anime">
            <Button className="bg-lime-500 mb-2 text-emerald-900 font-semibold py-2 md:py-3 px-6 md:px-8 rounded-full text-base md:text-lg hover:bg-lime-600 transition duration-300">
              Explore Now
            </Button>
          </Link>
        </div>

        <div className="w-full h-[400px] sm:h-[400px] md:h-[500px] relative rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex flex-col md:flex-row">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAnime}
                className="w-full h-1/2 md:h-full md:w-2/3 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={animes[currentAnime].bannerImage || animes[currentAnime].coverImage}
                  alt={animes[currentAnime].title_english || animes[currentAnime].title_romaji}
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="w-full h-2/3 md:h-full md:w-1/3 bg-emerald-900 p-4 md:p-6 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentAnime}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.9 }}
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 font-montserrat text-white line-clamp-2">
                    {animes[currentAnime].title_english || animes[currentAnime].title_romaji}
                  </h2>
                  <p
                    className="text-sm sm:text-base md:text-lg mb-3 md:mb-4 font-roboto text-gray-300 line-clamp-3 md:line-clamp-none"
                    dangerouslySetInnerHTML={{
                      __html: truncateDescription(animes[currentAnime].description || 'No description available'),
                    }}
                  />
                </motion.div>
              </AnimatePresence>
              <Link href={`/anime/${animes[currentAnime].id}/${animes[currentAnime].title_romaji}`}>
                <Button className="bg-lime-500 text-emerald-900 font-semibold py-1.5 md:py-2 px-4 md:px-6 rounded-full text-sm hover:bg-lime-600 transition duration-300 self-start">
                  View Anime
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

