from pydantic import BaseModel
from typing import Optional

class ExternalSite(BaseModel):
    id: int
    name: str
    color: Optional[str]
    icon: Optional[str]

    class Config:
        from_attributes = True