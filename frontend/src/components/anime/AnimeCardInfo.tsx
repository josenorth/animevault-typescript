import { SmileIcon } from "lucide-react";

interface AnimeCardInfoProps {
    season?: string; // Puede ser opcional
    seasonYear?: number | string;
    average_score?: number; // Puede ser opcional
    studio_name?: string; // Puede ser opcional
    format?: string; // Puede ser opcional
    genres: string[]; // Debe ser un array de strings
}

const AnimeCardInfo: React.FC<AnimeCardInfoProps> = ({ 
    season, 
    seasonYear, 
    average_score, 
    studio_name, 
    format, 
    genres 
}) => {
    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg max-w-xs">
            <div className="flex justify-between items-start mb-2">
                <div>
                    {/* Mostrar la temporada y el año, o "TBA" si faltan */}
                    <h2 className="text-lg font-semibold">
                        {season && seasonYear ? `${season} ${seasonYear}` : "TBA"}
                    </h2>
                    <div className="flex items-center">
                        <SmileIcon className="w-4 h-4 text-green-400 mr-1" />
                        <span className="text-green-400">{average_score}</span>
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <p className="text-gray-400 font-semibold">{studio_name}</p>
                <p className="text-xs text-gray-400">{format}</p>
            </div>
            <div className="flex gap-2">
                {Array.isArray(genres) && genres.slice(0, 3).map((genre) => (
                    <span key={genre} className="bg-yellow-600 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {genre}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default AnimeCardInfo;
