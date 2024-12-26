import { useQuery } from '@tanstack/react-query';
import { NextEpisodesResponse } from '../../types/anime/AiringSchedule'; // Importa el nuevo tipo

const API_URL = '/api/release/next_episodes';
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Función para hacer la solicitud a la API
const fetchNextEpisodes = async (): Promise<NextEpisodesResponse> => {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: { 'Timezone': timezone }
      });
      
  if (!response.ok) {
    throw new Error('Error al obtener los próximos episodios');
  }
  const data = await response.json();
  return data;  // Devolvemos el objeto completo con next_episodes
};

export const useNextEpisodes = () => {
  return useQuery<NextEpisodesResponse, Error>({
    queryKey: ['next_episodes'],  // Identificador único para la consulta
    queryFn: fetchNextEpisodes,   // Función que realiza la solicitud    // Opcional: Evitar volver a cargar la consulta durante   // Opcional: No volver a cargar cuando se enfoque la ventana
  });
};
