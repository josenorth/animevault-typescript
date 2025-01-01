// types/anime/AiringSchedule.ts
export interface AiringSchedule {
    anime_id: number;
    episode: number;
    title_english: string;
    title_romaji: string;
    image_url: string;
    next_airing_time: string;
    average_score: number;
    popularity: number;
    trending: number;
    description: string;
    genres: string[];
    format: string;
  }
  
  export interface NextEpisodesResponse {
    next_episodes: AiringSchedule[];
  }
  