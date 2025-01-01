from pydantic import BaseModel
from typing import Optional

class ExternalSite(BaseModel):
    id: int
    name: str 
    color: Optional[str]
    icon: Optional[str] 
    type: Optional[str]
    language: Optional[str]
    isDisabled: bool 
    
    class Config:
        from_attributes = True

