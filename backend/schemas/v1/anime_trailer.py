from pydantic import BaseModel
from typing import Optional

class AnimeTrailer(BaseModel):
    id: int
    anime_id: int
    trailer_id: str
    site: str
    thumbnail: Optional[str]

    class Config:
        from_attributes = True