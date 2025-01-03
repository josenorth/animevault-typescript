'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Circle } from 'lucide-react'
import { Anime } from '@/types/anime/Anime'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CircleIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import * as React from "react"
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';

interface AnimeCardProps {
  anime: Anime
  index: number
}

export function AnimeCard({ anime, index }: AnimeCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [showLeft, setShowLeft] = useState(false);

  const formattedTitle = React.useMemo(() => {
    const title = anime.title_english || anime.title_romaji;
    return title ? title.replace(/\s+/g, '-').toLowerCase() : '';
  }, [anime.title_english, anime.title_romaji]);

  useEffect(() => {
    const handleResize = () => {
      const cardElement = document.getElementById(`anime-card-${index}`);
      if (cardElement) {
        const rect = cardElement.getBoundingClientRect();
        setShowLeft(rect.right + 280 > window.innerWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [index]);

  return (
    <motion.div
      id={`anime-card-${index}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/anime/${anime.id}/${formattedTitle}`}>
        <motion.div className="aspect-[3/4] relative overflow-hidden rounded-lg">
          <Image
            src={anime.coverImage}
            alt={anime.title_romaji}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 300px"
          />
          <div className="absolute inset-0 transition-opacity group-hover:opacity-0" />
        </motion.div>
        <div className="relative bottom-0 left-0 right-0 p-0 pt-2">
          <div className="flex items-center gap-2">
            {anime.status === 'Airing' && (
              <Circle className="h-2 w-2 fill-[#84CC16] text-[#84CC16]" />
            )}
            <h3 className="font-poppins font-bold text-sm text-[#9599b7] line-clamp-2">
              {anime.title_romaji}
            </h3>
          </div>
        </div>
      </Link>

      {/* Hover Card */}
      <Card
        className={cn(
          "absolute top-0 z-10 w-[280px] transform transition-all duration-300 bg-[#151821]/95 border-0 backdrop-blur-sm",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none",
          showLeft ? "right-full mr-4" : "left-full ml-4"
        )}
      >
        <div className="p-4 space-y-4">
          {/* Episode Info & Score */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-[#1C212E] px-2 py-1 rounded-md">
              <CircleIcon className="h-3 w-3 fill-[#84CC16] text-[#84CC16]" />
              <span className="text-sm font-medium text-[#9599b7]">{anime.average_score}%</span>
            </div>
          </div>

          {/* Anime Info */}
          <div className="space-y-1">
            <div className="text-[#9599b7] text-sm">
              {anime.studios?.map((studio) => studio.name).join(', ')}
            </div>
            
            <div className="text-xs text-[#9599b7]/80 flex items-center gap-2">
              <span>{anime.format || 'ONA'}</span>
              <span>•</span>
              <span>{anime.episode_count || 25} episodes</span>
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {anime.genres?.slice(0, 3).map((genre) => (
              <Badge
                key={genre.name}
                variant="secondary"
                className="bg-[#3DB4F2]/10 text-[#3DB4F2] hover:bg-[#3DB4F2]/20 px-3 py-0.5 rounded-full text-xs font-medium"
              >
                {genre.name.toLowerCase()}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}