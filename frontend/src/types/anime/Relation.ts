export interface Relation {
    id: number
    relation_type: string
    related_anime?: RelatedAnime
    related_manga?: RelatedManga
  }
  
  export interface RelatedAnime {
    id: number
    title_romaji: string
    title_english: string
    cover_image: string
  }
  
  export interface RelatedManga {
    id: number
    title_romaji: string
    title_english: string
    cover_image: string
  }