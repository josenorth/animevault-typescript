from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MangaTrendBase(BaseModel):
    manga_id: int
    average_score: Optional[int]
    popularity: Optional[int]
    trending: Optional[int]

class MangaTrendCreate(MangaTrendBase):
    pass

class MangaTrend(MangaTrendBase):
    id: int
    created_at: Optional[datetime]
    update_at: Optional[datetime]

    class Config:
        from_attributes = True
