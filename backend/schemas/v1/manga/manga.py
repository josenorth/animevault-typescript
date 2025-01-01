from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum
from schemas.v1.shared.genre import GenreSchema

class MangaStatus(str, Enum):
    FINISHED = "FINISHED"
    RELEASING = "RELEASING"
    NOT_YET_RELEASED = "NOT_YET_RELEASED"
    CANCELLED = "CANCELLED"
    HIATUS = "HIATUS"

class MangaSource(str, Enum):
    ORIGINAL = "ORIGINAL"
    MANGA = "MANGA"
    LIGHT_NOVEL = "LIGHT_NOVEL"
    VISUAL_NOVEL = "VISUAL_NOVEL"
    VIDEO_GAME = "VIDEO_GAME"
    OTHER = "OTHER"
    NOVEL = "NOVEL"
    DOUJINSHI = "DOUJINSHI"
    ANIME = "ANIME"
    WEB_NOVEL = "WEB_NOVEL"
    LIVE_ACTION = "LIVE_ACTION"
    GAME = "GAME"
    COMIC = "COMIC"
    MULTIMEDIA_PROJECT = "MULTIMEDIA_PROJECT"
    PICTURE_BOOK = "PICTURE_BOOK"

class MangaBase(BaseModel):
    title_romaji: Optional[str]
    title_english: Optional[str]
    title_native: Optional[str]
    description: Optional[str]
    status: Optional[MangaStatus]
    format: Optional[str]
    countryOfOrigin: Optional[str]
    source: Optional[MangaSource]
    averageScore: Optional[int]
    chapters: Optional[int]
    volumes: Optional[int]
    startDate: Optional[int]
    endDate: Optional[int]
    coverImage: Optional[str]
    bannerImage: Optional[str]
    isAdult: Optional[int] = 0


class MangaCreate(MangaBase):
    pass

class Manga(MangaBase):
    id: int
    genres: Optional[List[GenreSchema]] = []
    
    class Config:
        from_attributes = True
