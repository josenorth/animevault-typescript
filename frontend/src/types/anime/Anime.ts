export interface Genre {
  id: number;
  name: string;
}

export interface Studio {
  id: number;
  name: string;
  isMain: boolean;
}

export interface Anime {
  id: number;
  title_romaji: string;
  title_english: string | null;
  native: string;
  description: string;
  coverImage: string;
  bannerImage: string;
  episode_count: number;
  episode_duration: number;
  average_score: number;
  popularity: number;
  season_id: number;
  start_date: string;
  end_date: string;
  seasonYear: number;
  format: string;
  status: string;
  source: string;
  season: string;
  genres: Genre[];
  studios: Studio[];
}