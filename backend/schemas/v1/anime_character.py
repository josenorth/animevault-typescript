from typing import List, Optional
from pydantic import BaseModel
from datetime import date
from schemas.v1.staff import StaffSchema

class AnimeCharacterSchema(BaseModel):
    id: int
    name_full: str
    name_native: Optional[str]

    class Config:
        from_attributes = True

class CharacterWithStaff(BaseModel):
    id: int
    name_full: str
    name_native: Optional[str]
    age: Optional[str]
    description: Optional[str]
    dateOfBirth: Optional[date]
    image: Optional[str]
    role: Optional[str]  # Añadir role
    languageV2: Optional[str]  # Añadir languageV2
    staff: List[StaffSchema] = []

    class Config:
        from_attributes = True

class AnimeCharacters(BaseModel):
    characters: List[CharacterWithStaff] = []

    class Config:
        from_attributes = True

class StaffWorkSchema(BaseModel):
    character_name: str
    character_image: str
    anime_cover: str
    anime_romaji: str
    anime_english: Optional[str] = None
    seasonYear: Optional[int] = None
    role: Optional[str] = None

    class Config:
        from_attributes = True