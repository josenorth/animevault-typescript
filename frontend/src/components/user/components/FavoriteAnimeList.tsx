import React from 'react';
import { Star } from 'lucide-react';

interface FavoriteAnime {
  id: number;
  title_romaji: string; // Cambia este nombre para que coincida con la respuesta de la API
  average_score: number | null;
  image_url: string;
}

interface FavoriteAnimeListProps {
  favorites: FavoriteAnime[];
}

const FavoriteAnimeList: React.FC<FavoriteAnimeListProps> = ({ favorites }) => {
  return (
    <section>
      <h2 className="text-2xl text-[#C084FC] font-semibold mb-4">Favorite Anime</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {favorites.map((anime) => (
          <div key={anime.id} className="bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={anime.image_url || '/path-to-placeholder.jpg'} // Imagen de relleno si imageUrl está vacío
              alt={`Favorite anime ${anime.title_romaji}`}
              className="w-full h-40 object-cover"
            />
            <div className="p-2">
              <h3 className="font-semibold text-sm">{anime.title_romaji}</h3>
              <div className="flex items-center text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-xs ml-1">{anime.average_score || 'N/A'}</span> {/* Muestra 'N/A' si no hay puntaje */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FavoriteAnimeList;
