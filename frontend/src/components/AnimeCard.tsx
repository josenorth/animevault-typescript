'use client'

import Image from "next/image";
import Link from "next/link";
import { Circle } from "lucide-react";
import { Anime } from "@/types/anime/Anime";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { HoverCard } from "@/components/ui/hovercard";

interface AnimeCardProps {
  anime: Anime;
  index: number;
}

export function AnimeCard({ anime, index }: AnimeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showLeft, setShowLeft] = useState(false);

  const formattedTitle = useMemo(() => {
    const title = anime.title_english || anime.title_romaji;
    return title ? title.replace(/\s+/g, "-").toLowerCase() : "";
  }, [anime.title_english, anime.title_romaji]);

  useEffect(() => {
    const handleResize = () => {
      const cardElement = document.getElementById(`anime-card-${index}`);
      if (cardElement) {
        const rect = cardElement.getBoundingClientRect();
        setShowLeft(rect.right + 280 > window.innerWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [index]);

  return (
    <motion.div
      id={`anime-card-${index}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative block w-[185px]" // Añadido ancho fijo
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/anime/${anime.id}/${formattedTitle}`}>
      <motion.div className="relative overflow-hidden rounded-lg h-[265px]">
          <Image
            src={anime.coverImage}
            alt={anime.title_romaji}
            fill
            sizes="185px"
            />
          <div className="absolute inset-0 transition-opacity group-hover:opacity-0" />
        </motion.div>
        <div className="relative bottom-0 left-0 right-0 p-0 pt-2">
          <div className="flex items-center gap-2">
            {anime.status === "Airing" && (
              <Circle className="h-2 w-2 fill-[#84CC16] text-[#84CC16]" />
            )}
            <h3 className="font-poppins font-bold text-sm text-[#9599b7] line-clamp-2">
              {anime.title_romaji}
            </h3>
          </div>
        </div>
      </Link>

      {/* Hover Card */}
      <HoverCard isVisible={isHovered} showLeft={showLeft} anime={anime} />
    </motion.div>
  );
}
