from pydantic import BaseModel
from typing import Optional

class MangaTrailerBase(BaseModel):
    manga_id: int
    trailer_id: str
    site: str
    thumbnail: Optional[str]

class MangaTrailerCreate(MangaTrailerBase):
    pass

class MangaTrailer(MangaTrailerBase):
    id: int

    class Config:
        from_attributes = True
