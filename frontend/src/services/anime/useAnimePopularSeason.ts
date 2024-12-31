import { useQuery } from '@tanstack/react-query'
import { Anime } from '../../types/anime/Anime'

const API_URL = '/api/v1/animes/popular-this-season'

const fetchAnimePopularSeason = async (): Promise<Anime[]> => {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data: Anime[] = await response.json()
  console.log(data)
  return data
}

export const useAnimePopularSeason = () => {
  return useQuery({
    queryKey: ['popular-season'],
    queryFn: fetchAnimePopularSeason,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
    refetchOnWindowFocus: false,
  })
}