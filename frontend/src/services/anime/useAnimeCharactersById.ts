import { useQuery } from '@tanstack/react-query'
import { Character } from '@/types/anime/AnimeCharacter'

const API_URL = '/api/v1/animes'

// Ajustar el fetch para que devuelva la estructura esperada
const fetchAnimeCharacters = async (id: number): Promise<Character[]> => {
  const response = await fetch(`${API_URL}/${id}/characters`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data: { characters: Character[] } = await response.json()
  console.log(data)
  return data.characters
}

// Hook que utiliza la estructura de Character[]
export const useAnimeCharacters = (id: number) => {
  return useQuery( {
    queryKey: ['anime-characters', id],
    queryFn: () => fetchAnimeCharacters(id),
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
    refetchOnWindowFocus: false,
  })
}

