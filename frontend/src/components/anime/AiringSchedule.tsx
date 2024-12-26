import React from 'react';
import { useNextEpisodes } from '../../services/anime/AiringSchedule'; // Ajusta la ruta si es necesario
import { type AiringSchedule } from '../../types/anime/AiringSchedule'; // Cambiar aquí para importar solo como tipo
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'

const customLoader = ({ src }: { src: string }) => {
    return src;
};

const AiringScheduleComponent: React.FC = () => {
  // Usamos el hook para obtener los episodios próximos
  const { data, isLoading, isError, error } = useNextEpisodes();

  // Si está cargando, mostrar un mensaje
  if (isLoading) return <div>Loading...</div>;

  // Si hay un error, mostrar el mensaje de error
  if (isError) return <div>Error: {(error as Error).message}</div>;

  // Acceder a 'next_episodes' dentro de 'data'
  const episodes = data?.next_episodes;

  // Hacer un slice para obtener solo los primeros 5 episodios
  const top5Episodes = episodes?.slice(0, 6);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-[#C084FC]">Latest Releases</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {top5Episodes?.map((anime: AiringSchedule) => (
          <Card
            key={anime.anime_id}
            className="bg-[#111827] text-white border-2 border-transparent hover:border-[#C084FC] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[0px_-5px_15px_#C084FC]"
          >
            <CardHeader className="p-0">
              <Image
                src={anime.image_url} // Usamos el image_url
                alt={anime.title_english || anime.title_romaji}
                width={300}
                height={400}
                className="w-full h-[250px] object-cover rounded-t-lg"
                loader={customLoader} // Utiliza un loader adecuado según tu configuración
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-sm mb-2">
                {anime.title_english || anime.title_romaji}
              </CardTitle>
              <Badge className="bg-[#C084FC] text-white hover:bg-[#C084FC]">
                Episode {anime.episode}
              </Badge>
              <div className="text-xs mt-2">
                {/* Usamos la función de formateo para mostrar la hora de emisión */}
                <p>{anime.next_airing_time}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AiringScheduleComponent;
