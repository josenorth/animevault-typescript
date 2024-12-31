from pydantic import BaseModel
from typing import Optional
from schemas.v1.shared.external_site import ExternalSite

class ExternalLink(BaseModel):
    id: int
    anime_id: int
    site_id: int
    url: str
    external_site: ExternalSite  # Asegúrate de que este campo esté presente y correcto
    
    class Config:
        from_attributes = True