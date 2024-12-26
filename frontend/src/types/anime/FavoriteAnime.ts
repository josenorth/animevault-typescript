// src/types/FavoriteAnime.ts
export interface FavoriteAnime {
    average_score: number | null; // Permitir null si no hay puntuación
    id: number;
    image_url: string;
    title_romaji: string;
  }
  