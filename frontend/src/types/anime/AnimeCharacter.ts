import { Staff } from '@/types/staff/Staff';

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
