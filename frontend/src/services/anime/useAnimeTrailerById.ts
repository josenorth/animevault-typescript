import { useQuery } from '@tanstack/react-query';
import { Trailer } from '@/types/anime/Trailer';

const API_URL = '/api/v1/animes/';

const fetchTrailer = async (id: number): Promise<Trailer> => {
  const response = await fetch(`${API_URL}${id}/trailer`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: Trailer = await response.json();
  return data; // Ya es un objeto, no es necesario procesarlo como array
};

export const useTrailerById = (id: number) => {
  return useQuery({
    queryKey: ['anime-trailer', id],
    queryFn: () => fetchTrailer(id),
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
    refetchOnWindowFocus: false,
  });
};
