import { useQuery } from '@tanstack/react-query';
import { Relation } from '@/types/anime/Relation';

const API_URL = '/api/v1/animes/';

const fetchRelation = async (id: number): Promise<Relation[]> => {
  const response = await fetch(`${API_URL}${id}/relations`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: Relation[] = await response.json();
  return data; // La respuesta es un array de episodios
};

export const useRelationById = (id: number) => {
  return useQuery({
    queryKey: ['anime-relations', id],
    queryFn: () => fetchRelation(id),
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
    refetchOnWindowFocus: false,
  });
};
