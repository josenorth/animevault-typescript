import { useQuery } from '@tanstack/react-query';
import { Episode } from '@/types/anime/Episode';

const API_URL = '/api/v1/animes/';

const fetchEpisodes = async (id: number): Promise<Episode[]> => {
  const response = await fetch(`${API_URL}${id}/episodes`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: Episode[] = await response.json();
  return data; // La respuesta es un array de episodios
};

export const useEpisodeById = (id: number) => {
  return useQuery({
    queryKey: ['anime-episodes', id],
    queryFn: () => fetchEpisodes(id),
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
    refetchOnWindowFocus: false,
  });
};
