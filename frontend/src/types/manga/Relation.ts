export interface RelatedMedia {
    id: number;
    relation_type: string;
    related_anime?: {
      id: number;
      title_romaji: string;
      title_english: string;
      cover_image: string;
    };
    related_manga?: {
      id: number;
      title_romaji: string;
      title_english: string;
      cover_image: string;
    };
  }