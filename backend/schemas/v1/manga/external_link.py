from pydantic import BaseModel

class ExternalLinkBase(BaseModel):
    manga_id: int
    site_id: int
    url: str

class ExternalLinkCreate(ExternalLinkBase):
    pass

class ExternalLink(ExternalLinkBase):
    id: int

    class Config:
        from_attributes = True
