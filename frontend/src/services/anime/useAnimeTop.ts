import { useQuery } from '@tanstack/react-query'
import { Anime } from '../../types/anime/Anime'

const API_URL = '/api/v1/animes/top-animes'

const fetchAnimeTop = async (): Promise<Anime[]> => {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data: Anime[] = await response.json()
  console.log(data)
  return data
}

export const useAnimeTop = () => {
  return useQuery(['top-animes'], fetchAnimeTop, {
    staleTime: 1000 * 60 * 5, // 5 minutos
    cacheTime: 1000 * 60 * 10, // 10 minutos
    refetchOnWindowFocus: false,
  })
}