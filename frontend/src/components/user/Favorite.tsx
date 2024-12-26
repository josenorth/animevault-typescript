import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, StarHalf } from "lucide-react";
import UserHeader from './UserHeader';
import { useAuth } from '../../context/AuthContext';
import { useUserContext } from '../../context/UserContext'; // Importar el contexto

export default function AnimePanel() {
  const { userData, /*setFavorites*/ } = useUserContext(); // Obtener userData y setFavorites del contexto
  const { auth } = useAuth();

  const userDataInfo = auth && auth.username && auth.avatar_url && auth.banner_url
    ? {
        username: auth.username,
        avatar_url: auth.avatar_url,
        banner_url: auth.banner_url,
      }
    : null;

  // Acceder a los favoritos desde userData
  const favorites = userData?.favorites || []; // Si userData es null, usa un array vacío

  const renderStars = (rating: number) => {
    // Escala la puntuación de 0-100 a 0-5
    const scaledRating = (rating / 20); // Divide por 20 para convertir 100 a 5
    const fullStars = Math.floor(scaledRating);
    const hasHalfStar = scaledRating % 1 >= 0.5;
  
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
      </div>
    );
  };
  

  return (
    <div className="custom-container mx-auto py-8">
      <div className='rounded-lg mb-6 overflow-hidden'>
        <UserHeader userData={userDataInfo} loading={!auth} />
      </div>
      <h1 className="text-3xl text-white font-bold mb-6 text-center">My Favorite Animes</h1>
      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((anime) => (
            <Card key={anime.id} className="border-none overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <img src={anime.image_url} alt={anime.title_romaji} className="w-full h-48 object-cover" />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold mb-2">{anime.title_romaji}</CardTitle>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{anime.average_score ? anime.average_score.toFixed(1) : 'N/A'}</Badge>
                  {renderStars(anime.average_score || 0)} {/* Usar 0 si no hay puntaje */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
