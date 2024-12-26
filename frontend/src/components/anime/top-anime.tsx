"use client"

import { useEffect, useState, useRef } from "react"
import { StarIcon } from "lucide-react"
import { getColorFromURL } from 'color-thief-node'
import { Link } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

interface Anime {
  rank: number
  title: string | null
  image: string
  genres: string[]
  rating: number
  users: number
  type: string
  episodes: number
  season: string
  year: number
  status: string
  anime_url: string
  image_url: string | null
  seasonYear: number | null
  average_score: number | null
  format: string | null
  episode_count: number | null
  period_name: string | null
  dominantColor: string | null
}

export default function Component() {
  const [animeData, setAnimeData] = useState<Anime[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const imgRefs = useRef<HTMLImageElement[]>([])

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const response = await fetch('/api/animes/top')
        const data: Anime[] = await response.json()

        const formattedData = data.map((anime, index) => ({
          rank: index + 1,
          title: anime.title,
          image: anime.image_url || '',
          genres: Array.isArray(anime.genres) ? anime.genres.map(genre => genre.trim()) : [],
          rating: anime.average_score !== null ? anime.average_score : 0,
          users: Math.floor(Math.random() * 100000),
          type: anime.format ? (anime.format === "TV" ? "TV Show" : anime.format) : "Unknown",
          episodes: anime.episode_count || 0,
          season: anime.period_name || '', 
          year: anime.seasonYear || new Date().getFullYear(),
          status: anime.status || '',
          anime_url: anime.anime_url,
          image_url: anime.image_url || null, 
          seasonYear: anime.seasonYear, 
          average_score: anime.average_score, 
          format: anime.format, 
          episode_count: anime.episode_count, 
          period_name: anime.period_name, 
          dominantColor: null
        }))

        setAnimeData(formattedData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchAnimeData()
  }, [])

  const getDominantColor = async (imageUrl: string, index: number) => {
    try {
      const dominantColor = await getColorFromURL(imageUrl)
      setAnimeData(prevData => {
        const newData = [...prevData]
        newData[index].dominantColor = `rgb(${dominantColor.join(',')})`
        return newData
      })
    } catch (error) {
      console.error(`Error getting dominant color for ${animeData[index].title}:`, error)
    }
  }

  const getTextColor = (dominantColor: string) => {
    const rgb = dominantColor.match(/\d+/g)?.map(Number)
    if (!rgb) return 'white'

    const brightness = (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114)
    return brightness > 186 ? 'black' : 'white'
  }

  return (
    <div className="bg-gray-900 text-gray-100 p-4 sm:p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">TOP 100 ANIME</h1>
          <a href="#" className="text-sm text-gray-400 hover:text-white">View All</a>
        </header>
        <SkeletonTheme baseColor="#1F2937" highlightColor="rgba(192, 132, 252, 0.2)">
          {loading ? (
            <div className="space-y-4">
              {Array(10).fill(null).map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <Skeleton width={30} height={30} className="rounded-full hidden sm:block" />
                  <Skeleton height={60} width={60} className="rounded" />
                  <div className="flex-grow w-full sm:w-auto">
                    <Skeleton width="80%" height={20} className="mb-2" />
                    <Skeleton width="60%" height={15} />
                  </div>
                  <div className="flex justify-between w-full sm:w-auto sm:justify-end space-x-2 sm:space-x-4">
                    <Skeleton width={50} height={30} />
                    <Skeleton width={50} height={30} />
                    <Skeleton width={50} height={30} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {animeData.map((anime, index) => (
                <div key={anime.rank} className="bg-gray-800 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="text-xl sm:text-2xl font-bold text-gray-500 w-8 hidden sm:block">#{anime.rank}</div>
                  <img
                    ref={(el) => (imgRefs.current[index] = el as HTMLImageElement)}
                    src={anime.image}
                    alt={anime.title || 'Anime Image'}
                    className="w-full sm:w-16 h-40 sm:h-24 object-cover rounded"
                    onLoad={() => getDominantColor(anime.image, index)}
                    crossOrigin="anonymous"
                  />
                  <div className="flex-grow w-full sm:w-auto">
                    <h2
                      className="text-lg font-semibold transition-colors duration-300 text-white"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = anime.dominantColor || 'white'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'white'
                      }}
                    >
                      <Link to={anime.anime_url}>{anime.title}</Link>
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {anime.genres.map((genre) => (
                        <span
                          key={genre}
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            backgroundColor: anime.dominantColor || 'transparent',
                            color: anime.dominantColor ? getTextColor(anime.dominantColor) : 'white'
                          }}
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between w-full sm:w-auto sm:justify-end space-x-2 sm:space-x-4 text-sm sm:text-base">
                    <div className="text-center sm:text-right">
                      <div className="flex items-center justify-center sm:justify-end">
                        <StarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-1" />
                        <span className="font-bold">{anime.rating}%</span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400">{anime.users.toLocaleString()} users</div>
                    </div>
                    <div className="text-center sm:text-right">
                      <div>{anime.type}</div>
                      <div className="text-xs sm:text-sm text-gray-400">{anime.episodes} episodes</div>
                    </div>
                    <div className="text-center sm:text-right">
                      <div>{`${anime.season} ${anime.year}`}</div>
                      <div className="text-xs sm:text-sm text-gray-400">{anime.status}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SkeletonTheme>
      </div>
    </div>
  )
}