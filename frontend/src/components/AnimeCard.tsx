import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { Anime } from '@/types/anime/Anime';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Smile, Meh, Frown } from 'lucide-react'
import { cn } from "@/lib/utils"


interface AnimeCardProps {
    anime: Anime;
}

export function AnimeCard({ anime }: AnimeCardProps) {
    const [isLoading, setIsLoading] = React.useState(true)
    const [isHovered, setIsHovered] = React.useState(false)

    const formattedTitle = React.useMemo(() => {
        const title = anime.title_english || anime.title_romaji
        return title ? title.replace(/\s+/g, '-').toLowerCase() : ''
    }, [anime.title_english, anime.title_romaji])

    const studioNames = anime.studios
        ?.filter(studio => studio.isMain)
        .map(studio => studio.name)
        .join(', ') || '';

    const getSmileColor = (score: number) => {
        if (score >= 75) return "text-green-500"; // Excelente
        if (score >= 60) return "text-yellow-500"; // Promedio
        return "text-red-500"; // Baja calificación
    };

    // Función para determinar el ícono
    const getSmileIcon = (score: number) => {
        if (score >= 75) return <Smile className="h-5 w-5" />;
        if (score >= 60) return <Meh className="h-5 w-5" />;
        return <Frown className="h-5 w-5" />;
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={`/anime/${anime.id}/${formattedTitle}`}>
                <div className="relative block">
                    <div className="w-full h-[265px] relative font-poppins">
                        {isLoading && <Skeleton className="h-full w-full rounded-md" />}
                        <img
                            src={anime.coverImage || '/placeholder.svg'}
                            alt={anime.title_english || anime.title_romaji || 'Anime'}
                            className={cn(
                                "w-full h-[265px] object-cover rounded-md transition-opacity duration-500 font-poppins",
                                isLoading ? "opacity-0" : "opacity-100"
                            )}
                            onLoad={() => setIsLoading(false)}
                        />
                    </div>
                    {anime.status === "NOT_YET_RELEASED" && (
                        <Badge variant="destructive" className="absolute top-2 left-2">
                            Upcoming
                        </Badge>
                    )}
                    <div className="p-0 mt-2">
                        <p className="text-sm font-semibold text-[#8ba0b2]">
                            {anime.title_english || anime.title_romaji}
                        </p>
                    </div>
                </div>
            </Link>

            {/* Hover Card */}
            <Card
                className={cn(
                    "absolute top-0 left-full ml-4 z-10 transform bg-[#1a1f2e] border-0 p-4 w-[300px]",
                    isHovered
                        ? "opacity-100 translate-y-0 pointer-events-auto transition-all duration-300 ease-in-out"
                        : "opacity-0 translate-y-0 pointer-events-none"
                )}
            >
                <div
                    className={cn(
                        "absolute top-8 -left-2 transform -translate-y-1/2 w-0 h-0",
                        "border-t-[12px] border-t-transparent",
                        "border-b-[12px] border-b-transparent",
                        "border-r-[12px] border-r-[#1a1f2e]"
                    )}
                />
                <div className="flex items-center justify-between">
                    <span className="text-blue-400 text-sm">
                        {anime.status || "Airing"}
                    </span>
                    {anime.average_score > 0 && ( // Mostrar solo si el puntaje es mayor a 0
                        <div className="flex items-center gap-1">
                            <div
                                className={cn(
                                    "flex items-center",
                                    getSmileColor(anime.average_score)
                                )}
                            >
                                {getSmileIcon(anime.average_score)}
                            </div>
                            <span className="text-white">{anime.average_score}%</span>
                        </div>
                    )}
                </div>

                <div className="space-y-1">
                    <h3 className="text-blue-400 font-medium">
                        {studioNames}
                    </h3>
                    <p className="text-gray-400 text-sm">
                        {anime.format} • {anime.episode_count} episodes
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                    {anime.genres?.slice(0, 3).map((genre) => (
                        <Badge
                            key={genre.name}
                            variant="secondary"
                            className="bg-blue-500/10 text-blue-300 hover:bg-blue-500/20"
                        >
                            {genre.name.toLowerCase()}
                        </Badge>
                    ))}
                </div>
            </Card>
        </div>
    )
}


export default AnimeCard;