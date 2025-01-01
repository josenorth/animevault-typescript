from pydantic import BaseModel
from typing import Optional

class MangaCharacterBase(BaseModel):
    manga_id: int
    character_id: int
    role: Optional[str]

class MangaCharacterCreate(MangaCharacterBase):
    pass

class MangaCharacter(MangaCharacterBase):
    class Config:
        from_attributes = True
