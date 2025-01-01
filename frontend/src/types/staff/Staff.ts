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