import { useQuery } from '@tanstack/react-query'
import { Details } from '@/types/anime/AnimeDetails'

const API_URL = '/api/v1/animes'

// Ajustar el fetch para que devuelva un solo objeto Details
const fetchAnimeDetails = async (id: number): Promise<Details> => {
  const response = await fetch(`${API_URL}/${id}/details`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data: Details = await response.json() // Aquí cambiamos Details[] a Details
  return data
}

// Hook que utiliza la estructura de Details
export const useAnimeDetails = (id: number) => {
  return useQuery(['animeDetails', id], () => fetchAnimeDetails(id), {
    staleTime: 1000 * 60 * 5, // 5 minutos
    cacheTime: 1000 * 60 * 10, // 10 minutos
    refetchOnWindowFocus: false,
  })
}
