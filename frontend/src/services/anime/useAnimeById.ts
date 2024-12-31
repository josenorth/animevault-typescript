import { useQuery } from '@tanstack/react-query'
import { Anime } from '../../types/anime/Anime'

const API_URL = '/api/v1/animes/'

const fetchAnimeById = async (id: number): Promise<Anime> => {
  const response = await fetch(`${API_URL}${id}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data: Anime = await response.json()
  return data
}

export const useAnimeById = (id: number) => {
  return useQuery( {
    queryKey: ['anime', id],
    queryFn: () => fetchAnimeById(id),
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
    refetchOnWindowFocus: false,
  })
}