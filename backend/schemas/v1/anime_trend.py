from pydantic import BaseModel
from typing import Optional

class AnimeTrend(BaseModel):
    id: int
    id_anime: int
    trending: int
    popularity: Optional[int]
    average_score: Optional[float]

class AnimeRanking(BaseModel):
    rank: int
    popularity_rank: int


    class Config:
        from_attributes = True