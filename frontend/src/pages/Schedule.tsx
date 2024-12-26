import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Plus } from 'lucide-react';
import { useNextEpisodes } from '../services/anime/AiringSchedule';
import { type AiringSchedule } from '../types/anime/AiringSchedule';
import '../css/scrollbar.css';

export default function AnimeSeason() {
  const { data, isLoading, isError } = useNextEpisodes();
  const [currentSeason] = useState("FALL");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data...</div>;

  // Agrupar animes por formato
  const groupedByFormat = data?.next_episodes.reduce((acc, anime) => {
    if (!acc[anime.format]) {
      acc[anime.format] = [];
    }
    acc[anime.format].push(anime);
    return acc;
  }, {} as Record<string, AiringSchedule[]>);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-[#C084FC] mt-4">Anime {currentSeason} Season</h1>

      {/* Renderizar secciones por formato */}
      {groupedByFormat && Object.entries(groupedByFormat).map(([format, animes]) => (
        <div key={format} className="mb-8">
          <h2 className="text-2xl font-bold text-[#C084FC] mb-4">{format}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {animes.map((anime) => (
              <Card key={anime.anime_id} className="overflow-hidden border-[#C084FC]">
                <CardHeader className="p-0">
                  <div className="relative h-48">
                    <img src={anime.image_url} alt={anime.title_english} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <CardTitle className="text-white text-xl">{anime.title_english || anime.title_romaji}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      Ep {anime.episode} airing in
                    </Badge>
                    <span className="text-sm font-semibold">{anime.next_airing_time}</span>
                  </div>
                  <CardDescription 
                    className="text-sm h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 "
                    dangerouslySetInnerHTML={{ __html: anime.description }}
                  />
                </CardContent>
                <CardFooter className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800">
                  <div className="flex space-x-2">
                    <Badge variant="secondary" className="capitalize">
                      {typeof anime.genres === 'string' ? anime.genres.split(',').join(', ') : anime.genres?.join(', ')}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className={`text-lg font-semibold ${anime.average_score >= 70 ? 'text-green-500' : 'text-yellow-500'}`}>
                        {anime.average_score}%
                      </span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Heart className="h-5 w-5 text-red-500" />
                    </Button>
                    <span className="text-sm font-semibold">#{anime.popularity}</span>
                    <Button variant="ghost" size="icon">
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
