from pydantic import BaseModel
from typing import List
from schemas.v1.anime_trailer import AnimeTrailer
from schemas.v1.external_link import ExternalLink

class AnimeDetails(BaseModel):
    trailers: List[AnimeTrailer]
    external_links: List[ExternalLink]

    class Config:
        from_attributes = True