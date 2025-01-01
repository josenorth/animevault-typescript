export interface Anime {
  id: number
  title_romaji: string
  title_english: string
  native: string
  description: string
  coverImage: string
  bannerImage: string
  cover_color_hex: string
  studio_id: number
  episode_count: number
  episode_duration: number
  average_score: number
  popularity: number
  start_date: string
  end_date: string
  seasonYear: number
  format: string
  status: string
  source: string
  season: string
  genres: Genre[]
  studios: Studio[]
  characters?: Character[]
  externalLinks: ExternalLink[]
  trailer: {
    youtubeId: string
  }
  relations: RelatedMedia[]
}

export interface Genre {
  id: number
  name: string
}

export interface Studio {
  id: number
  name: string
  isMain: boolean
}

export interface AnimeCharacter {
  characters: Character[]
}

export interface Character {
  id: number
  name_full: string
  name_native: string
  age?: string
  description: string
  dateOfBirth?: string
  image: string
  role: string
  languageV2: string
  staff: Staff[]
}

export interface Staff {
  id: number;
  name_full: string;
  name_native: string;
  languageV2: string;
  image: string;
  description: string;
  primaryOccupations: string[];
  gender: string;
  dateOfBirth?: string;
  dateOfDeath: string;
  age?: number;
  yearsActive: number[];
  homeTown: string;
  created_at: string;
  updated_at: string;
  notableWorks?: {
    title: string;
    role: string;
  }[];
}

export interface ExternalLink {
  id: string;
  url: string;
  site: string;
}

export interface RelatedMedia {
  id: number
  title: string
  image: string
  relationType: string
}

