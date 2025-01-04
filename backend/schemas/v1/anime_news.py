from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AnimeNews(BaseModel):
    id: int
    anime_id: int
    mal_news_id: int
    url: str
    title: str
    date: datetime
    author_username: Optional[str]
    author_url: Optional[str]
    forum_url: Optional[str]
    image_url: Optional[str]
    comments: Optional[int]
    excerpt: Optional[str]

    class Config:
        from_attributes = True