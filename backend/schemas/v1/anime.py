from pydantic import BaseModel
from typing import List, Optional
from datetime import date
from schemas.v1.shared.genre import GenreSchema  # Importa el schema de Genre
from schemas.v1.studio import StudioSchema  # Importa el schema de Studio
from schemas.v1.season import SeasonSchema  # Importa el schema de Season

class AnimeBase(BaseModel):
    id: int
    title_romaji: str
    title_english: Optional[str] = None
    native: Optional[str] = None
    description: Optional[str] = None
    coverImage: Optional[str] = None
    bannerImage: Optional[str] = None
    episode_count: Optional[int] = None
    episode_duration: Optional[int] = None
    average_score: Optional[float] = 0
    popularity: Optional[int] = 0
    season_id: Optional[int] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    seasonYear: Optional[int] = None
    format: Optional[str] = None
    status: Optional[str] = None
    source: Optional[str] = None

class AnimeCreate(AnimeBase):
    pass

class AnimeUpdate(AnimeBase):
    pass

class Anime(AnimeBase):
    season: Optional[str] 
    genres: List[GenreSchema]
    studios: List[StudioSchema]


    class Config:
        from_attributes = True