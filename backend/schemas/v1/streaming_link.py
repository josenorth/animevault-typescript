from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class StreamingLinkBase(BaseModel):
    title: str
    thumbnail: str
    url: str
    site: str

class StreamingLinkCreate(StreamingLinkBase):
    anime_id: int

class StreamingLink(StreamingLinkBase):
    id: int

    class Config:
        from_attributes = True