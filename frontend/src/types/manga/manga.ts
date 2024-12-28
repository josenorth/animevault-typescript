import { Genre } from '../shared/Genre'

export interface Manga {
    title_romaji: string
    title_english: string
    title_native: string
    description: string
    status: string
    format: string
    countryOfOrigin: string
    source: string
    averageScore: number
    chapters: number
    volumes: number
    startDate: number
    endDate: number
    coverImage: string
    bannerImage: string
    isAdult: number
    id: number
    genres: Genre[]
  }