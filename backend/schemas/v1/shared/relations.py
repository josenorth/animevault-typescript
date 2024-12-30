from pydantic import BaseModel
from typing import Optional

# Esquema para información de un anime relacionado
class RelatedAnimeSchema(BaseModel):
    id: Optional[int]
    title_romaji: Optional[str] = None
    title_english: Optional[str] = None
    cover_image: Optional[str] = None

# Esquema para información de un manga relacionado
class RelatedMangaSchema(BaseModel):
    id: Optional[int]
    title_romaji: Optional[str] = None
    title_english: Optional[str] = None
    cover_image: Optional[str] = None

# Esquema principal para la relación
class RelationSchema(BaseModel):
    id: int
    relation_type: str
    related_anime: Optional[RelatedAnimeSchema] = None
    related_manga: Optional[RelatedMangaSchema] = None

    class Config:
        from_attributes = True
