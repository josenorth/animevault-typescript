'use client'

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import * as React from "react";

interface HoverCardProps {
  isVisible: boolean;
  showLeft: boolean;
  anime?: {
    average_score?: number;
    studios?: { name: string, isMain: boolean }[];
    format?: string;
    episode_count?: number;
    genres?: { name: string }[];
  };
  manga?: {
    averageScore?: number;
    format?: string;
    chapters?: number;
    genres?: { name: string }[];
    startDate?: number;
    endDate?: number;
  };
}

export const HoverCard: React.FC<HoverCardProps> = ({ isVisible, showLeft, anime, manga }) => {
  const renderMangaInfo = () => {
    if (!manga) return null;

    const startDate = manga.startDate ? Math.floor(manga.startDate / 10000) : null;
    const endDate = manga.endDate ? Math.floor(manga.endDate / 10000) : null;
    const publishingInfo = startDate && !endDate ? `Publishing since ${startDate}` : `${startDate}-${endDate}`;

    return (
      <div className="space-y-1">
        <div className="text-xs text-[#9599b7]/80 flex items-center gap-2">
          <span>{manga.format}</span>
          <span>•</span>
          <span>{manga.chapters} chapters</span>
        </div>
        <div className="text-[#9599b7] text-sm">
          {publishingInfo}
        </div>
      </div>
    );
  };

  const renderAnimeInfo = () => {
    if (!anime) return null;

    return (
      <div className="space-y-1">
        <div className="text-[#9599b7] text-sm">
          {anime.studios
            ?.filter((studio) => studio.isMain)
            .map((studio) => studio.name)
            .join(", ")}
        </div>
        <div className="text-xs text-[#9599b7]/80 flex items-center gap-2">
          <span>{anime.format || "ONA"}</span>
          <span>•</span>
          <span>{anime.episode_count || 25} episodes</span>
        </div>
      </div>
    );
  };

  const renderGenres = (genres: { name: string }[] | undefined) => {
    if (!genres) return null;

    return (
      <div className="flex flex-wrap gap-2">
        {genres.slice(0, 3).map((genre) => (
          <Badge
            key={genre.name}
            variant="secondary"
            className="bg-[#3DB4F2]/10 text-[#84CC16] hover:bg-[#3DB4F2]/20 px-3 py-0.5 rounded-full text-xs font-medium"
          >
            {genre.name.toLowerCase()}
          </Badge>
        ))}
      </div>
    );
  };

  return (
    <Card
      className={cn(
        "absolute top-0 z-10 w-[280px] transform transition-all duration-300 bg-[#151821]/95 border-0 backdrop-blur-sm",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none",
        showLeft ? "right-full mr-4" : "left-full ml-4"
      )}
    >
      <div className="p-4 space-y-4">
        {/* Score */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-[#1C212E] px-2 py-1 rounded-md">
            <CircleIcon className="h-3 w-3 fill-[#84CC16] text-[#84CC16]" />
            <span className="text-sm font-medium text-[#9599b7]">{anime?.average_score || manga?.averageScore}%</span>
          </div>
        </div>

        {/* Info */}
        {anime ? renderAnimeInfo() : renderMangaInfo()}

        {/* Genres */}
        {renderGenres(anime?.genres || manga?.genres)}
      </div>
    </Card>
  );
};