from pydantic import BaseModel
from typing import Optional
from schemas.v1.external_site import ExternalSite

class ExternalLink(BaseModel):
    id: int
    anime_id: int
    site_id: int
    url: str
    type: Optional[str]
    language: Optional[str]
    notes: Optional[str]
    isDisabled: bool
    site: ExternalSite

    class Config:
        from_attributes = True