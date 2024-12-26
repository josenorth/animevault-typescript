import { Genre } from './Genre'
import { Studio } from './Studio'

export interface Anime {
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
  id: number
  genres: Genre[]
  studios: Studio[]
}