import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { Anime } from '@/types/anime/Anime';

interface AnimeCardProps {
    anime: Anime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
    const [hovered, setHovered] = useState(false);
    const [loadingImage, setLoadingImage] = useState(true);

    const formatTitle = (title?: string) => title ? title.replace(/\s+/g, '-').toLowerCase() : '';

    const formattedTitle = formatTitle(anime.title_english || anime.title_romaji);

    const genres = Array.isArray(anime.genres)
        ? anime.genres.map(genre => genre.name)
        : [];

    return (
        <div className="relative block"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Link to={`/anime/${anime.id}/${formattedTitle}`} className="relative block">
                <div className="skeleton-card w-full h-[265px] relative">
                    {loadingImage && <Skeleton height="100%" className="object-cover rounded-md" />}
                    <img
                        src={anime.coverImage || '/placeholder.svg'}
                        alt={anime.title_english || anime.title_romaji || 'Anime'}
                        className={`w-full h-[265px] object-cover rounded-md transition-opacity duration-500 ${loadingImage ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => setLoadingImage(false)}
                    />
                </div>
                {anime.status === "NOT_YET_RELEASED" && (
                    <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-1 rounded">
                        Upcoming
                    </div>
                )}
                <div className="p-0 mt-2">
                    <p className="text-sm font-semibold text-[#8ba0b2]">{anime.title_english || anime.title_romaji}</p>
                </div>
            </Link>

            {/* AnimeCardInfo con animación */}
            <div
                className={`absolute top-0 left-full ml-5 w-max z-10 transform transition-all duration-300 ease-in-out 
                ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}`}
            >
                <div className="bg-white p-4 rounded shadow-lg">
                    <p><strong>Year:</strong> {anime.seasonYear || "TBA"}</p>
                    <p><strong>Score:</strong> {anime.average_score}</p>
                    <p><strong>Format:</strong> {anime.format}</p>
                    <p><strong>Genres:</strong> {genres.join(', ')}</p>
                </div>
            </div>
        </div>
    );
};

export default AnimeCard;